package com.huanle.entity;

public class Orders {
    private Integer oid;

    private String nums;

    private Integer aUid;

    private Integer bUid;

    private Integer aPid;

    private Integer bPid;

    // 1:甲方同意,2:甲乙双方同意,0:订单取消
    private Integer status;

    private Integer createAt;

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public String getNums() {
        return nums;
    }

    public void setNums(String nums) {
        this.nums = nums;
    }

    public Integer getaUid() {
        return aUid;
    }

    public void setaUid(Integer aUid) {
        this.aUid = aUid;
    }

    public Integer getbUid() {
        return bUid;
    }

    public void setbUid(Integer bUid) {
        this.bUid = bUid;
    }

    public Integer getaPid() {
        return aPid;
    }

    public void setaPid(Integer aPid) {
        this.aPid = aPid;
    }

    public Integer getbPid() {
        return bPid;
    }

    public void setbPid(Integer bPid) {
        this.bPid = bPid;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Integer createAt) {
        this.createAt = createAt;
    }
}