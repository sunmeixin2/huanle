package com.huanle.dao;

import com.huanle.entity.CollectionEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CollectionMapper {
    int deleteByPrimaryKey(@Param("productId") Integer productId, @Param("userId") Integer userId);

    int insert(CollectionEntity record);

    int insertSelective(CollectionEntity record);

    CollectionEntity selectByPrimaryKey(@Param("productId") Integer productId, @Param("userId") Integer userId);

    int updateByPrimaryKeySelective(CollectionEntity record);

    int updateByPrimaryKey(CollectionEntity record);

    @Select("select cc_id from collection where product_id = #{pid} and user_id = #{uid}")
    CollectionEntity getCollectionByPidAndUid(Integer pid,Integer uid);

    @Select("select * from collection where user_id = #{uid}")
    List<CollectionEntity> getListByUid(Integer uid);

}