package com.huanle.entity;

import java.util.Date;

public class ProductInfo {
    private Integer pid;

    private String title;

    private String myType;

    private Integer inventory;

    private Integer isNew;

    private Double price;

    private String detail;

    private Date productDate;

    private Date productExpire;

    private String exchangeType;

    /**
     * 1:已发布,2:已交换,3:已下架
     */
    private Integer status;

    private String picture;

    private Integer createAt;

    private Integer updateAt;

    /**
     * 1:审核中,2:审核通过,3:审核失败
     */
    private Integer advice;

    private Integer pUid;

    private String standard;

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMyType() {
        return myType;
    }

    public void setMyType(String myType) {
        this.myType = myType;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getIsNew() {
        return isNew;
    }

    public void setIsNew(Integer isNew) {
        this.isNew = isNew;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Date getProductDate() {
        return productDate;
    }

    public void  setProductDate(Date productDate) {
        this.productDate = productDate;
    }

    public Date getProductExpire() {
        return productExpire;
    }

    public void setProductExpire(Date productExpire) {
        this.productExpire = productExpire;
    }

    public String getExchangeType() {
        return exchangeType;
    }

    public void setExchangeType(String exchangeType) {
        this.exchangeType = exchangeType;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Integer getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Integer createAt) {
        this.createAt = createAt;
    }

    public Integer getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Integer updateAt) {
        this.updateAt = updateAt;
    }

    public Integer getAdvice() {
        return advice;
    }

    public void setAdvice(Integer advice) {
        this.advice = advice;
    }

    public Integer getpUid() {
        return pUid;
    }

    public void setpUid(Integer pUid) {
        this.pUid = pUid;
    }
}