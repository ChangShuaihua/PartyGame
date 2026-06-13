import { useState, useEffect, useRef } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { cozeChat } from '../../services/api';
import { getCurrentUserId } from '../../utils';
import './index.scss';

interface ChatMessage {
  id: number;
  role: 'user' | 'bot';
  content: string;
  time: string;
}

const GREETINGS = [
  '你好呀~ 我是你的小陪伴 💕',
  '今天过得怎么样呀？',
  '有什么想聊的吗？我一直在哦~',
  '开心的事可以跟我分享哦 ✨',
];

export default function CompanionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [botMood, setBotMood] = useState('😊');
  const msgIdRef = useRef(0);

  const userId = getCurrentUserId();

  // 初始打招呼
  useEffect(() => {
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    addMessage('bot', greeting);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    setTimeout(() => {
      Taro.pageScrollTo({ scrollTop: 99999, duration: 300 });
    }, 100);
  }, [messages]);

  const addMessage = (role: 'user' | 'bot', content: string) => {
    msgIdRef.current += 1;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(prev => [...prev, { id: msgIdRef.current, role, content, time }]);
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || sending) return;

    addMessage('user', text);
    setInputText('');
    setSending(true);
    setBotMood('🤔');

    try {
      const res = await cozeChat(userId, text, conversationId);
      if (res.code === 200 && res.data) {
        addMessage('bot', res.data.reply || '...');
        if (res.data.conversationId) {
          setConversationId(res.data.conversationId);
        }
        // 根据回复内容变化表情
        const reply = res.data.reply || '';
        if (reply.includes('开心') || reply.includes('哈哈') || reply.includes('😊')) {
          setBotMood('😄');
        } else if (reply.includes('伤心') || reply.includes('难过')) {
          setBotMood('🥺');
        } else if (reply.includes('生气') || reply.includes('哼')) {
          setBotMood('😤');
        } else {
          setBotMood('😊');
        }
      } else {
        addMessage('bot', '抱歉，我现在有点忙，稍后再聊吧~');
        setBotMood('😴');
      }
    } catch (e: any) {
      console.warn('聊天请求异常:', e);
      // 检测是否是安全检测API失败（测试号常见问题）
      if (e?.errMsg?.includes('webapi_getwxaasyncsecinfo')) {
        addMessage('bot', '消息发送失败，当前环境不支持安全检测，请使用正式小程序账号~');
      } else {
        addMessage('bot', '网络好像不太对，稍后再试试吧~');
      }
      setBotMood('😵');
    } finally {
      setSending(false);
    }
  };

  return (
    <View className="companion-page">
      {/* 小人区域 */}
      <View className="character-area">
        <View className="character-avatar">
          <Text className="character-face">{botMood}</Text>
        </View>
        <Text className="character-name">小花</Text>
        <Text className="character-desc">你的专属情感陪伴</Text>
      </View>

      {/* 对话区域 */}
      <View className="chat-area">
        {messages.map(msg => (
          <View key={msg.id} className={`chat-bubble-wrap ${msg.role === 'user' ? 'chat-bubble-wrap--user' : ''}`}>
            {msg.role === 'bot' && (
              <View className="bubble-avatar">
                <Text className="bubble-avatar-text">{botMood}</Text>
              </View>
            )}
            <View className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
              <Text className="bubble-text">{msg.content}</Text>
              <Text className="bubble-time">{msg.time}</Text>
            </View>
          </View>
        ))}

        {sending && (
          <View className="chat-bubble-wrap">
            <View className="bubble-avatar">
              <Text className="bubble-avatar-text">🤔</Text>
            </View>
            <View className="chat-bubble chat-bubble--bot">
              <Text className="bubble-text typing-dots">思考中...</Text>
            </View>
          </View>
        )}
      </View>

      {/* 输入区域 */}
      <View className="input-area">
        <Input
          className="chat-input"
          type="text"
          placeholder="跟我说点什么吧~"
          placeholderClass="input-placeholder"
          value={inputText}
          onInput={(e) => setInputText(e.detail.value)}
          onConfirm={handleSend}
          confirmType="send"
          disabled={sending}
        />
        <View
          className={`btn-send ${inputText.trim() && !sending ? '' : 'btn-send--disabled'}`}
          onClick={handleSend}
        >
          <Text className="btn-send-text">发送</Text>
        </View>
      </View>
    </View>
  );
}
