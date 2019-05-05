var sendData={
	uidd:'',
	pidd:[],
	uid:'',
	user:''
}
// 使用ajax设置页面信息
function state() {
	var userNick = document.getElementById('userNick');
	var headImg = document.getElementById('touxiang');
	var haveLogin = document.getElementById('haveLogin');
	var noneLogin = document.getElementById('noneLogin');
	var uid;
	var mes = new XMLHttpRequest
	mes.onreadystatechange = function () {
		if (mes.status == 200 && mes.readyState == 4) {
			var peo = JSON.parse(mes.responseText);
			console.log(peo.code)

			if (peo.code != 0) {
				noneLogin.style.display = 'block';
				haveLogin.style.display = 'none'
			} else if (peo.code === 0) {
				haveLogin.style.display = 'block';
				noneLogin.style.display = 'none';
				userNick.innerHTML = peo.data.nickName;
				sendData.user=peo.data.uid
				headImg.src = ''
				$(".evalutIam").prepend('<span>客官，为这个给力的宝贝留下你的真心话呗！</span><form class="evalutForm" action="" method="get"><textarea class="evalutArea" id="evalutArea" name="evalutArea" maxlength="56" placeholder="请填写56字以内的评价！"></textarea><input type="button" name="evalutSubmit" id="evalutSubmit" class="evalutSubmit" value="提交"></form>');
				uid=peo.data.uid
			}
		}
	}
	mes.open('GET', 'huanle/index/upInfo', true)
	mes.send(null)
	var out = document.getElementById('out')
	var entry = document.getElementById('gerenzhuye')
	out.onclick = function () {
		window.localStorage.clear()
		location.reload([true]);
	}
	entry.onclick=function () {
		window.location.href=`personal.html?uid=${uid}`
	}

}

