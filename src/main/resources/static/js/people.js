//ajax设置个人页面
function ajax(){
	$.ajax({
		url:"personal.php",
		type:"post",
		success:function(data){
			var arr=eval("("+data+")");
			if(arr.err==0){
				// 设置头部信息
				var aPersPhoto=document.getElementsByClassName('personal-photo');
				var aCollect=document.getElementsByClassName('personal-collect');
				var aRelease=document.getElementsByClassName('personal-release');
				var loginOut=document.getElementsByClassName('hdr-log-reg');

				aPersPhoto[0].src="images/"+arr.personal.image;
				aCollect[0].innerHTML=arr.personal.meili;
				aRelease[0].innerHTML=arr.history.length;
				loginOut[0].onclick=function(){
					out.onclick = function () {
						$.ajax({
							url: "/huanle/user/logout",
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

				//设置个人信息
				var aInfoNumber=document.getElementsByClassName('infoNumber');
				var aInfoName=document.getElementsByClassName('infoName');
				var aInfoPhone=document.getElementsByClassName('infoPhone');
				var aInfoCert=document.getElementsByClassName('infoCert');
				var aInfoQQ=document.getElementsByClassName('infoQQ');
				aInfoNumber[0].innerHTML=arr.personal.student_num;
				aInfoName[0].innerHTML=arr.personal.user_name;
				aInfoPhone[0].innerHTML=arr.personal.telephone;
				aInfoCert[0].innerHTML=arr.personal.school;
				aInfoQQ[0].innerHTML=arr.personal.qq;

				//设置历史发布信息
				if(arr.history.length==0){
					$('.boxTwoUl').prepend('<p class="NoColHis">这位客官暂时还没有发布物品呢！</p>');
				}
				else{
					for (var i = 0; i < arr.history.length; i++) {
						$('.boxTwoUl').prepend('<li><div class="history"><div class="histImg"><a href="" class="histImgA"><img src="images/01_mid.jpg" alt="" class="histImgCont"></a></div><div class="histInfo"><span class="histInfo-name">名称</span><span class="histInfo-cont histInfoCont"></span><span class="histInfo-name">价格</span><span class="histInfo-cont histInfoPrice"></span><span class="histInfo-name">日期</span><span class="histInfo-cont histInfoTime"></span></div><div class="histCancle"><span>收藏该商品</span></div></div></li>');
					}
					var ahistCancle=document.getElementsByClassName('histCancle');
					for (var i = 0; i < arr.history.length; i++) {
						(function(j){
							ahistCancle[i].onclick=function() {
								$.ajax({
									url:"coll.php",
									type:"post",
									data:{"choice":2,"order_id":arr.history[j].order_id},
									success:function(data) {
										var arr=eval("("+data+")");
										if (arr.ok==0) {
											alert('很抱歉，删除失败!');
										}
										else if(arr.ok==1){
											alert('删除成功！');
											location.reload([true]);
										}
									}
								})
							}
						})(i)
					}
					var ahistImgA=document.getElementsByClassName('histImgA');
					var ahistImgCont=document.getElementsByClassName('histImgCont');
					var ahistInfoCont=document.getElementsByClassName('histInfoCont');
					var ahistInfoPrice=document.getElementsByClassName('histInfoPrice');
					var ahistInfoTime=document.getElementsByClassName('histInfoTime');
					for (var i = 0; i < arr.history.length; i++) {
						ahistImgA[i].href="goods.html?order_id="+arr.history[i].order_id;
						ahistImgCont[i].src="images/"+arr.history[i].picture;
						ahistInfoCont[i].innerHTML=arr.history[i].order_name;
						ahistInfoPrice[i].innerHTML=arr.history[i].price;
						ahistInfoTime[i].innerHTML=arr.history[i].time;
					}
				}

				//执行收藏与历史分页分页函数
				evlau();
			}
			else if(arr.err==1){
				self.location='error.html'; 
			}
		}
	})
}
// 分页
function evlau(){
	$('#boxTwo').kkPages({
	   PagesClass:'li',
	   PagesMth:4,
	   PagesNavMth:5
	});
}
window.onload=function(){
	tab();			//执行选项卡
	ajax();			//ajax设置个人页面
}