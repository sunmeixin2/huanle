// 使用ajax设置页面信息
function state() {
	var userNick = document.getElementById('userNick');
	var headImg = document.getElementById('touxiang');
	var haveLogin = document.getElementById('haveLogin');
	var noneLogin = document.getElementById('noneLogin');
	var mes = new XMLHttpRequest
	mes.onreadystatechange = function () {
		if (mes.status == 200 && mes.readyState == 4) {
			var peo = JSON.parse(mes.responseText);
			console.log(peo)
			if (peo.code != 0) {
				noneLogin.style.display ='block';
				haveLogin.style.display = 'none'
			} else if (peo.code == 0) {
				haveLogin.style.display = 'block';
				noneLogin.style.display = 'none';
				userNick.innerHTML = peo.data.nickName;
				headImg.src = '';
				$(".hdr-search").after('<div class="hdr-personal"><a href="" class="hdr-persHref"><img src="" title="个人空间" alt="个人空间" class="hdr-persImg"></a></div><div class="signOut">退出</div>');
				$(".evalutIam").prepend('<span>客官，为这个给力的宝贝留下你的真心话呗！</span><form class="evalutForm" action="" method="get"><textarea class="evalutArea" id="evalutArea" name="evalutArea" maxlength="56" placeholder="请填写56字以内的评价！"></textarea><input type="button" name="evalutSubmit" id="evalutSubmit" class="evalutSubmit" value="提交"></form>');

			}
		}
	}
	mes.open('GET', '/huanle/index/upInfo', true)
	mes.send(null)
	var out = document.getElementById('out')
	out.onclick = function () {
		window.localStorage.clear()
		location.reload([true]);
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
				} else if (arr.ifcoll == 1) {
					$.ajax({
						url: "delete.php",
						type: "post",
						data: {
							"choice": 1,
							"order_id": order_idNum
						},
						success: function (data) {
							var returnData = eval("(" + data + ")");
							if (returnData.ok == 1) {
								alert('取消收藏成功');
								location.reload([true]);
							} else if (returnData.ok == 0) {
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
					url: "pinglun.php",
					type: "post",
					dataType: "json",
					data: {
						"content": content.value,
						"order_id": order_idNum
					},
					success: function (data) {
						var xStatus = eval(data);
						if (xStatus.ok == 0) {
							alert('不好意思，' + xStatus.err);
						} else if (xStatus.ok == 1) {
							alert('提交成功，感谢您的评价');
							location.reload([true]);
						}
					}
				})
			}

			// var signOut = document.getElementsByClassName('signOut');
			// signOut[0].onclick = function () {
			// 	$.ajax({
			// 		url: "signOut.php",
			// 		type: "post",
			// 		success: function (data) {
			// 			var signOut = eval(data);
			// 			if (signOut.ok == 1) {
			// 				alert('退出成功！');
			// 				location.reload([true]);
			// 			} else {
			// 				alert('很遗憾，退出失败');
			// 			}
			// 		},
			// 		error: function () {
			// 			alert('抱歉，操作失败，请检查网络连接！');
			// 		}
			// 	})
			// }

			// 4.填充商品信息
			var infoTitle = document.getElementsByClassName('info-title');
			var infoPrice = document.getElementsByClassName('info-price');
			var infoBargain = document.getElementsByClassName('info-bargain');
			var infoSeller = document.getElementsByClassName('info-name');
			var infoCertification = document.getElementsByClassName('info-certification');
			var infoContact = document.getElementsByClassName('info-contact');
			var infoPlace = document.getElementsByClassName('info-place');
			var infoTime = document.getElementsByClassName('info-time');
			var infodetail = document.querySelector('.infodetail');

			infoTitle[0].innerHTML = data.data.productInfo.title;
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
			infodetail.innerHTML= data.data.productInfo.detail;

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

			// for (var i = 0; i < data.data.conmment.length; i++) {
			// 	//循环创建评论条
			// 	$(".evalu-title-ul").prepend('<li><div class="evalutInfo"><div class="evalutPhoto"><a class="evalutA" href=""><img class="evalutImg" src="" alt=""></a></div><div class="evalutCont"></div></div></li>')
			// }
			// evalu(); //执行评价分页函数
			// for (var i = 0; i < data.data.conmment.length; i++) {
			// 	//循环添加评论内容
			// 	aevalutCont[i].innerHTML = data.data.conmment[i].content;
			// 	aevalutA[i].href = "personal.html" + "?user_id=" + data.data.conmment[i].user_name;
			// 	aevalutImg[i].src = "images/" + data.data.conmment[i].image;
			// }


			// 7.填充推荐信息
			// var ahotHrefOne = document.getElementsByClassName('cont-imgA');
			// var ahotHrefTwo = document.getElementsByClassName('cont-titleA');
			// var ahotImg = document.getElementsByClassName('cont-imgAcont');
			// var ahotTitle = document.getElementsByClassName('img-title');
			//
			// for (var i = 0; i < arr.tuijian.length; i++) {
			// 	ahotHrefOne[i].href = "goods.html?order_id=" + arr.tuijian[i].order_id;
			// 	ahotHrefTwo[i].href = "goods.html?order_id=" + arr.tuijian[i].order_id;
			// 	ahotImg[i].src = "images/" + arr.tuijian[i].tupian;
			// 	ahotTitle[i].innerHTML = arr.tuijian[i].order_name;
			// }

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
function evalu() {
	$('.evalu-title-ul').kkPages({
		PagesClass: 'li', //需要分页的按钮
		PagesMth: 6, //每页显示个数
		PagesNavMth: 5 //导航显示个数
	});
}
window.onload = function () {
	state()
	ajaxContent(); //ajax动态填充内容
	share(); //分享接口实现
}