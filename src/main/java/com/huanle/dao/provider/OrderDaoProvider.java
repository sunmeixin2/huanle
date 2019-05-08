package com.huanle.dao.provider;


import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.jdbc.SQL;

public class OrderDaoProvider {

    public String selectByFilter(JSONObject param){
        Integer oid = param.getInteger("oid");
        String status = param.getString("status");
        Integer uid = param.getInteger("uid");
        String sql = new SQL() {
            {
                SELECT(" * from orders ");

                if(oid != null){
                    WHERE("oid = #{oid}");
                }

                if(status != null && !status.isEmpty()){
                    WHERE("status = #{status}");
                }

                if(uid != null){
                    WHERE("A_uid = #{uid} or B_uid = #{uid}");
                }
                ORDER_BY("oid desc");

            }
        }.toString();
        return sql;
    }
}
