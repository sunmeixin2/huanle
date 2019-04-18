let nav=document.querySelectorAll('.nav-goods');
let content=document.querySelector('.go');
function getGoods(i){
  content.innerHTML=''
      var xml=new XMLHttpRequest;
      xml.onreadystatechange=function(){
          if(xml.status==200&&xml.readyState==4){
                let goods=JSON.parse(xml.responseText);
                console.log(goods.data)
                  for(let j=0;j<goods.data.length;j++){
                    var oDiv=document.createElement('figure');
                    content.appendChild(oDiv);
                    oDiv.innerHTML=`<div class="price"> ${goods.data[j].product.price}</div>
                    <a href="#"><img src="${goods.data[j].picture[0]}"></a>
                    <figcaption>
                    <a href="goods.html">${goods.data[j].product.title}</a> 
                    <h5>${goods.data[j].product.detail}</h5>
								<h6 class="wantChange"><span class="fixed">想要换：${goods.data[j].product.exchange}</span></h6>
                `
                  }
          }
      }
      xml.open('GET','http://192.168.2.54:8080/huanle/index/productList',true);
      xml.send(null)
}
for(let i=0;i<nav.length;i++){
        nav[i].onclick=function(){
           getGoods(i)
        }
}
