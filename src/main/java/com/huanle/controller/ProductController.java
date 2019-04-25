package com.huanle.controller;


import com.huanle.Config.ErrorCode;
import com.huanle.entity.Comment;
import com.huanle.entity.ParentChild;
import com.huanle.entity.ProductInfo;
import com.huanle.entity.UserInfo;
import com.huanle.service.CommentService;
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
                               Double price, String detail, String productDate, String productExpire, String exchangeType, HttpServletRequest request, Integer pid){
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
        return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"");


    }


    /**
     * 评论
     * @param pid
     * @param uid
     * @param content
     * @param request
     * @return
     */
    @RequestMapping("comment")
    public ResponseVO comment(Integer pid,Integer uid,String content,HttpServletRequest request){
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
        if(commentService.addComment(comment)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"ok");
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"评论失败！");
        }

    }

    /**
     * 回复
     * @param parentId
     * @param childId
     * @param content
     * @param pid
     * @param request
     * @return
     */
    @RequestMapping("reply")
    public ResponseVO reply(Integer parentId,Integer childId,String content,Integer pid,HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录不可以回复");
        }
        if(parentId == null || parentId < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: parentId");
        }
        if(childId == null || childId < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: childId");
        }
        if(content == null || content.equals("")){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: content");
        }
        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        ParentChild parentChild = new ParentChild();
        parentChild.setParentId(parentId);
        parentChild.setChildId(childId);
        if(commentService.addReply(parentChild,content,pid)) {
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS, "");
        }else{
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"回复失败！");
        }

    }


    /**
     * 删除(下架)商品信息
     * @param pid
     * @return
     */
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

}
