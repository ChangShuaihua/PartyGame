package com.poker.service;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.cert.X509Certificate;
import java.util.*;

/**
 * Coze 智能体服务
 * 调用 Coze API 与 Bot 对话
 */
@Slf4j
@Service
public class CozeService {

    @Value("${coze.bot-id}")
    private String botId;

    @Value("${coze.api-token}")
    private String apiToken;

    private static final String COZE_API_BASE = "https://api.coze.cn";

    static {
        // 信任所有证书（开发环境）
        try {
            TrustManager[] trustAll = new TrustManager[]{
                    new X509TrustManager() {
                        public X509Certificate[] getAcceptedIssuers() { return null; }
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                    }
            };
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAll, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送消息给 Coze Bot 并获取回复
     */
    public Map<String, String> chat(String userId, String message, String conversationId) {
        Map<String, String> result = new HashMap<>();

        try {
            // 1. 发起对话
            JSONObject chatBody = new JSONObject();
            chatBody.put("bot_id", botId);
            chatBody.put("user_id", userId);
            chatBody.put("stream", false);
            chatBody.put("auto_save_history", true);

            if (conversationId != null && !conversationId.isEmpty()) {
                chatBody.put("conversation_id", conversationId);
            }

            JSONArray messages = new JSONArray();
            JSONObject msg = new JSONObject();
            msg.put("role", "user");
            msg.put("content", message);
            msg.put("content_type", "text");
            messages.add(msg);
            chatBody.put("additional_messages", messages);

            log.info("Coze对话请求: userId={}, message={}", userId, message);

            String chatResponseStr = httpPost(COZE_API_BASE + "/v3/chat", chatBody.toJSONString());
            JSONObject chatResp = JSON.parseObject(chatResponseStr);
            log.debug("Coze对话响应: {}", chatResp);

            if (chatResp.getIntValue("code") != 0) {
                result.put("reply", "抱歉，我现在有点累了，稍后再聊吧~");
                result.put("error", chatResp.getString("msg"));
                return result;
            }

            JSONObject chatData = chatResp.getJSONObject("data");
            String chatId = chatData.getString("id");
            String convId = chatData.getString("conversation_id");
            result.put("conversationId", convId);

            // 2. 轮询等待完成
            String reply = pollForReply(chatId, convId);
            result.put("reply", reply);

        } catch (Exception e) {
            log.error("Coze对话异常", e);
            result.put("reply", "哎呀，网络好像不太对，稍后再试试吧~");
            result.put("error", e.getMessage());
        }

        return result;
    }

    /**
     * 轮询获取 Bot 回复
     */
    private String pollForReply(String chatId, String conversationId) {
        int maxAttempts = 30;
        for (int i = 0; i < maxAttempts; i++) {
            try {
                Thread.sleep(1000);

                String url = COZE_API_BASE + "/v3/chat/retrieve?chat_id=" + chatId + "&conversation_id=" + conversationId;
                String respStr = httpGet(url);
                JSONObject resp = JSON.parseObject(respStr);

                if (resp.getIntValue("code") != 0) continue;

                JSONObject data = resp.getJSONObject("data");
                String status = data.getString("status");

                if ("completed".equals(status)) {
                    return fetchBotMessage(chatId, conversationId);
                } else if ("failed".equals(status)) {
                    log.error("Coze对话失败: {}", data);
                    return "抱歉，我刚才走神了，再说一次好吗？";
                }

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            } catch (Exception e) {
                log.warn("轮询Coze状态异常", e);
            }
        }
        return "我思考得有点久，要不再试一次？";
    }

    /**
     * 获取 Bot 的回复消息
     */
    private String fetchBotMessage(String chatId, String conversationId) {
        try {
            String url = COZE_API_BASE + "/v3/chat/message/list?chat_id=" + chatId + "&conversation_id=" + conversationId;
            String respStr = httpGet(url);
            JSONObject resp = JSON.parseObject(respStr);

            if (resp.getIntValue("code") != 0) return "获取回复失败";

            JSONArray dataList = resp.getJSONArray("data");
            if (dataList == null) return "没有收到回复";

            for (int i = 0; i < dataList.size(); i++) {
                JSONObject msg = dataList.getJSONObject(i);
                if ("assistant".equals(msg.getString("role")) && "answer".equals(msg.getString("type"))) {
                    return msg.getString("content");
                }
            }

            return "我还在想...";
        } catch (Exception e) {
            log.error("获取Bot消息异常", e);
            return "获取回复出错了~";
        }
    }

    private String httpPost(String urlStr, String body) throws IOException {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + apiToken);
        conn.setDoOutput(true);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(60000);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }

        return readResponse(conn);
    }

    private String httpGet(String urlStr) throws IOException {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", "Bearer " + apiToken);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(60000);

        return readResponse(conn);
    }

    private String readResponse(HttpURLConnection conn) throws IOException {
        InputStream is = conn.getResponseCode() >= 400 ? conn.getErrorStream() : conn.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        reader.close();
        return sb.toString();
    }
}
