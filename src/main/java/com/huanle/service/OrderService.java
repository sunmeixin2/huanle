package com.huanle.service;

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

                tmp.put("title",productInfo.getTitle());
                String picture[] = CommonUtil.pictureToArr(productInfo.getPicture());
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

//    public Map getListByaUid(Integer upId){
//        Map<String,Object> result = new HashMap<>();
//
//
//
//
//    }
}
