package com.huanle.service;

import com.huanle.Util.FileUtil;
import com.huanle.dao.CommentMapper;
import com.huanle.dao.ReplyMapper;
import com.huanle.entity.Comment;
import com.huanle.entity.Reply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommentService {

    @Autowired
    CommentMapper commentMapper;


    @Autowired
    ReplyMapper replyMapper;

    public Boolean addComment(Comment comment){

        if(commentMapper.insertSelective(comment) == 1){
            return true;
        }
        return false;
    }

    public Boolean addReply(Reply reply){
        if(replyMapper.insertSelective(reply) == 1){
            commentMapper.updateReplyById(reply.getParentId());
            return true;
        }

        return false;

    }

    public Map commentList(Integer pid){
        Map result = new HashMap();
        List<Map> data = new ArrayList<>();

        List<Map> comments = commentMapper.getListByPid(pid);
        if(comments != null){
            for (Map tmp : comments){
                Map map = new HashMap();
                tmp.put("profile_img", FileUtil.PATH + "/" + tmp.get("profile_img"));
                if((Integer)tmp.get("reply") > 0){
                    Integer parentId = Integer.parseInt(tmp.get("id").toString());
                    List<Map> replys = replyMapper.getReplyListByParentId(parentId);
                    map.put("reply",replys);
                    for (Map reply : replys){
                        reply.put("profile_img", FileUtil.PATH + "/" + reply.get("profile_img"));
                    }
                }else{
                    map.put("reply","");

                }
                map.put("comment",tmp);

                data.add(map);
            }
        } else{
            result.put("total",0);
            result.put("commentList","");
            return result;
        }
        result.put("total",comments.size());
        result.put("commentList",data);
        return result;

    }

}
