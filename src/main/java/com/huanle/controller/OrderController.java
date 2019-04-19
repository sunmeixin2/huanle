package com.huanle.controller;

import com.huanle.Config.ErrorCode;
import com.huanle.entity.Orders;
import com.huanle.entity.UserInfo;
import com.huanle.service.OrderService;
import com.huanle.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RequestMapping("huanle/orders")
@CrossOrigin(origins = "*")
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    /**
     * 点击确认交换按钮
     * @param upPid
     * @param pid
     * @param request
     * @return
     */
    @RequestMapping("exchange")
    public ResponseVO exchangeProd(Integer upPid, Integer pid, HttpServletRequest request){

        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        Integer upId = up.getUid();
        if(upId == null || upId < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录,不允许交换！");
        }

        if(pid == null || pid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: pid");
        }
        if(upPid == null || upPid < 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数: upPid");
        }

        Orders orders = new Orders();
        orders.setaPid(upPid);
        orders.setbPid(pid);
        orders.setaUid(upId);
        if(orderService.addOrders(orders)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"订单添加成功,等待对方同意！");
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"失败");
        }
    }


    /**
     * 获取当前登录用户所有已发布的商品信息（已通过审核）
     * @param request
     * @return
     */
    @RequestMapping("getUpProductList")
    public ResponseVO getUserProductList(HttpServletRequest request){
        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录状态！");
        }
        Integer upId = up.getUid();

        Map result = orderService.getUpProdList(upId);
        if(result == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"您还未发布任何商品！");
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,result);
        }
    }

    /**
     * 全部订单
     */
    @RequestMapping("orderList")
    public ResponseVO orderList(HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"未登录!");
        }
        Integer upId = up.getUid();
        Map data = orderService.getOrderList(upId);
        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"订单列表为空！");
        }

    }

    /**
     * 我请求交换的订单列表
     * @param request
     * @return
     */
    @RequestMapping("exchangeOthers")
    public ResponseVO exchangeOthers( HttpServletRequest request){
        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请先登录！");
        }
        Integer upId = up.getUid();
        if(upId == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请先登录！");
        }
        Map data = orderService.getExchangeOtherList(upId);

        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"订单列表为空！");
        }

    }


    /**
     * 请求交换我的订单列表
     * @param request
     * @return
     */
    @RequestMapping("exchangeMe")
    public ResponseVO exchangeMe(HttpServletRequest request){
        UserInfo up = (UserInfo)request.getSession().getAttribute("userInfo");
        Integer upId =  (up == null)? null:up.getUid();
        if(upId == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请先登录！");
        }

        Map data = orderService.getExchangeMeList (upId);
        if(data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"订单列表为空！");
        }

    }


    /**
     * 同意和取消请求
     * @param oid
     * @param type
     * @param request
     * @return
     */
    @RequestMapping("agreeRequest")
    public ResponseVO agreeAndCancle(Integer oid,Integer type, HttpServletRequest request){
        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请登录后再确认！");
        }
        if(oid == null || oid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:oid");
        }
        if(type == null || type <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:type");
        }
        if(orderService.orderDeal(oid,type)){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"确认成功！");
        }else{
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,"确认失败失败！");
        }



    }


    /**
     * 订单详情
     */
    @RequestMapping("orderDetail")
    public ResponseVO orderDetail(Integer oid,HttpServletRequest request){

        UserInfo up = (UserInfo) request.getSession().getAttribute("userInfo");
        if(up == null){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"请先登录！");
        }
        if(oid == null || oid <= 0){
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"非法参数:oid");
        }
        Integer upId = up.getUid();
        Map data = orderService.detail(oid,upId);
        if (data != null){
            return new ResponseVO(ErrorCode.RESPONSE_SUCCESS,data);
        }else {
            return new ResponseVO(ErrorCode.UNKNOW_ERROR,"查询订单失败！");
        }


    }
}
