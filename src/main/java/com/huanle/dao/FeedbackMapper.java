package com.huanle.dao;

import com.huanle.entity.Feedback;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface FeedbackMapper {
    int deleteByPrimaryKey(Integer fid);

    int insert(Feedback record);

    int insertSelective(Feedback record);

    Feedback selectByPrimaryKey(Integer fid);

    int updateByPrimaryKeySelective(Feedback record);

    int updateByPrimaryKey(Feedback record);

    @Select("select f.*,u.nick_name,p.title,p.my_type from feedback f left join userInfo u on u.uid = f.uid " +
            "left join productInfo p on f.pid = p.pid  order by create_at desc")
    List<Map> getList();
}