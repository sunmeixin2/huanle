package com.huanle.service;

import com.alibaba.fastjson.JSONObject;
import com.huanle.Util.CommonUtil;
import com.huanle.Util.OrderCoderUtil;
import com.huanle.dao.OrdersMapper;
import com.huanle.dao.ProductInfoMapper;
import com.huanle.entity.Orders;
import com.huanle.entity.ProductInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    ProductInfoMapper productInfoMapper;

    @Autowired
    OrdersMapper ordersMapper;

    public Boolean addOrders(Orders orders){
        orders.setCreateAt((int)(new Date().getTime()/1000));
        //生成订单号
        String nums = OrderCoderUtil.getOrderCode((long)orders.getaUid());
        orders.setNums(nums);
        ProductInfo productInfo = productInfoMapper.selectByPrimaryKey(orders.getbPid());
        if(productInfo != null){
            orders.setbUid(productInfo.getpUid());
            if(ordersMapper.insertSelective(orders) == 1) {
                return true;
            }
        }

        return false;
    }

    public Map getUpProdList(Integer upId){
        Map<String,Object> result = new HashMap<>();
        List<ProductInfo> productInfos = productInfoMapper.getListBypUid(upId);
        if(productInfos != null){
            result.put("total",productInfos.size());
            List<Map> data = new ArrayList<>();

            for(ProductInfo productInfo : productInfos){
                Map<String,Object> tmp = new HashMap();

                tmp.put("pid",productInfo.getPid());
                tmp.put("title",productInfo.getTitle());
                String[] picture = CommonUtil.pictureToArr(productInfo.getPicture());
                tmp.put("picture",picture[0]);
                tmp.put("price",productInfo.getPrice());
                tmp.put("inventory",productInfo.getInventory());
                tmp.put("myType",productInfo.getMyType());
                data.add(tmp);
            }
            result.put("productList",data);

        }else {
            return null;
        }
        return result;
    }
    //订单历史
    public Map getOrderList(Integer uid){
        Map<String,Object> result = new HashMap<>();
        List<Map> orders = ordersMapper.getListByUid(uid);
        if(orders != null) {
            result.put("total", orders.size());
            result.put("orders", commonDealPicture(orders));
        }
        return result;
    }

    //我请求的订单
    public Map getExchangeOtherList(Integer uid){
        Map<String,Object> result = new HashMap<>();
        List<Map> orders = ordersMapper.getListByAuid(uid);
        if(orders != null) {
            result.put("total", orders.size());
            result.put("orders", commonDealPicture(orders));
        }
        return result;
    }

    //请求我的订单
    public Map getExchangeMeList(Integer uid){
        Map<String,Object> result = new HashMap<>();
        List<Map> orders = ordersMapper.getListByBuid(uid);
        if(orders != null) {
            result.put("total", orders.size());
            result.put("orders", commonDealPicture(orders));
        }
        return result;
    }

    public List<Map> commonDealPicture(List<Map> orders){
        for(Map order : orders){
            String[] picture = CommonUtil.pictureToArr((String)order.get("picture"));
            order.put("picture",picture[0]);
        }
        return orders;
    }

    public Boolean orderDeal(Integer oid,Integer type){
        int flag;
        if(type == 1){      //乙方同意
             ordersMapper.updateStatusByOid(oid);
             Orders orders = ordersMapper.selectByPrimaryKey(oid);
             //交换成功后商品下架
             productInfoMapper.updateStatus(orders.getaPid(),orders.getbPid());
             flag = orders.getStatus().equals(2) ? 1:2;

        }else if(type == 2){        //取消订单
           flag = ordersMapper.deleteByPrimaryKey(oid);
        }else {
            return false;
        }

        if(flag == 1){
            return true;
        }else{
            return false;
        }
    }

    //订单详情
    public Map detail(Integer oid,Integer upId){
        Map<String,Object> result = new HashMap<>();
        Orders orders = ordersMapper.selectByPrimaryKey(oid);
        if(orders != null){
            result.put("nums",orders.getNums());
            result.put("oid",oid);
            result.put("createAt",orders.getCreateAt());

            Map dataOfMy = ordersMapper.myself(oid);
            if(dataOfMy != null){
                Integer uid = (Integer)dataOfMy.get("uid");
                String[] picture = CommonUtil.pictureToArr((String) dataOfMy.get("picture"));
                dataOfMy.put("picture",picture);
                if(uid.equals(upId) || orders.getStatus().equals(2)){
                    dataOfMy.put("status","同意");
                }else{
                    dataOfMy.put("status","等待同意");
                }
                result.put("myself",dataOfMy);
            }

            Map dataOfOther = ordersMapper.other(oid);
            if(dataOfOther != null){
                Integer uid = (Integer)dataOfOther.get("uid");
                String[] picture = CommonUtil.pictureToArr((String) dataOfOther.get("picture"));
                dataOfOther.put("picture",picture);
                if(uid.equals(upId) || orders.getStatus().equals(2)){
                    dataOfOther.put("status","同意");
                }else{
                    dataOfOther.put("status","等待同意");
                }
                result.put("other",dataOfOther);
            }

        }

        return result;
    }


    public Map getAllOrdersList(JSONObject param){
        Map result = new HashMap();

        List<Orders> ordersList = ordersMapper.getAllList(param);
        if(ordersList != null) {
            result.put("total", ordersList.size());
            result.put("orders", ordersList);
        }
        return result;

    }

}
