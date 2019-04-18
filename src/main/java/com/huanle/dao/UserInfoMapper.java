package com.huanle.dao;

import com.huanle.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
@Mapper
public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer uid);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer uid);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);

    /**
     *  根据email 和 密码 查询
     * @param email
     * @param passwd
     * @return
     */

    @Select("select * from userInfo where email = #{email} and passwd =#{passwd} and group_id = #{groupId} order by uid desc limit 1")
    UserInfo queryUserByEmailAndPasswd(String email,String passwd,Integer groupId);


    @Select("select * from userInfo where email = #{email}  order by uid desc limit 1")
    UserInfo queryUserByEmail(String email);

    @Select("update  userInfo set passwd = #{newPasswd} where uid = #{uid} and passwd = #{oldPasswd}")
    void updatePasswdByUidAndPwd(Integer uid,String newPasswd,String oldPasswd);

}