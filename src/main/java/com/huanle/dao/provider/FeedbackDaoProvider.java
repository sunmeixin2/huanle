package com.huanle.dao.provider;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.jdbc.SQL;

public class FeedbackDaoProvider {

    public String selectByFilter(JSONObject param){
        String type = param.getString("type");
        Integer pid = param.getInteger("pid");
        Integer beginTime = param.getInteger("beginTime");
        Integer endTime = param.getInteger("endTime");

        String sql = new SQL(){
            {
                SELECT(" f.*,u.nick_name,p.title,p.my_type from feedback f  " +
                        " left join userInfo u on u.uid = f.uid " +
                        " left join productInfo p on f.pid = p.pid ");

                if(type != null && !type.isEmpty()){
                    WHERE("type = #{type}");
                }
                if(pid != null){
                    WHERE("pid = #{pid}");
                }
                if(beginTime != null){
                    WHERE("create_at >= #{beginTime}");
                }
                if(endTime != null){
                    WHERE("create_at <= #{endTime}");
                }

                ORDER_BY("fid desc");
            }
        }.toString();
        return sql;
    }

}
