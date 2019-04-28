package com.huanle.dao;

import com.alibaba.fastjson.JSONObject;
import com.huanle.dao.provider.ProductDaoProvider;
import com.huanle.entity.ProductInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Map;

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

    @Select("select *  from productInfo where  p_uid = #{uid} and status = 1 order by create_at desc")
    List<ProductInfo> getPublishedList(Integer uid);

    /**
     * 获取上架且已通过审核的商品列表
     * @param uid
     * @return
     */
    @Select("select * from productInfo where p_uid = #{uid} and status = 1 and advice = 2 order by create_at desc")
    List<ProductInfo> getListBypUid(Integer uid);

    @Select("select * from productInfo where advice = 2 and status = 1 and title like  #{str} order by create_at DESC,is_new DESC,update_at DESC ")
    List<ProductInfo> queryByTitle(String str);

    @Select("select * from productInfo where advice = 2 and status = 1 and  my_type = #{type} order by create_at DESC,is_new DESC,update_at DESC")
    List<ProductInfo> queryByType(String type);

    //交换成功修改商品信息状态为 "已交换"
    @Select("update productInfo set status = 2 where pid = #{aPid} or pid = #{bPid}")
    void updateStatus(Integer aPid,Integer bPid);


    @Select("select count(*)  from productInfo where p_uid = #{uid}")
    Integer productCountByPuid(Integer uid);

//    @Select("select * from productInfo order by pid desc")
//    List<ProductInfo> getAllList();
    @SelectProvider(type = ProductDaoProvider.class,method = "selectByFilter")
    List<ProductInfo> getAllList(JSONObject param);


}