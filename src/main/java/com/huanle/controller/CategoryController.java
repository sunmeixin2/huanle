package com.huanle.controller;

import com.huanle.Config.ErrorCode;
import com.huanle.entity.Category;
import com.huanle.service.CategoryService;
import com.huanle.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("huanle/category")
@CrossOrigin(origins = "*")
@RestController
public class CategoryController {

    @Autowired
    CategoryService categoryService;


    @RequestMapping("getCategoryList")
    public ResponseVO getCategoryList(){
        List<Category> category = categoryService.getAllList();
        if(category != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,category);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"分类列表为空！");
        }
    }

    @RequestMapping("addCategory")
    public ResponseVO addCategory(String type){
        if(type == null || type.equals("") || type.length() > 16){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:type");
        }
        if(categoryService.addCategory(type)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"添加分类成功！");
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"添加分类失败！！！");
        }

    }

    @RequestMapping("updateCategory")
    public ResponseVO updateCategory(Integer cid,String type){
        if(cid == null || cid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:cid");
        }
        if(type == null || type.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:type");
        }
        if(categoryService.editCategory(cid,type)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"修改分类成功！");
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"修改分类失败！！！");
        }
    }

    @RequestMapping("deleteCategory")
    public ResponseVO deleteCategory(Integer cid){
        if(cid == null || cid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:cid");
        }
        if(categoryService.deleteCagetory(cid)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"删除分类成功！");
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"删除分类失败！！！");
        }

    }




}
