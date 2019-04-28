package com.huanle.dao;

import com.huanle.entity.Comment;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface CommentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKey(Comment record);

    int addComment(Comment record);


    @Select("update comment set reply = reply+1 where id = #{id} ")
    void updateReplyById(Integer id);

    @Select("select u.uid,u.nick_name,u.profile_img ,c.* from comment c left join userInfo u on c.user_id = u.uid where c.pid = #{pid}")
    List<Map> getListByPid(Integer pid);
}