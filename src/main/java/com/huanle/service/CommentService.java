package com.huanle.service;

import com.huanle.dao.CommentMapper;
import com.huanle.dao.ParentChildMapper;
import com.huanle.entity.Comment;
import com.huanle.entity.ParentChild;
import com.sun.org.apache.bcel.internal.generic.DADD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CommentService {

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    ParentChildMapper parentChildMapper;

    public Boolean addComment(Comment comment){

        if(commentMapper.insertSelective(comment) == 1){
            return true;
        }
        return false;
    }

    public Boolean addReply(ParentChild parentChild,String content,Integer pid){
        Comment comment = new Comment();
        comment.setPid(pid);
        comment.setContent(content);
        comment.setUserId(parentChild.getChildId());
        comment.setCreateAt((int)(new Date().getTime()/1000));
        comment.setReply(0);
        if(commentMapper.insertSelective(comment)== 1 && parentChildMapper.insertSelective(parentChild) == 1){

            return true;
        }
        return false;
    }

}
