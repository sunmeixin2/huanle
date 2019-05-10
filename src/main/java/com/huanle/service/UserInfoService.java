package com.huanle.service;

import com.alibaba.fastjson.JSONObject;
import com.huanle.Util.CommonUtil;
import com.huanle.Util.FileUtil;
import com.huanle.dao.UserInfoMapper;
import com.huanle.entity.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserInfoService {

    private  static final Logger logger = LoggerFactory.getLogger(UserInfoService.class);

    @Autowired
    UserInfoMapper userInfoMapper;

    public UserInfo getUserInfo(String email, String passwd, Integer groupId){

        passwd = CommonUtil.makeMD5(passwd);
        UserInfo userInfo = userInfoMapper.queryUserByEmailAndPasswd(email,passwd,groupId);
        if(userInfo != null ){
            userInfo.setPasswd(null);
        }
        return userInfo;
    }

    public UserInfo getUserByUid(Integer uid){
        UserInfo userInfo = userInfoMapper.selectByPrimaryKey(uid);
        return userInfo;
    }

    /**
     * 获取个人中心展示的用户信息
     * @param uid
     * @param up
     * @return
     */
    public Map queryUserInfo(Integer uid,Integer up){
        Map map = new HashMap();
        UserInfo userInfo = getUserByUid(uid);
        if(userInfo != null){
            map.put("email",userInfo.getEmail());
            map.put("uid",userInfo.getUid());
            map.put("nickName",userInfo.getNickName());
            map.put("gender",userInfo.getGender());
            map.put("contact",userInfo.getContact());
            if(userInfo.getProfileImg() != null) {
                String profileImg = FileUtil.PATH + "/" + userInfo.getProfileImg();
                map.put("profileImg", profileImg);
            }else{
                map.put("profileImg", null);
            }
            if(up != null && up.equals(uid)){
                map.put("lastLoginTime",userInfo.getLastLoginTime());
                map.put("regTime",userInfo.getRegTime());
            }
        }

        return map;
    }


    public UserInfo getUserByEmail(String email){
        UserInfo userInfo = userInfoMapper.queryUserByEmail(email);
        return userInfo;
    }

    public boolean addUserInfo(UserInfo userInfo){
        if(userInfo != null){

            if (userInfoMapper.insertSelective(userInfo) == 1){
                userInfo.setPasswd(null);
                return true;
            }
        }
        return false;
    }

    public UserInfo updateUserInfo(UserInfo userInfo, MultipartFile[] files ){
        Integer uid = userInfo.getUid();
        String profileImg = FileUtil.uploadFile(files);     //图片保存到本地  返回文件名
        if(profileImg == null || profileImg.equals("")){
            return null;
        }
        userInfo.setProfileImg(profileImg);
        if(userInfoMapper.updateByPrimaryKey(userInfo) != 1){
            return null;
        }
        userInfo = userInfoMapper.selectByPrimaryKey(uid);
        return userInfo;
    }

    /**
     * admin
     * @param param
     * @return
     */
    public Map getAllUserList(JSONObject param){
        Map result = new HashMap();
        List<UserInfo> userInfoList = userInfoMapper.getAllList(param);
        if(userInfoList  == null){
            return null;
        }else{
            List<Map> data = formatUserInfo(userInfoList);
            result.put("total",userInfoList.size());
            result.put("data",data);
        }
        return result;
    }


    public Map getAdminList(){
        Map result = new HashMap();
        List<UserInfo> userInfoList = userInfoMapper.getAdminList();

        if(userInfoList != null){
            List<Map> data = formatUserInfo(userInfoList);
            result.put("total",userInfoList.size());
            result.put("data",data);
        }

        return result;
    }

    public List<Map> formatUserInfo(List<UserInfo> userInfoList){
        List<Map> data = new ArrayList<>();

        for (UserInfo userInfo:userInfoList){
            Map<String,Object> map = new HashMap<>();
            String[] picture = CommonUtil.pictureToArr(userInfo.getProfileImg());
            map.put("userInfo",userInfo);
            map.put("profileImg",picture);
            data.add(map);
        }
        return data;
    }
    public Boolean deleteUserByUid(Integer uid){
        if(userInfoMapper.deleteByPrimaryKey(uid) == 1){
            return true;
        }else{
            return false;
        }
    }




}
