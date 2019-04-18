//ajax设置个人页面
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
				headImg.src = ''
				uid=peo.data.uid
			}
		}
	}
	mes.open('GET', 'huanle/index/upInfo', true)
	mes.send(null)
	var out = document.getElementById('out')
	out.onclick = function () {
		window.localStorage.clear()
		location.reload([true]);
	}

}
function ajax() {
	$.ajax({
		url:  `huanle/personal/getUserInfo${window.location.search}`,
		type: "get",
		success: function (data) {
			if (data.code== 0) {
				// 设置头部信息
				var aPersPhoto = document.getElementsByClassName('personal-photo');
				var aCollect = document.getElementsByClassName('personal-collect');
				var aRelease = document.getElementsByClassName('personal-release');
				var loginOut = document.getElementsByClassName('hdr-log-reg');

				aPersPhoto[0].src = "";
				aCollect[0].innerHTML = "";
				aRelease[0].innerHTML = "";

				//设置个人信息
				var aInfoNumber = document.getElementsByClassName('infoNumber');
				var aInfoName = document.getElementsByClassName('infoName');
				var aInfoPhone = document.getElementsByClassName('infoPhone');
				var aInfoSex = document.getElementsByClassName('infoQQ');
				console.log(data)
				aInfoNumber[0].innerHTML = data.data.email;
				aInfoName[0].innerHTML =data.data.nickName;
				aInfoPhone[0].innerHTML =data.data.contact;
				aInfoSex[0].innerHTML = data.data.gender;


				//设置收藏信息
				if (data.collection.length == 0) {
					$('.boxThreeUl').prepend('<p class="NoColHis">客官，您还没有收藏任何东西呦！</p>');
				} else {
					for (var i = 0; i < data.collection.length; i++) {
						$('.boxThreeUl').prepend('<li><div class="collect"><div class="clctImg"><a href="" class="clctImgA"><img src="images/01_mid.jpg" alt="" class="clctImgCont"></a></div><div class="clctInfo"><span class="clctInfo-name">卖家</span><span class="clctInfo-cont"><a href="#" class="clctInfoSell"></a></span><span class="clctInfo-name">名称</span><span class="clctInfo-cont clctInfoGoods"></span><span class="clctInfo-name">价格</span><span class="clctInfo-cont clctInfoPrice"></span></div><div class="clctCancle"><span>取消收藏</span></div></div></li>');
					}
					var aclctCancle = document.getElementsByClassName('clctCancle');
					for (var i = 0; i < arr.collection.length; i++) {
						(function (j) {
							aclctCancle[j].onclick = function () {
								$.ajax({
									url: "delete.php",
									type: "post",
									data: {
										"choice": 1,
										"order_id": arr.collection[j].order_id
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
					for (var i = 0; i < arr.collection.length; i++) {
						aclctImgA[i].href = "goods.html?order_id=" + arr.collection[i].order_id;
						aclctImgCont[i].src = "img/" + arr.collection[i].picture;
						// aclctInfoSell[i].href="people.html?"+arr.collection.user_name;
						aclctInfoSell[i].innerHTML = arr.collection[i].user_name;
						aclctInfoGoods[i].innerHTML = arr.collection[i].order_name;
						aclctInfoPrice[i].innerHTML = arr.collection[i].price;
					}
				}

				//设置历史发布信息
				if (arr.history.length == 0) {
					$('.boxFourUl').prepend('<p class="NoColHis">赶快去发布自己的物品吧！</p>');
				} else {
					for (var i = 0; i < arr.history.length; i++) {
						$('.boxFourUl').prepend('<li><div class="history"><div class="histImg"><a href="" class="histImgA"><img src="images/01_mid.jpg" alt="" class="histImgCont"></a></div><div class="histInfo"><span class="histInfo-name">名称</span><span class="histInfo-cont histInfoCont"></span><span class="histInfo-name">价格</span><span class="histInfo-cont histInfoPrice"></span><span class="histInfo-name">日期</span><span class="histInfo-cont histInfoTime"></span></div><span class="pressStatus"></span><div class="histCancle"><span>删除记录</span></div></div></li>');
					}
					var ahistCancle = document.getElementsByClassName('histCancle');
					for (var i = 0; i < arr.history.length; i++) {
						(function (j) {
							ahistCancle[i].onclick = function () {
								$.ajax({
									url: "delete.php",
									type: "post",
									data: {
										"choice": 2,
										"order_id": arr.history[j].order_id
									},
									success: function (data) {
										var arr = eval("(" + data + ")");
										if (arr.ok == 0) {
											alert('很抱歉，删除失败!');
										} else if (arr.ok == 1) {
											alert('删除成功！');
											location.reload([true]);
										}
									}
								})
							}
						})(i)
					}
					var ahistImgA = document.getElementsByClassName('histImgA');
					var ahistImgCont = document.getElementsByClassName('histImgCont');
					var ahistInfoCont = document.getElementsByClassName('histInfoCont');
					var ahistInfoPrice = document.getElementsByClassName('histInfoPrice');
					var ahistInfoTime = document.getElementsByClassName('histInfoTime');
					var pressStatus = document.getElementsByClassName('pressStatus');
					for (var i = 0; i < arr.history.length; i++) {
						ahistImgA[i].href = "goods.html?order_id=" + arr.history[i].order_id;
						ahistImgCont[i].src = "images/" + arr.history[i].picture;
						ahistInfoCont[i].innerHTML = arr.history[i].order_name;
						ahistInfoPrice[i].innerHTML = arr.history[i].price;
						ahistInfoTime[i].innerHTML = arr.history[i].time;
						pressStatus[i].innerHTML= '审核';
					}
				}

				//执行收藏与历史分页分页函数
				evlau();
			} else if (arr.err == 1) {
				self.location = 'error.html';
			}
		}
	})
}

//提交编辑内容
function submitEdit() {
	var aeditName = document.getElementsByClassName('editName');
	var aeditImg = document.getElementsByClassName('img');
	var aeditPhone = document.getElementsByClassName('editPhone');
	var aeditEmail = document.getElementsByClassName('editEmail');
	var radio = document.getElementsByName("sex");

	var selectvalue = null; //  selectvalue为radio中选中的值

	for (var i = 0; i < radio.length; i++) {

		if (radio[i].checked == true) {

			selectvalue = radio[i].value;

			break;

		}
	}
	var aeditSubmit = document.getElementsByClassName('editSubmit');
	aeditSubmit[0].onclick = function () {
		$.ajax({
			url: "edit.php",
			type: "post",
			dataType: "json",
			data: {
				"touxiang": aeditImg[0].files[0],
				"user_name": aeditName[0].value,
				"telephone": aeditPhone[0].value,
				"email": aeditEmail[0].value,
				"sex": selectvalue
			},
			success: function (data) {
				var arr = eval(data);
				if (arr.ok == 1) {
					alert('恭喜您，修改成功！');
					var storage=newwindow.localStorage;
					storage.userName=aeditName[0].value;
					storage.telephone=aeditPhone[0].value;
					storage.email=aeditEmail[0].value
					storage.sex=selectvalue;
					storage.touxiang=aeditImg[0].files[0]
					$(".editInfoBg").hide();
					$(".editInfoWr").hide();
					event.stopPropagation();
					
					ajax();
				} else if (arr.ok == 0) {
					alert('很抱歉，修改出错！');
				}
			}
		})
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
function loginOut() {
	var outBtn = document.getElementsByClassName('loginOut');
	outBtn.onclick = function () {
		$.ajax({
			url: "",
			type: "post",
			success: function (data) {
				var arr = eval(data);
				if (arr.status == 0) {

				} else if (arr.status == 1) {

				}
			},
		})
	}
}

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
	loginOut(); //退出登录，清除session
	submitEdit(); //ajax上传编辑信息
	ajax(); //ajax设置个人页面
}