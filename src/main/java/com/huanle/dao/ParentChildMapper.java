package com.huanle.dao;

import com.huanle.entity.ParentChild;

public interface ParentChildMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ParentChild record);

    int insertSelective(ParentChild record);

    ParentChild selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ParentChild record);

    int updateByPrimaryKey(ParentChild record);
}