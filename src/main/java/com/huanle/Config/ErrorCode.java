package com.huanle.Config;

public enum ErrorCode {

    /**
     * 成功
     */

    RESPONSE_SUCCESS(0,"成功"),
    /**
     * 对象为空
     */
    NULL_OBJ(1001,"对象为空"),
    /**
     * 添加用户失败
     */
    ERROR_ADD_USER(1002,"添加用户失败"),
    /**
     * 系统错误
     */
    UNKNOW_ERROR(1003,"系统错误"),
    /**
     * 非法参数
     */
    ILIEGAL_PARAM(1004,"非法参数");

    private int value;
    private String message;

    ErrorCode(int value,String message){
        this.value = value;
        this.message = message;
    }

    public int getValue(){ return value;}

    public String getMessage(){ return message;}

}
