package com.huanle.dao;

import com.alibaba.fastjson.JSONObject;
import com.huanle.dao.provider.FeedbackDaoProvider;
import com.huanle.entity.Feedback;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Map;

@Mapper
public interface FeedbackMapper {
    int deleteByPrimaryKey(Integer fid);

    int insert(Feedback record);

    int insertSelective(Feedback record);

    Feedback selectByPrimaryKey(Integer fid);

    int updateByPrimaryKeySelective(Feedback record);

    int updateByPrimaryKey(Feedback record);

//    @Select("select f.*,u.nick_name,p.title,p.my_type from feedback f left join userInfo u on u.uid = f.uid " +
//            "left join productInfo p on f.pid = p.pid  order by create_at desc")
//    List<Map> getList();
    @SelectProvider(type = FeedbackDaoProvider.class,method = "selectByFilter")
    List<Map> getList(JSONObject param);
}