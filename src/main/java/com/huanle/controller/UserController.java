package com.huanle.controller;

import com.huanle.Config.ErrorCode;
import com.huanle.Util.CommonUtil;
import com.huanle.Util.RandomValidateCodeUtil;
import com.huanle.entity.UserInfo;
import com.huanle.service.UserInfoService;
import com.huanle.vo.ResponseVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Date;


@RequestMapping("huanle/user")
@CrossOrigin(origins = "*")
@RestController
public class UserController {

    private  static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserInfoService userInfoService;

    @RequestMapping("login")
    public ResponseVO Login(String email, String passwd,String verify, Integer groupId, HttpServletRequest request){
        if(email == null || email.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:email");
        }
        if(passwd == null || passwd.equals("") || passwd.length() < 6){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:passwd");
        }
        if(verify == null || verify.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:verify");
        }
        String verifyCode =(String) request.getSession().getAttribute("RANDOMVALIDATECODEKEY");
        if(verifyCode == null || !verify.equals(verifyCode)){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"验证码错误！");
        }
        if(groupId == null || groupId < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:gender");
        }
        UserInfo userInfo = userInfoService.getUserInfo(email,passwd,groupId);
        if(userInfo == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"error");
        }else {
            request.getSession().setAttribute("userInfo",userInfo);
//            UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//
//            System.out.println(up.getEmail());
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,userInfo);
        }
    }
    @CrossOrigin(origins = "*")
    @RequestMapping("/register")
    public ResponseVO register(String email,String passwd,String nickName,String contact,HttpServletRequest request){

        if(email == null || email.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:email");
        }

        //判断email是否已经注册过
        UserInfo isSave = userInfoService.getUserByEmail(email);
        if(isSave != null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"邮箱已经注册");
        }

        if(nickName == null || nickName.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:nickName");
        }
        if(passwd == null || passwd.equals("") || passwd.length() < 6 ){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:passwd");
        }
        if(contact == null || contact.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:contact");
        }

        Date date = new Date();

        UserInfo userInfo = new UserInfo();

        userInfo.setEmail(email);
        passwd = CommonUtil.makeMD5(passwd);
        userInfo.setPasswd(passwd);
        userInfo.setGroupId(2);
        userInfo.setNickName(nickName);
        userInfo.setContact(contact);
        userInfo.setLastLoginTime(Integer.parseInt(date.getTime()/1000+""));
        userInfo.setRegTime(date);

        if(userInfoService.addUserInfo(userInfo)){
            //设置session
            request.getSession().setAttribute("userInfo",userInfo);
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,userInfo);
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"注册失败");
        }
    }

    @RequestMapping("/editUserInfo")
    public ResponseVO editUserInfo(@RequestParam("files")MultipartFile[] files,Integer uid,String nickName,String email,String gender,String contact,HttpServletRequest request){
        if(uid == null || uid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:uid");
        }
        if(email == null || email.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:email");
        }
        if(nickName == null || nickName.equals("") || nickName.length() > 32){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:nickName");
        }
        if(gender == null || gender.equals("") || gender.length() > 2){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:gender");
        }
        if(contact == null || contact.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:contact");
        }
        UserInfo userInfo = userInfoService.getUserByUid(uid);
        if(userInfo == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"该用户不存在！");
        }
        if(files == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:files");
        }
        userInfo.setEmail(email);
        userInfo.setNickName(nickName);
        userInfo.setGender(gender);
        userInfo.setContact(contact);

        Long currentTime = new Date().getTime()/1000;
        userInfo.setUpdateAt(Integer.parseInt(currentTime.toString()));

        UserInfo userInfoRet = userInfoService.updateUserInfo(userInfo,files);
        if(userInfoRet != null){
            request.getSession().setAttribute("userInfo",userInfoRet);
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,userInfoRet);
        }

        return new ResponseVO(ErrorCode.UNKNOW_ERROR,"修改信息失败！");
    }

    /**
     * 退出登录
     * @return
     */
    @RequestMapping("logout")
    public ResponseVO logout(HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up != null){
            request.getSession().removeAttribute("userInfo");
        }
        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"退出成功！");
    }

    /**
     * 生成验证码
     * @param request
     * @param response
     */

    @RequestMapping("getVerify")
    public void getVerify(HttpServletRequest request , HttpServletResponse response){

        try {
            response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
            response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            RandomValidateCodeUtil randomValidateCode = new RandomValidateCodeUtil();
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法
        } catch (Exception e) {
            logger.error("获取验证码失败>>>>   ", e);
        }

    }



//    @RequestMapping("/uploadImg")
//    public ResponseVO uploadImg(@RequestParam("files") MultipartFile[] files){
//
//        for(MultipartFile file:files){
//            String fileName = file.getOriginalFilename();
//            fileName = FileNameUtil.getNewFileName(fileName);
//            if (!FileUtil.upload(file,fileName)){
//                return new ResponseVO(ErrorCode.UNKNOW_ERROR,"upload failed");
//            }
//        }
//        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"success");
//    }



//    @RequestMapping("/showImg")
//    public ResponseEntity showImg(String fileName){
//        try {
//            // 由于是读取本机的文件，file是一定要加上的， path是在application配置文件中的路径
//            return ResponseEntity.ok(resourcsmx1130
//                    eLoader.getResource("file:" + path + fileName));
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }






}
