package com.huanle.controller;

import com.huanle.Config.ErrorCode;
import com.huanle.entity.Category;
import com.huanle.entity.ProductInfo;
import com.huanle.entity.UserInfo;
import com.huanle.service.CategoryService;
import com.huanle.service.ProductInfoService;
import com.huanle.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequestMapping("huanle/index")
@CrossOrigin(origins = "*")
@RestController
public class IndexController {

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    CategoryService categoryService;

    @RequestMapping("productList")
    public ResponseVO index(){

        Map productInfos = productInfoService.getProductList();
        if(productInfos != null && productInfos.size() > 0){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,productInfos);
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"获取商品信息失败！");
        }

    }
    @RequestMapping("upInfo")
    public ResponseVO upInfo(HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"用户未登录！");
        }else {

            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,up);
        }
    }

    @RequestMapping("categoryList")
    public ResponseVO categoryList(){
        List<Category> categories = categoryService.getAllList();
        if(categories == null || categories.size() <0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"类型列表为空！");
        }
        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,categories);
    }
}
