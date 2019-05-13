//ajax设置个人页面
function state() {
    var userNick = document.getElementById('userNick');
    var headImg = document.getElementById('touxiang');
    var haveLogin = document.getElementById('haveLogin');
    var uid;
    var mes = new XMLHttpRequest
    mes.onreadystatechange = function () {
        if (mes.status == 200 && mes.readyState == 4) {
            var peo = JSON.parse(mes.responseText);

            if (peo.code != 0) {
                haveLogin.style.display = 'none'
            } else if (peo.code === 0) {
                haveLogin.style.display = 'block';
                userNick.innerHTML = peo.data.nickName;
                headImg.src = ''
                uid = peo.data.uid
            }
        }
    }
    mes.open('GET', 'huanle/index/upInfo', true)
    mes.send(null)
    var out = document.getElementById('out')
    out.onclick = function () {
        $.ajax({
            url: "huanle/user/logout",
            type: "get",
            success: function (data) {
                console.log(data)
                if (data.code != 0) {
                    alert('很抱歉，error');
                } else if (data.code == 0) {

                    window.location.href='homepage.html'
                }
            }
        })
    }

}

function sendPid(id) {

    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            window.location.href = `goods.html?pid=${id}`
        }
    }
    xhr.open('GET', '/huanle/product/showProduct')
    xhr.send(id)
}

