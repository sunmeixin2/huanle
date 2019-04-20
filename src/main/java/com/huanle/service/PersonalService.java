package com.huanle.service;

import com.huanle.Util.CommonUtil;
import com.huanle.constant.ProductConstant;
import com.huanle.dao.CollectionMapper;
import com.huanle.dao.ProductInfoMapper;
import com.huanle.dao.UserInfoMapper;
import com.huanle.entity.CollectionEntity;
import com.huanle.entity.ProductInfo;
import com.huanle.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@Service
public class PersonalService {

    @Autowired
    CollectionMapper collectionMapper;

    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    ProductInfoMapper productInfoMapper;


    /**
     * 收藏指定商品
     * @param pid
     * @param uid
     * @param title
     * @return
     */
    public Boolean addCollection(Integer pid,Integer uid,String title){
        CollectionEntity collection = new CollectionEntity();
        collection.setProductId(pid);
        collection.setProTitle(title);
        collection.setUserId(uid);
        collection.setCreateAt((int)(new Date().getTime()/1000));

        if(collectionMapper.insertSelective(collection) == 1){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 取消收藏
     * @param pid
     * @param uid
     * @return
     */
    public Boolean deleteCollection(Integer pid,Integer uid){
        if(collectionMapper.deleteByPrimaryKey(pid,uid) == 1){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 修改密码
     * @param uid
     * @param newPasswd
     * @param oldPasswd
     * @return
     */
    public Boolean updatePasswd(Integer uid,String newPasswd,String oldPasswd){

        newPasswd = CommonUtil.makeMD5(newPasswd);
        oldPasswd = CommonUtil.makeMD5(oldPasswd);
        UserInfo userInfo = userInfoMapper.selectByPrimaryKey(uid);
        if(userInfo != null && oldPasswd.equals(userInfo.getPasswd())){
            userInfoMapper.updatePasswdByUidAndPwd(uid,newPasswd,oldPasswd);
            return true;
        }else {
            return false;
        }


    }

    /**
     * 个人中心页面获取已发布商品列表
     * @param uid
     * @return
     */
    public Map getPublishedProd(Integer uid){
        Map<String,Object> result = new HashMap<>();

        List<ProductInfo> productInfos = productInfoMapper.getPublishedList(uid);
        List<Map> data = new ArrayList<>();
        for (ProductInfo productInfo:productInfos){
            Map map = new HashMap();
            map.put("pid",productInfo.getPid());
            map.put("title",productInfo.getTitle());
            map.put("myType",productInfo.getMyType());
            map.put("createAt",productInfo.getCreateAt());
            map.put("advice", ProductConstant.ADVICE.get(productInfo.getAdvice()));
            map.put("exchangeType",productInfo.getExchangeType());
            String[] picture = CommonUtil.pictureToArr(productInfo.getPicture());
            map.put("picture",picture);

            data.add(map);
        }
        result.put("total",productInfos.size());
        result.put("productList",data);
        return result;
    }

    /**
     * 获取收藏列表
     * @param uid
     * @return
     */
    public Map getCollectList(Integer uid){
        Map<String,Object> result = new HashMap<>();
        List<CollectionEntity> collectionEntityList = collectionMapper.getListByUid(uid);
        if(collectionEntityList == null){
            return result;
        }
        List<Map> data = new ArrayList<>();
        for (CollectionEntity collectionEntity:collectionEntityList){
            Map map  = new HashMap();
            map.put("ccId",collectionEntity.getCcId());
            map.put("productId",collectionEntity.getProductId());
            map.put("productTile",collectionEntity.getProTitle());
            map.put("createAt",collectionEntity.getCreateAt());
            data.add(map);
        }
        result.put("total",collectionEntityList.size());
        result.put("collectList",data);
        return result;
    }
}
