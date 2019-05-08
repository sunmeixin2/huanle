package com.huanle.dao.provider;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.jdbc.SQL;

public class UserDaoProvider {

    public String selectByFilter(JSONObject param){
        Integer uid = param.getInteger("uid");
        String nickName = param.getString("nickName");

        String sql = new SQL(){
            {
                SELECT(" * from userInfo");

                if(uid != null){
                    WHERE("uid = #{uid}");
                }
                if(nickName != null && !nickName.isEmpty()){
                    WHERE("nick_name = #{nickName}");
                }
                ORDER_BY("uid desc");
            }
        }.toString();

        return sql;
    }
}