function ajax() {
    $.ajax({
        url: `huanle/personal/getUserInfo${window.location.search}`,
        type: "get",
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                let headImg = document.querySelector('.headImg');
                var aeditName = document.getElementsByClassName('editName');
                var aeditImg = document.getElementsByClassName('img');
                var aeditPhone = document.getElementsByClassName('editPhone');
                var aeditEmail = document.getElementsByClassName('editEmail');
                var radio = document.getElementsByName("sex");


                 headImg.innerHTML=`<input type="file" class="img" name="files" multiple="multiple"><img src="${data.data.profileImg}" class="imggg" width="60px" height="60px">`
                aeditName[0].value=data.data.nickName;
                aeditPhone[0].value=data.data.contact;
                aeditEmail[0].value=data.data.email

                let img = document.querySelector('.img');
              img.onchange=  function () {
                    headImg.innerHTML = '';
                    let goodsImg = document.createElement('img');
                    goodsImg.style.width = `60px`
                    goodsImg.style.height = 60 + 'px'
                    goodsImg.src = window.URL.createObjectURL(img.files[0]);
                    headImg.appendChild(goodsImg)

                }
                for (var i = 0; i < radio.length; i++) {

                    if (radio[i].checked == data.data.gender) {

                       radio[i].checked=true

                        break;

                    }
                }
                var aeditSubmit = document.querySelector('.editSubmit');
                aeditSubmit.onclick= function(){
                    let editMeses=document.getElementById('editMeses')

                    form=new FormData(editMeses)
                    form.append('files',img.files[0])
                    var xhr=new XMLHttpRequest;
                    xhr.onreadystatechange=function(){
                        if(xhr.status==200&&xhr.readyState==4){
                            let data=JSON.parse(xhr.responseText)
                            if(data.code==0){

                                location.reload(([true]))
                            } else {
                                alert('很抱歉，修改出错！');
                            }

                        }
                    }
                    xhr.open('POST','huanle/user/editUserInfo')
                    xhr.send(form)
                    // $.ajax({
                    //     url: "huanle/user/editUserInfo",
                    //     type: "post",
                    //     data: form,
                    //     processData:false,
                    //     contentType:false,
                    //     success: function (data) {
                    //
                    //         if (data.code== 0) {
                    //
                    //             location.reload(([true]))
                    //         } else {
                    //             alert('很抱歉，修改出错！');
                    //         }
                    //     }
                    // })
                }
                // 设置头部信息
                var aPersPhoto = document.getElementsByClassName('personal-photo');
                var aCollect = document.getElementsByClassName('personal-collect');
                var aRelease = document.getElementsByClassName('personal-release');
                var loginOut = document.getElementsByClassName('hdr-log-reg');

                if(data.data.profileImg!=null){
                    aPersPhoto[0].src = data.data.profileImg;
                }else{
                    aPersPhoto[0].src = "/img/users.png"
                }




                //设置个人信息
                var aInfoNumber = document.getElementsByClassName('infoNumber');
                var aInfoName = document.getElementsByClassName('infoName');
                var aInfoPhone = document.getElementsByClassName('infoPhone');
                var aInfoSex = document.getElementsByClassName('infoQQ');
                var aInfoRT = document.getElementsByClassName('infoRegTime');
                var infoH2 = document.getElementsByClassName('infoH2');
                var aInfoLL = document.getElementsByClassName('infoLastLog');
                var userHistory = document.getElementsByClassName('userHistory');
                console.log(data)
                var regTimes
                aInfoNumber[0].innerHTML = data.data.email;
                aInfoName[0].innerHTML = data.data.nickName;
                aInfoPhone[0].innerHTML = data.data.contact;
                aInfoSex[0].innerHTML = data.data.gender;
                if(data.data.regTime){
                   regTimes=data.data.regTime.split('T')
                    aInfoRT[0].innerHTML = regTimes[0].replace(/-/g,'/');
                }else{
                    infoH2[4].style.display='none'
                    infoH2[5].style.display='none'
                    for(let i=0;i<userHistory.length;i++){
                        userHistory[i].style.display='none'
                    }
                }
                if(data.data.lastLoginTime){
                    var LastTime=new Date(parseInt(data.data.lastLoginTime)*1000 )
                    var lasttimesData = LastTime.toLocaleString().split(' ')
                    Date.prototype.toLocaleString = function () {
                        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 ";
                    };
                    aInfoLL[0].innerHTML = lasttimesData[0];
                }



                $.ajax({
                    url: `huanle/personal/collectionList${window.location.search}`,
                    type: "get",
                    success: function (data) {
console.log(data)
                        if (data.code == 0) {
                            //设置收藏信息
                            if (data.data.collectList.length == 0) {
                                $('.boxThreeUl').prepend('<p class="NoColHis">客官，您还没有收藏任何东西呦！</p>');
                                aCollect[0].innerHTML = 0
                            } else {
                                aCollect[0].innerHTML = data.data.collectList.length;
                                for (var i = 0; i < data.data.collectList.length; i++) {
                                    $('.boxThreeUl').prepend('<li><div class="collect"><div class="clctImg"><a href="" class="clctImgA"><img src="" alt="" class="clctImgCont"></a></div><div class="clctInfo"><span class="clctInfo-name">goods</span><span class="clctInfo-cont"><a href="#" class="clctInfoSell"></a></span><span class="clctInfo-name">time</span><span class="clctInfo-cont clctInfoGoods"></span></div><div class="clctCancle"><span>取消收藏</span></div></div></li>');
                                }
                                var aclctCancle = document.getElementsByClassName('clctCancle');
                                for (var i = 0; i < data.data.collectList.length; i++) {
                                    (function (j) {
                                        aclctCancle[j].onclick = function () {
                                            $.ajax({
                                                url: "huanle/personal/deleteCollection",
                                                type: "post",
                                                data: {
                                                    "choice": 1,
                                                    "order_id": data.collection[j].order_id
                                                },
                                                success: function (data) {
                                                    var as = eval("(" + data + ")");
                                                    if (as.ok == 0) {
                                                        alert("很抱歉，删除失败！");
                                                    } else if (as.ok == 1) {
                                                        alert('恭喜您，修改成功！');
                                                        location.reload([true]);
                                                    }
                                                }
                                            })
                                        }
                                    })(i)
                                }
                                var aclctImgA = document.getElementsByClassName('clctImgA');
                                var aclctImgCont = document.getElementsByClassName('clctImgCont');
                                var aclctInfoSell = document.getElementsByClassName('clctInfoSell');
                                var aclctInfoGoods = document.getElementsByClassName('clctInfoGoods');
                                var aclctInfoPrice = document.getElementsByClassName('clctInfoPrice');
                                for (var i = 0; i < data.data.collectList.length; i++) {


                                    var times = new Date(parseInt(data.data.collectList[i].createAt) * 1000)
                                    var timesData = times.toLocaleString().split(' ')
                                    Date.prototype.toLocaleString = function () {
                                        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 ";
                                    };
                                    aclctInfoGoods[i].innerHTML = timesData[0]
                                    aclctImgCont[i].src=data.data.collectList[i].picture
                                    aclctInfoSell[i].innerHTML =data.data.collectList[i].productTile;

                                }
                            }
                        }
                    }
                })

                $.ajax({
                    url: `huanle/personal/allProductions${window.location.search}`,
                    type: "get",
                    success: function (data) {
                        console.log(data)
                        if (data.code == 0) {
                            //设置历史发布信息
                            if (data.data.productList.length == 0) {
                                $('.boxFourUl').prepend('<p class="NoColHis">赶快去发布自己的物品吧！</p>');
                                aRelease[0].innerHTML = 0
                            } else {
                                aRelease[0].innerHTML = data.data.productList.length;
                                for (var i = 0; i < data.data.productList.length; i++) {
                                    $('.boxFourUl').prepend('<li><div class="history"><div class="histImg"><a href="" class="histImgA"><img src="images/01_mid.jpg" alt="" class="histImgCont"></a></div><div class="histInfo"><span class="histInfo-name">名称</span><span class="histInfo-cont histInfoCont"></span><span class="histInfo-name">价格</span><span class="histInfo-cont histInfoPrice"></span><span class="histInfo-name">想要换类型</span><span class="histInfo-cont histInfo-type"></span><span class="histInfo-cont histInfoTime">2019/12/1</span></div><span class="pressStatus"></span><div class="histCancle"><span>删除记录</span></div><div class="hasEdit"><span>编辑</span></div><div class="Lowershelf"><span>下架</span></div></div></li>');
                                }
                                var ahistCancle = document.getElementsByClassName('histCancle');
                                var Lowershelf = document.getElementsByClassName('Lowershelf');
                                var hasEdit = document.getElementsByClassName('hasEdit');
                                function releaseGoods(id) {
                                    $.ajax({
                                        url: "huanle/product/publishAction",
                                        type: "post",
                                        data: {
                                            pid:id
                                        },
                                        success: function (data) {
                                            if(data.code===0){
                                                window.location.href = `release.html?pid=${id}`
                                            }
                                        }
                                    })
                                }
                                for (let i = 0; i < data.data.productList.length; i++) {
                                    hasEdit[i].addEventListener('click',function () {
                                        releaseGoods(data.data.productList[i].pid)
                                    })
                            }
                                for (var i = 0; i < data.data.productList.length; i++) {
                                        Lowershelf[i].onclick = function () {
                                            $.ajax({
                                                url: "",
                                                type: "post",
                                                data: {
                                                   
                                                },
                                                success: function (data) {
                                                   
                                                    if (data.code == 0) {
                                                        alert('下架成功！');
                                                        location.reload([true]);
                                                    } else if (data.ok != 0) {
                                                        alert('网络问题！');
                                                        
                                                    }
                                                }
                                            })
                                        }
                                }
                                for (var i = 0; i < data.data.productList.length; i++) {
                                        ahistCancle[i].onclick = function () {
                                            $.ajax({
                                                url: "",
                                                type: "post",
                                                data: {
                                                   
                                                },
                                                success: function (data) {
                                                 
                                                    if (data.code == 0) {
                                                        alert('删除成功！');
                                                        location.reload([true]);
                                                    } else if (data.code != 1) {
                                                        alert('网络问题！');
                                                    }
                                                }
                                            })
                                        }
                                }
                                var ahistImgA = document.getElementsByClassName('histImgA');
                                var ahistImgCont = document.getElementsByClassName('histImgCont');
                                var ahistInfoCont = document.getElementsByClassName('histInfoCont');
                                var ahistInfoPrice = document.getElementsByClassName('histInfoPrice');
                                var ahistInfoTime = document.getElementsByClassName('histInfoTime');
                                var pressStatus = document.getElementsByClassName('pressStatus');
                                for (var i = 0; i < data.data.productList.length; i++) {
                                    ahistImgA[i].href = "goods.html?pid=" + data.data.productList[i].pid;
                                    if (data.data.productList[i].picture[0])
                                        ahistImgCont[i].src = data.data.productList[i].picture[0];
                                    ahistInfoCont[i].innerHTML = data.data.productList[i].title;
                                    ahistInfoPrice[i].innerHTML = data.data.productList[i].price;
                                    var times = new Date(parseInt(data.data.productList[i].createAt) * 1000)
                                    var timesData = times.toLocaleString().split(' ')
                                    Date.prototype.toLocaleString = function () {
                                        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 ";
                                    };
                                    ahistInfoTime[i].innerHTML = timesData[0];

                                    pressStatus[i].innerHTML = data.data.productList[i].advice;
                                }
                            } //执行收藏与历史分页分页函数
                            evlau();
                        } else if (data.err == 1) {
                            self.location = 'error.html';
                        }

                    }
                })
                var oids = [];
                function dianji(j,k){
                    var orderContent=document.getElementById('orderContent')
                    orderContent.style.display = 'block';
                    $.ajax({
                        url: `huanle/orders/orderDetail?oid=${oids[j]}`,
                        type: "get",
                        success: function (data) {
                            console.log(data)
                            if (data.code == 0) {
                                var times = new Date(parseInt(data.data.createAt) * 1000)
                                var timesData = times.toLocaleString().split(' ')
                                Date.prototype.toLocaleString = function () {
                                    return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 ";
                                };
                                if(data.data.other.length==0){
                                    orderContent.innerHTML = `<h2>订单详情</h2><span class="deleteX">X</span>
                                    <div class="orderTitleBox"> <p class="orderTitle">订单编号：<span>${data.data.nums}</span></p> <p class="orderTitle">创建时间：<span>${timesData[0]}</span></p></div>
                                               <div class="contrast">
                                                   <h3>你的物品</h3>
                                                  <a href="javascript:;" onclick="sendPid(${data.data.myself.pid})"><img src="${data.data.myself.picture[0]}" alt="" width="150px" height="150px"></a>
                                                   <p>名称：<span>${data.data.myself.title}</span></p>
                                                   <p>status：<span>${data.data.myself.status}</span></p>
                                                   <p>类型：<span>${data.data.myself.my_type}</span></p>
                                                   <p>yonghuming：<span>${data.data.myself.nick_name}</span></p>
                                                   <p>价格：<span>${data.data.myself.price}</span></p>
                                                   <p>新旧程度：<span>${data.data.myself.is_new}xin</span></p>
                                                   <p>联系方式：<span>${data.data.myself.contact}</span></p>
                                               </div>
                                               <div class="contrast">
                                                   <p>该物品已下架!!!</p>
                                               </div>
                                               <button class="agreeOrder orderdoWell">agree</button><button class="cancelOrder2 orderdoWell">cancel</button>`
                                }else{
                                    orderContent.innerHTML = `<h2>订单详情</h2><span class="deleteX">X</span>
                                    <div class="orderTitleBox"> <p class="orderTitle">订单编号：<span>${data.data.nums}</span></p> <p class="orderTitle">创建时间：<span>${timesData[0]}</span></p></div>
                                               <div class="contrast">
                                                   <h3>你的物品</h3>
                                                  <a href="javascript:;" onclick="sendPid(${data.data.myself.pid})"><img src="${data.data.myself.picture[0]}" alt="" width="150px" height="150px"></a>
                                                   <p>名称：<span>${data.data.myself.title}</span></p>
                                                   <p>status：<span>${data.data.myself.status}</span></p>
                                                   <p>类型：<span>${data.data.myself.my_type}</span></p>
                                                   <p>yonghuming：<span>${data.data.myself.nick_name}</span></p>
                                                   <p>价格：<span>${data.data.myself.price}</span></p>
                                                   <p>新旧程度：<span>${data.data.myself.is_new}xin</span></p>
                                                   <p>联系方式：<span>${data.data.myself.contact}</span></p>
                                               </div>
                                               <div class="contrast">
                                                   <h3>对方物品</h3>
                                                  <a href="javascript:;" onclick="sendPid(${data.data.other.pid})"><img src="${data.data.other.picture[0]}" alt=""  width="150px" height="150px"></a>
                                                   <p>名称：<span>${data.data.other.title}</span></p>
                                                    <p>status：<span>${data.data.other.status}</span></p>
                                                   <p>类型：<span>${data.data.other.my_type}</span></p>
                                                   <p>yonghuming：<span>${data.data.other.nick_name}</span></p>
                                                   <p>价格：<span>${data.data.other.price}</span></p>
                                                   <p>新旧程度：<span>${data.data.other.is_new}</span></p>
                                                   <p>联系方式：<span>${data.data.other.contact}</span></p>
                                               </div>
                                               <button class="agreeOrder orderdoWell">agree</button><button class="cancelOrder2 orderdoWell">cancel</button>`
                                }
                               
                                var deleteX = document.querySelector('.deleteX')
                                deleteX.onclick = function () {
                                    orderContent.style.display = 'none'
                                }
                                var cancelOrder2 = document.querySelector('.cancelOrder2')

                                cancelOrder2.onclick = function () {

                                     $.ajax({
                                         url: "huanle/orders/agreeRequest",
                                         type: "post",
                                         data: {
                                             "oid": data.data.oid,
                                             "type": 2
                                         },
                                         success: function (data) {
 
                                             if (data.code != 0) {
                                                 alert('很抱歉，agree失败!');
                                             } else if (data.code == 0) {
                                                 alert('删除成功！');
                                                 location.reload([true]);
                                             }
                                         }
                                     })
                                 }

                                var agreeOrder = document.querySelector('.agreeOrder')

                               if(k==0)
                                   agreeOrder.style.display = 'inline-block'
                                agreeOrder.onclick = function () {
                                    $.ajax({
                                        url: "huanle/orders/agreeRequest",
                                        type: "post",
                                        data: {
                                            "oid": data.data.oid,
                                            "type": 1
                                        },
                                        success: function (data) {

                                            if (data.code != 0) {
                                                alert('很抱歉，agree失败!');
                                            } else if (data.code == 0) {
                                                alert('删除成功！');
                                                location.reload([true]);
                                            }
                                        }
                                    })
                                }

                            } else {
                                alert('网络错误');
                            }
                        }
                    })


                }
                function exchangeOthers() {

                    $.ajax({
                        url: "huanle/orders/exchangeOthers",
                        type: "get",
                        success: function (data) {
  console.log(data)
                            if (data.code == 0) {
                                oids=[]
                                var woqingqiu = document.querySelector('.woqingqiu')
                                woqingqiu.innerHTML=''
                                for (var i = 0; i < data.data.orders.length; i++) {
                                    oids.push(data.data.orders[i].oid)
                                    woqingqiu.innerHTML += `<li><img src="${data.data.orders[i].picture}" width="90px" height="90px" alt=""><span>${data.data.orders[i].title}</span><a class="orderDetail2" href="javascript:;">订单详情</a><button class="cancelOrder">取消订单</button></li>`
                                }

                                  var cancelOrder=document.querySelectorAll('.cancelOrder')
                                 for (let i=0;i<cancelOrder.length;i++){
                                     cancelOrder[i].onclick=function () {
                                         $.ajax({
                                             url: "huanle/orders/agreeRequest",
                                             type: "post",
                                             data: {
                                                 "oid": oids[i],
                                                 "type": 2
                                             },
                                             success: function (data) {

                                                 if (data.code != 0) {
                                                     alert('很抱歉，agree失败!');
                                                 } else if (data.code == 0) {
                                                     alert('删除成功！');
                                                     location.reload([true]);
                                                 }
                                             }
                                         })
                                     }
                                 }
                                var orderDetail2 = document.querySelectorAll('.orderDetail2')


                                for (let j = 0; j < orderDetail2.length; j++) {

                                    orderDetail2[j].addEventListener('click',function (){dianji(j)})

                                }
                            }
                        }
                    })

                }
                function exchangeMe() {
                    $.ajax({
                        url: "huanle/orders/exchangeMe",
                        type: "get",
                        success: function (data) {
                            if (data.code == 0) {
                                oids=[]
                                var qingqiuwo = document.querySelector('.qingqiuwo')
                                qingqiuwo.innerHTML=''
                                for (var i = 0; i < data.data.orders.length; i++) {
                                    oids.push(data.data.orders[i].oid)
                                    qingqiuwo.innerHTML += `<li><img src="${data.data.orders[i].picture}" width="90px" height="90px" alt=""><span>${data.data.orders[i].title}</span><a class="orderDetail3 specialDetail" href="javascript:;">订单详情</a><button class="cancelOrder3">取消订单</button></li>`
                                }
                                var cancelOrder3=document.querySelectorAll('.cancelOrder3')
                                for (let i=0;i<cancelOrder3.length;i++){
                                    cancelOrder3[i].onclick=function () {
                                        $.ajax({
                                            url: "huanle/orders/agreeRequest",
                                            type: "post",
                                            data: {
                                                "oid": oids[i],
                                                "type": 2
                                            },
                                            success: function (data) {

                                                if (data.code != 0) {
                                                    alert('很抱歉，agree失败!');
                                                } else if (data.code == 0) {
                                                    alert('删除成功！');
                                                    location.reload([true]);
                                                }
                                            }
                                        })
                                    }
                                }
                                var orderDetail3 = document.querySelectorAll('.orderDetail3')

                                for (let j = 0; j < orderDetail3.length; j++) {

                                    orderDetail3[j].addEventListener('click',function (){dianji(j,0)})

                                }
                            }
                        }
                    })

                }
                function OrderHistory(){
                    $.ajax({
                        url: "huanle/orders/orderList",
                        type: "get",
                        success: function (data) {
                            console.log(data)
                            if (data.code == 0) {
                                //订单历史
                                oids=[]
                                var allOrder = document.querySelector('.allOrder')
                                allOrder.innerHTML=''
                                for (var i = 0; i < data.data.orders.length; i++) {
                                    oids.push(data.data.orders[i].oid)
                                    allOrder.innerHTML += `<li><img src="${data.data.orders[i].picture}" width="90px" height="90px" alt=""><span>${data.data.orders[i].title}</span><a class="orderDetail" href="javascript:;">订单详情</a></li>`
                                }
                                var cancelOrder4=document.querySelectorAll('.cancelOrder4')
                                for (let i=0;i<cancelOrder4.length;i++){
                                    cancelOrder4[i].onclick=function () {
                                        $.ajax({
                                            url: "huanle/orders/agreeRequest",
                                            type: "post",
                                            data: {
                                                "oid": oids[i],
                                                "type": 2
                                            },
                                            success: function (data) {

                                                if (data.code != 0) {
                                                    alert('很抱歉，agree失败!');
                                                } else if (data.code == 0) {
                                                    alert('删除成功！');
                                                    location.reload([true]);
                                                }
                                            }
                                        })
                                    }
                                }
                                var orderDetail = document.querySelectorAll('.orderDetail')


                                for (let j = 0; j < orderDetail.length; j++) {

                                    orderDetail[j].addEventListener('click',function (){dianji(j)})

                                }

                            }

                        }
                    })
                }
                OrderHistory();
                // var haveDone=document.getElementById('haveDone')
                // var meDone=document.getElementById('meDone')
                // var qingDone=document.getElementById('qingDone')
                let btns=document.querySelectorAll('.btns')
                let dingdan=document.querySelectorAll('.dingdan')

                for(let i=0;i<btns.length;i++){
                    btns[i].onclick=function(){

                        for(let j=0;j<btns.length;j++){
                            btns[j].className='btns';
                            dingdan[j].style.display='none'
                        }
                        btns[i].className='btns btnsActive';
                        if(i===0){
                            OrderHistory();
                        }else if(i===1){
                            exchangeOthers();
                        }else{
                            exchangeMe();
                        }
                        dingdan[i].style.display='block'
                    }

                }

         

            }
        }
    })
    let corrent=document.getElementById('corrent')
    let correntPass=document.getElementById('correntPass')
    corrent.onclick=function(){
        let formContent=new FormData(correntPass)
        let xhr=new XMLHttpRequest;
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                let data=JSON.parse(xhr.responseText)
                if(data.code==0){
                    alert(data.data);
                    location.reload([true])
                }
            }
        }
        xhr.open('POST','huanle/personal/updatePasswd')
        xhr.send(formContent)
    }
}




// 图片上传
function uploadImg() {
    $('#ssi-upload').ssi_uploader({
        url: 'path/to/upload.php',
        preview: true,
        allowed: ['jpg', 'jpeg', 'png', 'gif'],
        maxFileSize: 5,
    });
}

// 编辑弹出框
function edit() {
    $(function () {
        $(".editBtn").click(function (event) {
            event.stopPropagation();
            $(".editInfoBg").show();
            $(".editInfoWr").show();
        });
        $(".editInfoBg").click(function (event) {
            $(".editInfoBg").hide();
            $(".editInfoWr").hide();
            event.stopPropagation(); //阻止事件冒泡
        });
    });
}

//退出登录



// 分页
function evlau() {
    $('#boxThree,#boxFour').kkPages({
        PagesClass: 'li',
        PagesMth: 4,
        PagesNavMth: 5
    });
}

window.onload = function () {
    state();
    uploadImg(); //上传图片设置
    tab(); //执行选项卡
    edit(); //弹出编辑个人信息框

  //ajax上传编辑信息
    ajax(); //ajax设置个人页面
    //提交编辑内容

}