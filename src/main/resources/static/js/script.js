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
	var entry = document.getElementById('gerenzhuye')
	out.onclick = function () {
		window.localStorage.clear()
		location.reload([true]);
	}
	entry.onclick=function () {
		window.location.href=`personal.html?uid=${uid}`
	}

}
let nav = document.querySelectorAll('.nav-goods');
let content = document.querySelector('.go');
function sendPid(id) {
				
	var xhr = new XMLHttpRequest;
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			window.location.href = `goods.html?pid=${id}`
		}
	}
	xhr.open('POST', '/huanle/product/showProduct')
	xhr.send(id)
}
function getGoods(i) {
	content.innerHTML = ''
	var xml = new XMLHttpRequest;
	xml.onreadystatechange = function () {
		if (xml.status == 200 && xml.readyState == 4) {
			let goods = JSON.parse(xml.responseText);

			console.log(goods.data)
			for (let j = 0; j < goods.data.productList.length; j++) {
				var oDiv = document.createElement('figure');
				content.appendChild(oDiv);

				oDiv.innerHTML = `
                    <a href="javascript:;" onclick='sendPid(${goods.data.productList[j].product.pid})'><img src="${goods.data.productList[j].picture[0]}" width="200px" height="200px"></a>
                    <figcaption>
                    <a href="javascript:;" onclick='sendPid(${goods.data.productList[j].product.pid})' class='postMes'>${goods.data.productList[j].product.title}</a> 
                    <h5>￥${goods.data.productList[j].product.price}</h5>
								<h6 class="wantChange"><span class="fixed">想要换：${goods.data.productList[j].product.exchangeType}</span></h6>
								`


			}
		}
	}
	xml.open('GET', '/huanle/index/productList', true);
	xml.send(null)
}
function getGoodsType(type,standard){
	content.innerHTML = ''
	var xml = new XMLHttpRequest;
	xml.onreadystatechange = function () {
		if (xml.status == 200 && xml.readyState == 4) {
			let goods = JSON.parse(xml.responseText);

			console.log(goods.data)
			for (let j = 0; j < goods.data.productList.length; j++) {
				var oDiv = document.createElement('figure');
				content.appendChild(oDiv);

				oDiv.innerHTML = `
                    <a href="javascript:;" onclick='sendPid(${goods.data.productList[j].product.pid})'><img src="${goods.data.productList[j].picture[0]}" width="200px" height="200px"></a>
                    <figcaption>
                    <a href="javascript:;" onclick='sendPid(${goods.data.productList[j].product.pid})' class='postMes'>${goods.data.productList[j].product.title}</a> 
                    <h5>￥${goods.data.productList[j].product.price}</h5>
								<h6 class="wantChange"><span class="fixed">想要换：${goods.data.productList[j].product.exchangeType}</span></h6>
								`


			}
		}
	}
	xml.open('GET', `/huanle/index/productList?type=${type}&standard=${standard}`, true);
	xml.send(null)

}
let typeMes=document.querySelectorAll('.typeMes')
for (let i = 0; i < nav.length; i++) {
	nav[i].onclick = function () {
		 getGoodsType(typeMes[i].innerHTML)
	}
}
let rule=document.querySelectorAll('.rule')
for(let i=0;i<rule.length;i++){
	rule[i].onclick=function(){
		for(let j=0;j<rule.length;j++){
			rule[j].className=''
		}
		rule[i].className='ruleActive'
		getGoodsType('',rule[i].innerHTML)
	}
}
window.onload = function () {
	state()
	getGoods()

}

var header = document.getElementById('header');
var banner = document.getElementById("banner");
var left = document.getElementById("left");
var right = document.getElementById("right");
var dt = document.getElementsByName("dt");
var top = document.getElementById("top");
var timers = null;
var isTop = true;
window.onscroll = function () {
	var w = document.documentElement.scrollTop || document.body.scrollTop;
	if (w < 100) {
		header.className = " ";
		banner.className = "banner";
		left.className = "left";
		right.className = "right";
		for (var i = 0; i < dt.length; i++) {
			dt[i].style.display = "block";
		}

	} else {
		header.className = "scroll";
		banner.className = " banner scroll";
		left.className = "left scroll";
		right.className = "right scroll";
		for (var i = 0; i < dt.length; i++) {
			dt[i].style.display = "none";
		}

		if (w > 500) {
			top.style.visibility = "visible";
		} else {
			top.style.visibility = "hidden";
		}


	}
	if (!isTop) {
		clearInterval(timers);
	}
	isTop = false;

}

top.onclick = function () {
	var newtop = document.documentElement.scrollTop || document.body.scrollTop;


	if (newtop != 0) {
		timers = setInterval(function () {
			document.documentElement.scrollTop = document.body.scrollTop -= 120;
			isTop = true;

		}, 50)
	} else {
		clearInterval(timers);
	}


}