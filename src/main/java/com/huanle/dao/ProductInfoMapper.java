package com.huanle.dao;

import com.huanle.entity.ProductInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface ProductInfoMapper {
    int deleteByPrimaryKey(Integer pid);

    int insert(ProductInfo record);

    int insertSelective(ProductInfo record);

    ProductInfo selectByPrimaryKey(Integer pid);

    int updateByPrimaryKeySelective(ProductInfo record);

    int updateByPrimaryKey(ProductInfo record);

    @Select("select * from productInfo where status = 1 and advice = 2 order by create_at DESC,is_new DESC,update_at DESC")
    List<ProductInfo> getList();

    @Select("select pid,title,my_type,create_at ,advice,picture,exchange_type  from productInfo where  p_uid = #{uid} and status = 1 order by create_at desc")
    List<ProductInfo> getPublishedList(Integer uid);

    /**
     * 获取上架且已通过审核的商品列表
     * @param uid
     * @return
     */
    @Select("select * from productInfo where p_uid = #{uid} and status = 1 and advice = 2 order by create_at desc")
    List<ProductInfo> getListBypUid(Integer uid);

    @Select("select * from productInfo where advice = 2 and status = 1 and title like  #{str} ")
    List<ProductInfo> queryByTitle(String str);

    @Select("select * from productInfo where advice = 2 and status = 1 and  my_type = #{type}")
    List<ProductInfo> queryByType(String type);

}