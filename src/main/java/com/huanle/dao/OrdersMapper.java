package com.huanle.dao;

import com.huanle.entity.Orders;
import org.apache.ibatis.annotations.Select;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Map;

public interface OrdersMapper {
    int deleteByPrimaryKey(Integer oid);

    int insert(Orders record);

    int insertSelective(Orders record);

    Orders selectByPrimaryKey(Integer oid);

    int updateByPrimaryKeySelective(Orders record);

    int updateByPrimaryKey(Orders record);

    @Select("select o.oid,o.status,p.title,p.picture " +
            "from orders o left join productInfo p on p.pid = o.B_pid " +
            "where o.A_uid = #{uid} or o.B_uid = #{uid}")
    List<Map> getListByUid(Integer uid);

    @Select("select o.oid,o.status,p.title,p.picture " +
            "from orders o left join productInfo p on p.pid = o.B_pid " +
            "where o.A_uid = #{uid}")
    List<Map> getListByAuid(Integer uid);

    @Select("select o.oid,o.status,p.title,p.picture  " +
            "from orders o left join productInfo p on p.pid = o.B_pid  " +
            "where o.B_uid = #{uid}")
    List<Map> getListByBuid(Integer uid);

    @Select("update orders set status = 2 where oid = #{oid}")
    void updateStatusByOid(Integer oid);

    /**
     * 我请求的订单详情
     * @param oid
     * @return
     */
    @Select("select p.pid,p.title,p.my_type,p.inventory,p.is_new,p.price,p.picture,u.uid,u.nick_name,u.contact " +
            "from orders o left join productInfo p on o.A_pid = p.pid  left join userInfo u on p.p_uid = u.uid " +
            "where o.oid = #{oid}")
    Map myself(Integer oid);

    /**
     * 请求我的订单详情
     * @param oid
     * @return
     */
    @Select("select p.pid,p.title,p.my_type,p.inventory,p.is_new,p.price,p.picture,u.uid,u.nick_name,u.contact " +
            "from orders o left join productInfo p on o.B_pid = p.pid  left join userInfo u on p.p_uid = u.uid " +
            "where o.oid = #{oid}")
    Map other(Integer oid);
}