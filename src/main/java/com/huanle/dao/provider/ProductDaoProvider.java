package com.huanle.dao.provider;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.jdbc.SQL;

public class ProductDaoProvider {

    public String selectByFilter(JSONObject param){
        Integer pid = param.getInteger("pid");
        String title = param.getString("title");
        String type = param.getString("type");
        Integer beginTime = param.getInteger("beginTime");
        Integer endTime = param.getInteger("endTime");
        Integer uid = param.getInteger("uid");

        String sql = new SQL(){
            {
                SELECT(" * from productInfo");

                if(pid != null){
                    WHERE("pid = #{pid}");
                }
                if(title != null && !title.isEmpty()){
                    WHERE("title = #{title}");
                }
                if(type != null && !type.isEmpty()){
                    WHERE("my_type = #{type}");
                }
                if(uid != null){
                    WHERE("p_uid = #{uid}");
                }
                if(beginTime != null){
                    WHERE("create_at >= #{beginTime}");
                }
                if(endTime != null){
                    WHERE("create_at <= #{endTime}");
                }
                ORDER_BY("pid desc");
            }
        }.toString();

        return sql;
    }

    public String selectProductByFilter(JSONObject param){
        String title = param.getString("title");
        String type = param.getString("type");

        String sql = new SQL(){
            {
                SELECT(" * from productInfo");
                WHERE("advice = 2 and status = 1");
                if(title != null && !title.isEmpty()){
                    WHERE("title like  #{title}");
                }
                if(type != null && !type.isEmpty()){
                    WHERE("my_type = #{type}");
                }
                ORDER_BY("create_at DESC,is_new DESC,update_at DESC");
            }
        }.toString();

        return sql;
    }
}