function ajaxContent() {
	var infoTitle = document.querySelector('.info-title');
	$.ajax({
		url: `/huanle/product/showProduct${window.location.search}`,
		type: "GET",
		dataType: "json",
		success: function (data) {
			//收藏按钮设置
			console.log(data)
			sendData.uidd=data.data.productInfo.pid;
		var arrs=	window.location.search.split('=')
		 var pidValue=arrs[1];
			var collBtn = document.getElementsByClassName('info-coll');
			if (data.data.collection == 0) {
				collBtn[0].innerHTML = "+收藏";
			} else if (data.data.collection == 1) {
				collBtn[0].innerHTML = "已收藏";
			}
			collBtn[0].onclick = function () {
				if (data.data.collection == 0) {
					$.ajax({
						url: "/huanle/personal/addCollection",
						type: "post",
						data: {
							title:data.data.productInfo.title,
							pid:  pidValue
						},
						success: function (data) {
							console.log(data)
							if (data.code != 0) {
								alert('很抱歉，收藏失败');
							} else if (data.code == 0) {
								alert('恭喜，收藏成功!');
								location.reload([true]);
							}
						}
					})
				} else if (data.data.collection!=0) {
					$.ajax({
						url: "/huanle/personal/deleteCollection",
						type: "post",
						data: {
							title:data.data.productInfo.title,
							pid:  pidValue
						},
						success: function (data) {
							if (data.code==0) {
								alert('取消收藏成功');
								location.reload([true]);
							} else if (data.code!= 0) {
								alert("取消收藏失败！");
							}
						}
					})
				}

			}

			//生成提交评论内容
			var submit = document.getElementById('evalutSubmit')
			var content = document.getElementById('evalutArea')
			
			submit.onclick = function () {
				$.ajax({
					url: "huanle/product/comment",
					type: "post",
					dataType: "json",
					data: {
						pid:sendData.uidd,
						uid:sendData.user,
						content: content.value

					},
					success: function (data) {
						if (data.code != 0) {
							alert('不好意思，');
						} else if (data.code == 0) {
							alert('提交成功，感谢您的评价');
							location.reload([true]);
						}
					}
				})
			}
			

			let releaseUser=document.getElementById('releaseUser')
			releaseUser.onclick=function(){
				window.location.href=`personal.html?${d}`
			}
			// 4.填充商品信息
			var infoTitle = document.getElementsByClassName('info-title');
			var infoPrice = document.getElementsByClassName('info-price');
			var infoBargain = document.getElementsByClassName('info-bargain');
			var infoSeller = document.getElementsByClassName('info-name');
			var infoCertification = document.getElementsByClassName('info-certification');
			var infoContact = document.getElementsByClassName('info-contact');
			var infoPlace = document.getElementsByClassName('info-place');
			var infoTime = document.getElementsByClassName('info-time');
			var infodetail = document.querySelectorAll('.infodetail');
			var infouser = document.querySelector('.info-user');
			var infocontract = document.querySelector('.info-contract');
			var infostandard = document.querySelector('.info-standard');

			infoTitle[0].innerHTML = data.data.productInfo.title;
			infouser.innerHTML = data.data.nickName;
			sendData.uid=data.data.uid;
			// infohistory.innerHTML = data.data.productInfo;
			// infocontract.innerHTML = data.data.productInfo;
			infostandard.innerHTML = data.data.productInfo.standard;
			infoPrice[0].innerHTML = "￥"+data.data.productInfo.price;
			infoBargain[0].innerHTML = data.data.productInfo.myType;
			infoSeller[0].innerHTML = data.data.productInfo.isNew+'成新';
			if(data.data.productInfo.productDate){
				var aaa=data.data.productInfo.productDate.split('T');
				infoCertification[0].innerHTML =  aaa[0];
			}else{
				infoCertification[0].innerHTML = data.data.productInfo.productDate
			}
			if(data.data.productInfo.productExpire){

				var bbb=data.data.productInfo.productExpire.split('T')
				infoContact[0].innerHTML =  bbb[0];
			}else{
				infoContact[0].innerHTML =  data.data.productInfo.productExpire
			}


			infoPlace[0].innerHTML = data.data.productInfo.exchangeType;
		     var times=	new Date(parseInt(data.data.productInfo.createAt) * 1000)
			var timesData=times.toLocaleString().split(' ')
			Date.prototype.toLocaleString = function() {
				return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 ";
			};
			infoTime[0].innerHTML =  timesData[0];
			infodetail[0].innerHTML= data.data.productInfo.detail;

			//5.填充商品图片

			if (data.data.picture.length > 0) {
				// 大图只需要一个，所以判断生成,更改rel与src实现刚加载时的放大镜效果
				// 生成具有class值为selected的第一个li，其余在下方循环生成
				$('.tb-booth').append(`<a href="#"><img src="${data.data.picture[0]}" alt="" rel="" class="jqzoom" /></a>`)
				$('.tb-thumb').append(`<li class="tb-selected"><div class="tb-pic tb-ssmall"><a href="#"><img src="${data.data.picture[0]}" class="smallImg"></a></div></li>`)
				$(".jqzoom").attr('rel', data.data.picture[0]);
				$(".jqzoom").attr('src', data.data.picture[0]);
			}
			for (var i = 0; i < data.data.picture.length - 1; i++) {
				//循环创建小图，length-1
				$('.tb-thumb').append(`<li class=""><div class="tb-pic tb-ssmall"><a href="#"><img src="" class="smallImg"></a></div></li>`)
			}
			var smallImg = document.getElementsByClassName('smallImg');
			for (var i = 0; i < data.data.picture.length; i++) {
				//循环更改小图src属性
				smallImg[i].src = `${data.data.picture[i]}`;
			}

			$("#thumblist li a").click(function () {
				//实现点击时切换显示的放大镜效果
				$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
				$(".jqzoom").attr('src', $(this).find("img").attr("src"));
				$(".jqzoom").attr('rel', $(this).find("img").attr("src"));
			});

			// 6.填充评论信息
			var aevalutCont = document.getElementsByClassName('evalutCont');
			var aevalutA = document.getElementsByClassName('evalutA');
			var aevalutImg = document.getElementsByClassName('evalutImg');
			var evaluUl=document.querySelector('.evalu-title-ul')
			var replyBtn = document.getElementById('replyBtn')
			var replyBox = document.getElementById('replyBox')
			$.ajax({
				url: `/huanle/product/productComment?pid=${sendData.uidd}`,
				type: "get",
				success: function (data) {
					console.log(data)
					if (data.code != 0) {
						alert('很抱歉，收藏失败');
					} else if (data.code == 0) {
						// for (var i = 0; i < data.data.commentList.length; i++) {
						// 	//循环创建评论条
						// 	$(".evalu-title-ul").prepend('<li><div class="evalutInfo"><div class="evalutPhoto"><a class="evalutA" href=""><img class="evalutImg" src="" alt=""></a></div><div class="evalutCont"></div></div></li>')
						// }
						// evalu(); //执行评价分页函数
						// for (var i = 0; i < data.data.commentList.length; i++) {
						// 	//循环添加评论内容
						// 	aevalutCont[i].innerHTML = data.data.commentList[i].comment.content;
						// 	aevalutA[i].href = sendData.user
						// 	aevalutImg[i].src = data.data.commentList[i].comment.profile_img;
						// }
						function showReply(){
							replyBox.style.display='block'
						}
                    for(let i=0;i<data.data.commentList.length;i++){
                    	var times=new Date(( data.data.commentList[i].comment.create_at)*1000).toLocaleDateString()
						evaluUl.innerHTML+=`<li>
                            <div class="evalutInfo">
                                <div class="evalutPhoto"><a class="evalutA" href=""><img class="evalutImg"
                                            src="${data.data.commentList[i].comment.profile_img}" alt="">
                                        <p>${data.data.commentList[i].comment.nick_name}</p >：
                                    </a ></div>
                                <div class="evalutCont">${data.data.commentList[i].comment.content}</div>
                                <div class="evalutTime">(${times})&nbsp;&nbsp;<a href="" onclick="${showReply()}">回复</a ></div>
                                <ul class="replay">
                                <li><div class="evalutPhoto"><a class="evalutA" href=""><img class="evalutImg"
                                    src="img/demo.jpg" alt="">
                                <p>smxsssss</p >：
                            </a ></div>
                        <div class="evalutCont">666</div>
                        <div class="evalutTime">(2019/4/27)&nbsp;&nbsp;</div></li>
                            </ul>
                            </div>    
						</li>`
						replyBtn.onclick=function(){
							$.ajax({
								url: "huanle/product/comment",
								type: "post",
								dataType: "json",
								data: {
									pid:sendData.uidd,
									uid:sendData.user,
									content: content.value
			
								},
								success: function (data) {
									if (data.code != 0) {
										alert('不好意思，');
									} else if (data.code == 0) {
										alert('提交成功，感谢您的评价');
										location.reload([true]);
									}
								}
							})
						}
			}  
			
					}
				}
			})


		

			//8.填充meta与title标签
			// var aMeta = document.getElementsByTagName('meta');
			// var aTitle = document.getElementsByTagName('title');
			// aMeta[2].content = arr.information.order_name;
			// aMeta[3].content = arr.information.order_name;
			// aTitle[0].innerHTML = arr.information.order_name;
		}
	})

}

