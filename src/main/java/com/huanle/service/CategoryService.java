package com.huanle.service;

import com.huanle.dao.CategoryMapper;
import com.huanle.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryMapper categoryMapper;

    /**
     * 获取所有类型列表
     * @return
     */
    public List<Category> getAllList(){
        return categoryMapper.getList();
    }

    public Boolean addCategory(String type){
        Category category = new Category();
        category.setType(type);
        category.setCreateAt((int)(new Date().getTime()/1000));
        if (categoryMapper.insertSelective(category) == 1){
            return true;
        }
        return false;
    }

    public Boolean editCategory(Integer cid,String type){
        Category category = new Category();
        category.setType(type);
        category.setCid(cid);
        category.setUpdateAt((int)(new Date().getTime()/1000));

        if(categoryMapper.updateByPrimaryKeySelective(category) == 1 ){
            return true;
        }else {
            return false;
        }
    }

    public Boolean deleteCagetory(Integer cid){
        if(categoryMapper.deleteByPrimaryKey(cid) == 1){
            return true;
        }else {
            return false;
        }
    }
}
