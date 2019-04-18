package com.huanle.controller;

import com.huanle.Config.ErrorCode;
import com.huanle.entity.UserInfo;
import com.huanle.service.PersonalService;
import com.huanle.service.UserInfoService;
import com.huanle.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequestMapping("huanle/personal")
@CrossOrigin(origins = "*")
@RestController
public class PersonalController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    PersonalService personalService;


    /**
     *  获取用户资料信息
     * @param uid
     * @return
     */
    @RequestMapping("getUserInfo")
    public ResponseVO getUserInfo(Integer uid, HttpServletRequest request){

        if(uid == null || uid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：uid");
        }
        //获取session
        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        Integer upId = null;
        if(up != null){
            upId = up.getUid();
        }
        Map userInfo = userInfoService.queryUserInfo(uid,upId);
        if(userInfo == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"该用户不存在！");
        }


        return  new ResponseVO(ErrorCode.RESPONSE_SUCCESS,userInfo);
    }

    /**
     * 获取收藏列表
     * @param request
     * @return
     */
    public ResponseVO collectionList(HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请登录后,再操作！");
        }
        Integer uid = up.getUid();
        Map data = personalService.getCollectList(uid);
        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"收藏列表为空！");
        }
    }


    /**
     * 收藏商品
     * @param pid
     * @return
     */
    @RequestMapping("addCollection")
    public ResponseVO addCollection(Integer pid,String title,HttpServletRequest request){

        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        Integer uid = (up != null) ? up.getUid() : null;

        if(uid == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录！");
        }
        if(pid == null || pid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：pid");
        }
        if(title == null || title.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：title");
        }
        if(personalService.addCollection(pid,uid,title)){
            return  new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"收藏成功！");
        }else{
            return  new ResponseVO(ErrorCode.UNKNOW_ERROR,"收藏失败！");
        }

    }

    /**
     * 取消收藏
     * @param pid
     * @param request
     * @return
     */
    @RequestMapping("deleteCollection")
    public ResponseVO deleteCollection(Integer pid,HttpServletRequest request){

        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        Integer upId = (up != null) ? up.getUid() : null;
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：pid");
        }
        if(upId == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录！");
        }

        if(personalService.deleteCollection(pid,upId)){
            return  new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"取消成功！");
        }else{
            return  new ResponseVO(ErrorCode.UNKNOW_ERROR,"取消失败！");
        }
    }

    /**
     *  获取用户发布的所有商品
     * @param uid
     * @return
     */
    @RequestMapping("allProductions")
    public ResponseVO allProductions(Integer uid){
        if(uid == null || uid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：uid");
        }
        Map data = personalService.getPublishedProd(uid);
        if(data == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"获取信息失败！");

        }else if (data.size() == 0){
            return  new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"还没有发布任何商品！");

        }else{
            return  new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);

        }
    }


    /**
     * 修改密码
     * @param newPasswd
     * @param oldPasswd
     * @return
     */
    @RequestMapping("updatePasswd")
    public ResponseVO updatePasswd(String newPasswd,String oldPasswd,HttpServletRequest request){
//        if(uid == null || uid <= 0){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：uid");
//        }
        if(newPasswd == null || newPasswd.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：newPasswd");
        }
        if(oldPasswd == null || oldPasswd.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数：oldPasswd");
        }
        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请登录后,修改信息！");
        }
        Integer uid = up.getUid();
        if (personalService.updatePasswd(uid, newPasswd, oldPasswd)) {
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, "修改密码成功！");
        } else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR, "修改密码失败！");
        }

    }
}
