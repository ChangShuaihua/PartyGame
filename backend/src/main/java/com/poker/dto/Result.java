package com.poker.dto;

import lombok.Data;

/**
 * 统一返回结果封装
 *
 * @param <T> 数据类型
 */
@Data
public class Result<T> {

    /** 状态码：200=成功，其他=失败 */
    private Integer code;

    /** 提示消息 */
    private String message;

    /** 返回数据 */
    private T data;

    private Result() {}

    public static <T> Result<T> success(T data) {
        Result<T> r = new Result<>();
        r.code = 200;
        r.message = "success";
        r.data = data;
        return r;
    }

    public static <T> Result<T> success() {
        return success(null);
    }

    public static <T> Result<T> error(Integer code, String message) {
        Result<T> r = new Result<>();
        r.code = code;
        r.message = message;
        r.data = null;
        return r;
    }

    public static <T> Result<T> error(String message) {
        return error(500, message);
    }
}
