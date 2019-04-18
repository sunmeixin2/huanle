package com.huanle.vo;

import com.huanle.Config.ErrorCode;

public class ResponseVO {

    private int code;
    private String message;
    private Object data;

    public ResponseVO(int code,String message,Object data){
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResponseVO(ErrorCode errorCode,Object data){
        this.code = errorCode.getValue();
        this.message = errorCode.getMessage();
        this.data = data;
    }

    public ResponseVO(int code,String message){
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
