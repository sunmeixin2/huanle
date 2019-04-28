package com.huanle.dao;

import com.huanle.entity.Feedback;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface FeedbackMapper {
    int deleteByPrimaryKey(Integer fid);

    int insert(Feedback record);

    int insertSelective(Feedback record);

    Feedback selectByPrimaryKey(Integer fid);

    int updateByPrimaryKeySelective(Feedback record);

    int updateByPrimaryKey(Feedback record);

    @Select("select * from feedback order by create_at desc")
    List<Feedback> getList();
}