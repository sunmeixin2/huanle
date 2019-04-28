package com.huanle.service;

import com.huanle.dao.FeedbackMapper;
import com.huanle.entity.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    @Autowired
    FeedbackMapper feedbackMapper;

    public Boolean addFeedback(Feedback feedback){
        if(feedbackMapper.insertSelective(feedback) == 1){
            return true;
        }
        return false;
    }

    public Map getFeedbackList(){
        Map result = new HashMap();
        List<Feedback> feedbackList = feedbackMapper.getList();

        if(feedbackList == null){
            return null;
        }
        result.put("total",feedbackList.size());
        result.put("feedbackList",feedbackList);

        return result;
    }

    public Boolean deleteFeeedback(Integer fid){
        if(feedbackMapper.deleteByPrimaryKey(fid) == 1){
            return true;
        }
        return false;
    }
}