//调用百度分享接口
function share() {
	window._bd_share_config = {
		"common": {
			"bdSnsKey": {},
			"bdText": "",
			"bdMini": "2",
			"bdMiniList": false,
			"bdPic": "",
			"bdStyle": "1",
			"bdSize": "24"
		},
		"share": {}
	};
	with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
}

//评价分页功能实现
// function evalu() {
// 	$('.evalu-title-ul').kkPages({
// 		PagesClass: 'li', //需要分页的按钮
// 		PagesMth: 6, //每页显示个数
// 		PagesNavMth: 5 //导航显示个数
// 	});
// }
function evalu() {
	$('.evalu-title-ul').kkPages({
		PagesClass: 'li',
		PagesMth: 4,
		PagesNavMth: 5
	});
}

let doWell=document.getElementById('doWell')
let changeList=document.getElementById('changeList')
let tochange=document.getElementById('tochange')
let detailList=document.querySelector('.detailList')

	doWell.onclick=function(){
	changeList.style.display='block';
	let xhr=new XMLHttpRequest;
	xhr.onreadystatechange=function(){
		if(xhr.status==200&&xhr.readyState==4){
			let goodsList=JSON.parse(xhr.responseText)
			console.log(goodsList)
			for(let i=0;i<goodsList.data.productList.length;i++)
			{    sendData.pidd[i]=goodsList.data.productList[i].pid;
				detailList.innerHTML+=`<p><label for="${goodsList.data.productList[i].pid}">
					 <img src="${goodsList.data.productList[i].picture}" height="100px" width="100px" alt=""><span>${goodsList.data.productList[i].title}</span><span>${goodsList.data.productList[i].myType}</span><span>${goodsList.data.productList[i].price}</span>
				 </label><input type="radio" id="${goodsList.data.productList[i].pid}" class="listlist" name="product" value="${goodsList.data.productList[i].pid}"></p>`
			}
		tochange.onclick=function(){
				var listlist=document.querySelectorAll('.listlist')
				var flag=0;
				for(let j=0;j<listlist.length;j++){
					if(listlist[j].checked==true){
						uidA =	sendData.pidd[j];
						flag=1;
					}
				}
				if(flag==0){
				return	alert('meixuanzhongzhi')
				}

					$.ajax({
						url: "huanle/orders/exchange",
						type: "post",
						data: {
							pid:sendData.uidd,
							upPid:uidA
						},
						success: function (data) {
                               if(data.code==0){
                               	alert(data.data)
								   location.reload([true])
							   }
						}
					})
			}

		}

	}
	xhr.open('GET','huanle/orders/getUpProductList',true)
	xhr.send(null);
}
let close=document.getElementById('close')
close.onclick=function(){
	changeList.style.display='none';
}

window.onload = function () {
	state()
	ajaxContent(); //ajax动态填充内容
	share(); //分享接口实现
}