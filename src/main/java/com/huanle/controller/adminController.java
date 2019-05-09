package com.huanle.controller;

import com.alibaba.fastjson.JSONObject;
import com.huanle.Config.ErrorCode;
import com.huanle.entity.Feedback;
import com.huanle.entity.UserInfo;
import com.huanle.service.FeedbackService;
import com.huanle.service.OrderService;
import com.huanle.service.ProductInfoService;
import com.huanle.service.UserInfoService;
import com.huanle.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@RequestMapping("huanle/admin")
@CrossOrigin(origins = "*")
@RestController
public class adminController {

    @Autowired
    FeedbackService feedbackService;

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    OrderService orderService;

    @Autowired
    UserInfoService userInfoService;

    /**
     * 反馈
     * @param pid
     * @param type
     * @param message
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("feedback")
    public ResponseVO feedback(String type , String message,Integer pid, HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录不可以评论");
        }
        Integer upId = up.getUid();
        System.out.println(pid);
//        Integer upId = 19;
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        if(type == null || type.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: type");
        }
        if(message == null || message.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: message");
        }
        Feedback feedback = new Feedback();
        feedback.setUid(upId);
        feedback.setMsg(message);
        feedback.setPid(pid);
        feedback.setType(type);
        feedback.setCreateAt((int)(new Date().getTime()/1000));
        if(feedbackService.addFeedback(feedback)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"ok!");
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"error!");
        }
    }


    /**
     * huoqufankuiliebiao
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("feedbackList")
    public ResponseVO feedbackList(String type,Integer pid,Integer beginTime,Integer endTime,HttpServletRequest request){
//        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
//        }
        JSONObject param = new JSONObject();
        param.put("type",type);

        if(pid != null && pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }else{
            param.put("pid",pid);
        }
        if(beginTime != null && beginTime < 0){

        }else{
            param.put("beginTime",beginTime);
        }
        if(endTime != null && endTime < 0){

        }else{
            param.put("endTime",endTime);
        }
        Map data = feedbackService.getFeedbackList(param);

        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"");
        }
    }


    /**
     * shanchu
     * @param fid
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("deleteFeedback")
    public ResponseVO deleteFeedback(Integer fid,HttpServletRequest request){

//        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
//        }
        if(fid == null || fid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: fid");
        }

        if(feedbackService.deleteFeeedback(fid)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"ok!");
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"error!");
        }

    }

    /**
     * huoqu suoyou shangpin liebiao
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("allProductList")
    public ResponseVO allProductList(Integer pid,String title,String type , Integer beginTime,Integer endTime,Integer uid,
                                     HttpServletRequest request){
//        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
//        }
        System.out.println("testttt");
        System.out.println("pid"+pid);
        JSONObject param = new JSONObject();
        if(pid != null && pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }else{
            param.put("pid",pid);
        }

        param.put("title",title);
        param.put("type",type);

        if(beginTime != null && beginTime < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: beginTime");
        }else {
            param.put("beginTime",beginTime);
        }
        if(endTime != null && endTime < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: endTime");
        }else {
            param.put("endTime",endTime);
        }
        if(uid != null && uid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: uid");
        }else {
            param.put("uid",uid);
        }
        Map data = productInfoService.getAllProductList(param);
        if(data == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"null !");
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }
    }

    /**
     * huoqu suoyou dingdan liebiao
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("allOrderList")
    public ResponseVO allOrderList(String nums,String nickName,String status,HttpServletRequest request){
        JSONObject param = new JSONObject();

//        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
//        }
//        if(oid != null && oid < 0){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: oid");
//        }else{
//            param.put("oid",oid);
//        }
//        if(uid != null && uid < 0){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: uid");
//        }else{
//            param.put("uid",uid);
//        }

        param.put("status",status);
        param.put("nums",nums);
        param.put("nickName",nickName);

        Map data = orderService.getAllOrdersList(param);
        if(data == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"null !");
        }else {
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, data);
        }
    }


    /**
     *
     * @param uid
     * @param nickName
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("allUserList")
    public ResponseVO allUserList(Integer uid,String nickName,HttpServletRequest request){
        System.out.println("======userList");
        JSONObject param = new JSONObject();
        if(uid != null && uid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: uid");
        }else{
            param.put("uid",uid);
        }
        param.put("nickName",nickName);

        Map data = userInfoService.getAllUserList(param);
        if(data == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"null !");
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, data);
        }

    }



//
//    @RequestMapping("adminList")
//    public ResponseVO adminList(HttpServletRequest request){
//        Map data = userInfoService.getAdminList();
//        if(data == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"null !");
//        }else{
//            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, data);
//        }
//    }
//
//    @RequestMapping("addAdmin")
//    public ResponseVO addAdmin(@RequestParam("files") MultipartFile[] files, String nickName, String email,
//                               String gender, String contact, HttpServletRequest request){
//
//        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, "");
//    }





}
