package com.huanle.dao;

import com.huanle.entity.Reply;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface ReplyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Reply record);

    int insertSelective(Reply record);

    Reply selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Reply record);

    int updateByPrimaryKey(Reply record);

    @Select("select r.* ,u.uid,u.nick_name,u.profile_img from reply r left join userInfo u on r.user_id = u.uid " +
            "where r.parent_id = #{parentId}")
    List<Map> getReplyListByParentId(Integer parentId);
}