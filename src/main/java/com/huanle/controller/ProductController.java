package com.huanle.controller;


import com.huanle.Config.ErrorCode;
import com.huanle.entity.*;
import com.huanle.service.CommentService;
import com.huanle.service.MailServiceImpl;
import com.huanle.service.ProductInfoService;
import com.huanle.vo.ResponseVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("huanle/product")
@CrossOrigin(origins = "*")
@RestController
public class ProductController {
    private  static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    ProductInfoService productInfoService;

    @Autowired
    CommentService commentService;

    @Autowired
    MailServiceImpl mailService;


    /**
     * 添加(编辑)商品信息
     * @param files
     * @param title
     * @param myType
     * @param inventory
     * @param isNew
     * @param price
     * @param detail
     * @param productDate
     * @param productExpire
     * @param exchangeType
     * @param request
     * @param pid
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("publish")
    public ResponseVO pubilish(@RequestParam("files")MultipartFile[] files,
                               String title, String myType, String standard,Integer inventory , String isNew,
                               Double price, String detail, String productDate, String productExpire, String exchangeType,Integer pid, HttpServletRequest request){
        System.out.println("pid:"+pid);
        if(title == null || title.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:title");
        }
        if(myType == null || myType.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:myType");
        }
        if(standard == null || standard.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:standard");
        }
        if(inventory == null || inventory < 1){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:inventory");
        }
        if(isNew == null || isNew.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:isNew");
        }
        if(price == null || price < 0.0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:price");
        }
        if(detail == null || detail.equals("") ){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:detail");
        }
        if(exchangeType == null || exchangeType.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:exchangeType");
        }
        if(files == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:files");
        }
        UserInfo userSession =(UserInfo) request.getSession().getAttribute("userInfo");
        if(userSession == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录不可以发布");
        }

        ProductInfo productInfo = new ProductInfo();
        productInfo.setpUid(userSession.getUid());
        productInfo.setTitle(title);
        productInfo.setMyType(myType);
        productInfo.setInventory(inventory);
        productInfo.setIsNew(Integer.parseInt(isNew));
        productInfo.setPrice(price);
        productInfo.setDetail(detail);
        productInfo.setStandard(standard);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if(productDate != null && !productDate.equals("")){
                productInfo.setProductDate(df.parse(productDate));
            }
            if(productExpire != null && !productExpire.equals("")){
                productInfo.setProductExpire(df.parse(productExpire));
            }

        }catch (ParseException e){
            e.printStackTrace();
        }
        productInfo.setExchangeType(exchangeType);
        productInfo.setCreateAt((int)(new Date().getTime()/1000));

        if(pid != null && pid > 0){
            productInfo.setPid(pid);
            productInfo.setUpdateAt((int)(new Date().getTime()/1000));
            if(productInfoService.updateProduct(productInfo,files)){
                return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"编辑成功！");
            }else{
                return new ResponseVO(ErrorCode.UNKNOW_ERROR,"编辑失败！！！");
            }
        }else{
            if(productInfoService.addProductInfo(productInfo,files)){
                return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"发布成功！");
            }else{
                return new ResponseVO(ErrorCode.UNKNOW_ERROR,"发布失败！！！");
            }
        }


    }

    /**
     * 编辑商品信息前获取商品信息
     * @param pid
     * @return
     */
    @RequestMapping("publishAction")
    public ResponseVO publishAction(Integer pid){
        if(pid == null || pid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:pid");
        }
        Map productInfo = productInfoService.getProductInfoByPid(pid);
        if(productInfo != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,productInfo);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"获取商品信息失败");
        }
    }


    /**
     * 展示商品详情页
     * @param pid
     * @return
     */
    @RequestMapping("showProduct")
    public ResponseVO showProduct(Integer pid,HttpServletRequest request){
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        Integer upId = (up != null) ? up.getUid():null;
        Map map = productInfoService.getProduct(pid,upId);
        if(map != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,map);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"查找失败!");
        }
    }

    /**
     * 获取指定商品详情的评论信息
     * @param pid
     * @return
     */
    @RequestMapping("productComment")
    public ResponseVO productComment(Integer pid){
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }

        Map data = commentService.commentList(pid);
        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"error comment!");
        }



    }


    /**
     * 评论
     * @param pid
     * @param uid
     * @param content
     * @param parentId
     * @param request
     * @return
     */
    @RequestMapping("comment")
    public ResponseVO comment( Integer pid,Integer uid,String content,Integer parentId,HttpServletRequest request){
        System.out.println("parentId==="+parentId);

        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录不可以评论");
        }
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        if(uid == null || uid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: uid");
        }
        if(content == null || content.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: content");
        }
        Comment comment = new Comment();
        comment.setPid(pid);
        comment.setUserId(uid);
        comment.setContent(content);
        comment.setReply(0);
        comment.setCreateAt((int)(new Date().getTime()/1000));
        if(parentId == null || parentId < 0) {   //comment
            if (commentService.addComment(comment)) {
                return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, "ok!");
            } else {
                return new ResponseVO(ErrorCode.UNKNOW_ERROR, "评论失败！");
            }
        }else{          //reply
            Reply reply = new Reply();
            reply.setMessage(content);
            reply.setParentId(parentId);
            reply.setUserId(uid);
            reply.setCreateAt((int)(new Date().getTime()/1000));
            if(commentService.addReply(reply)) {
                return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, "ok!");
            }else{
                return new ResponseVO(ErrorCode.UNKNOW_ERROR,"回复失败！");
            }
        }

    }


    /**
     * 删除商品信息
     * @param pid
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("deleteProductInfo")
    public ResponseVO deleteProductInfo(Integer pid,HttpServletRequest request){
        if(pid == null || pid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        Integer upId = (up != null) ? up.getUid():null;
        if(upId == null || upId < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"登录失效，请重新登录！");
        }
        if(productInfoService.deleteProduct(pid)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"删除成功！");
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"删除失败！");
        }

    }

    /**
     * 商品和订单信息统计
     * @param uid
     * @param request
     * @return
     */
    @RequestMapping("statistics")
    public ResponseVO statistics(Integer uid ,HttpServletRequest request){
//        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请登录！");
//        }

        if(uid == null || uid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:uid");
        }

        Map data = productInfoService.getStatisticsRecord(uid);

        if(data == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"error!");
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }

    }

    /**
     * 推荐
     * @param pid
     * @param type
     * @return
     */
    @RequestMapping("recommend")
    public ResponseVO recommend(Integer pid ,String type){
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        if(type == null || type.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: type");
        }

        Map data = productInfoService.recommendList(pid,type);


        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
    }


    /**
     * 下架商品 email通知
     * @param pid
     * @param content
     * @param request
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping("downProduct")
    public ResponseVO downProduct(Integer pid,String content,HttpServletRequest request){
//

        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        if(content == null || content.isEmpty()){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: content");
        }
//        if(up == null){
//            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
//        }
//        Integer upId = up.getUid();

        Map map = productInfoService.getEmailAndNickName(pid);
        if(map == null || map.size() <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"send mail error");
        }
        String title = map.get("title").toString();
        String name = map.get("nick_name").toString();
        String to = map.get("email").toString();
        String subject = "换乐商品下架通知";

        content = name+" 用户! 您在换乐平台发布的"+title+"物品 ,目前该商品已被下架\n \t下架原因："+content+"\n请核对信息重新发布";

        mailService.sendSimpleMail(to,subject,content);

        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"ok");

    }

}
