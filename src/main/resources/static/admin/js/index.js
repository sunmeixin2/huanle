function state() {
    var userNick = document.getElementById('user');
    var out = document.getElementById('outLog');
    var mes = new XMLHttpRequest
    mes.onreadystatechange = function () {
        if (mes.status == 200 && mes.readyState == 4) {
            var peo = JSON.parse(mes.responseText);
            console.log(peo)

            if (peo.code != 0) {
                alert('您还没有登录！')
                window.location.href = "../logreg.html"
            } else if (peo.code === 0) {
                userNick.innerHTML = peo.data.userNick;
            }
        }
    }
    mes.open('GET', 'http://192.168.2.54:8080/huanle/index/upInfo', true)
    mes.send(null)
    out.onclick = function () {
        $.ajax({
            url: "http://192.168.2.54:8080/huanle/user/logout",
            type: "get",
            success: function (data) {
                if (data.code != 0) {
                    alert('error')

                } else if (data.code === 0) {
                    window.location.href = "../logreg.html"


                }
            }
        })
    }
}

function tableMes() {
    let mesTable1 = document.querySelectorAll('.mesTable')[0]
    let tableBodies = document.querySelectorAll('.tableBodies')[0]
    tableBodies.innerHTML = ''
    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var mes = JSON.parse(xhr.responseText);
            console.log(mes)

            if (mes.code != 0) {
                alert('error')
            } else if (mes.code === 0) {
                for (let i = 0; i < mes.data.data.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.data[i].userInfo.uid;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.data[i].userInfo.nickName;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.data[i].userInfo.gender;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.data[i].userInfo.contact;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.data[i].userInfo.email;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    var times = mes.data.data[i].userInfo.regTime.split('T')
                    oTd.innerHTML = times[0];
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    var lastTime = new Date(parseInt(mes.data.data[i].userInfo.lastLoginTime) * 1000)
                    oTd.innerHTML = lastTime.toLocaleString();
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '<a href="javascript:;">删除</a>'
                    oTr.appendChild(oTd);

                    oTd.getElementsByTagName('a')[0].onclick = function () {
                        $.ajax({
                            url: "http://192.168.2.54:8080/huanle/user/deleteUserInfo",
                            type: "post",
                            data: {
                                uid:mes.data.data[i].userInfo.uid
                            },
                            success: function (data) {
                                if (data.code != 0) {
                                    alert('error')

                                } else if (data.code === 0) {
                                    alert('删除成功')
                                    tableMes()
                                }
                            }
                        })
                    }
                    tableBodies.appendChild(oTr);
                }
            }
        }
    }
        xhr.open('GET', 'http://192.168.2.54:8080/huanle/admin/allUserList', true)
        xhr.send(null)
}

function tableMes2() {
    let goodContent = document.querySelectorAll('.goodContent')
    let tableBodies = document.querySelectorAll('.tableBodies')[1]
    let imgContent = document.querySelector('.imgContent')
    let closeContent = document.querySelectorAll('.closeContent')
    closeContent[0].onclick=function(){
        goodContent[0].style.display='none'
    }
    closeContent[1].onclick=function(){
        goodContent[1].style.display='none'
    }
    let mesContent = document.querySelectorAll('.mesContent')
    tableBodies.innerHTML = ''
    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var mes = JSON.parse(xhr.responseText);
            console.log(mes)

            if (mes.code != 0) {
                alert('error')
            } else if (mes.code == 0) {
                for (let i = 0; i < mes.data.productList.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].product.pid;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].product.title;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].product.myType;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].product.price;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].product.inventory;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[i].user;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    if (mes.data.productList[i].status == 1)
                        oTd.innerHTML = '已完成';
                    else
                        oTd.innerHTML = '未完成';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    var fabuTime=new Date(parseInt(mes.data.productList[i].product.createAt)*1000)
                    oTd.innerHTML = fabuTime.toLocaleString()
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '<a href="javascript:;">删除</a> <a href="javascript:;">详情</a> <a href="javascript:;">下架</a>'
                    oTr.appendChild(oTd);

                    oTd.getElementsByTagName('a')[0].onclick = function () {
                       $.ajax({
                            url: "http://192.168.2.54:8080/huanle/product/deleteProductInfo",
                            type: "post",
                            data: {
                                    pid:mes.data.productList[i].product.pid
                            },
                            success: function (data) {
                                if (data.code != 0) {
                                    alert('error')

                                } else if (data.code === 0) {
                                    alert('删除成功')
                                    tableMes2()
                                }
                            }
                        })
                    }
                   
                    
                   
                    oTd.getElementsByTagName('a')[1].onclick = function () {
                        goodContent[0].style.display='block';
                        for(let j=0;j< mes.data.productList[i].picture.length;j++){
                            imgContent.innerHTML+=`
                            <img src="${mes.data.productList[i].picture[j]}" width="150px" height="150px" alt="">
                            `
                        }
                        if (mes.data.productList[i].status == 1)
                        var a = '已完成';
                    else
                        var a = '未完成';
                        var shengchan= mes.data.productList[i].product.productDate.split('T')
                        var guoqi= mes.data.productList[i].product.productExpire.split('T')
                        mesContent[0].innerHTML=`
                        <p><span>ID:</span><span>${mes.data.productList[i].product.pid}</span></p>
                        <p><span>名称:</span><span>${mes.data.productList[i].product.title}</span></p>
                        <p><span>详情:</span><span>${mes.data.productList[i].product.detail}</span></p>
                        <p><span>发布时间:</span><span>${fabuTime.toLocaleString()}</span></p>
                        <p><span>类型:</span><span>${mes.data.productList[i].product.myType}</span></p>
                        <p><span>价格:</span><span>${mes.data.productList[i].product.price}</span></p>
                        <p><span>数量:</span><span>${mes.data.productList[i].product.inventory}</span></p>
                        <p><span>状态:</span><span>${a}</span></p>
                        `
                        mesContent[1].innerHTML=` 
                        <p><span>想要换类型:</span><span>${mes.data.productList[i].product.exchangeType}</span></p>
                        <p><span>新旧程度:</span><span>${mes.data.productList[i].product.isNew}成新</span></p>
                        <p><span>生产日期:</span><span>${shengchan[0]}</span></p>
                        <p><span>过期时间:</span><span>${guoqi[0]}</span></p>
                        <p><span>交换方式:</span><span>${mes.data.productList[i].product.standard}</span></p>`
                     }
                     oTd.getElementsByTagName('a')[2].onclick = function () {
                        goodContent[1].style.display='block';
                         let xiajiaForm=document.querySelector('.xiajiaForm')
                         let tijiaoForm=document.querySelector('.tijiaoForm')
                         let xiajia=document.getElementById('xiajia')

                         let formC=new FormData(xiajiaForm)
                         tijiaoForm.onclick=function(){

                           $.ajax({
                             url: "http://192.168.2.54:8080/huanle/product/downProduct",
                             type: "post",
                             data: {

                                 pid:mes.data.productList[i].product.pid,
                                 content:xiajia.value

                             },

                             success: function (data) {
                                 console.log(data)
                                 if (data.code != 0) {
                                     alert('error')
 
                                 } else if (data.code == 0) {
                                     alert('成功')
                                     location.reload([true])
                                 }
                             }
                         })
                        }
                     }
                    
                    tableBodies.appendChild(oTr);
                }
            }
        }
    }
    xhr.open('GET', 'http://192.168.2.54:8080/huanle/admin/allProductList', true)
    xhr.send(null)
}

function tableMes3() {
    let mesTable1 = document.querySelectorAll('.mesTable')[2]
    let tableBodies = document.querySelectorAll('.tableBodies')[2]
    tableBodies.innerHTML = ''
    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var mes = JSON.parse(xhr.responseText);
            console.log(mes)

            if (mes.code != 0) {
                alert(mes.message)
            } else if (mes.code === 0) {
                for (let i = 0; i < mes.data.orders.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].oid;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].nums;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].uidA;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].pidA;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].uidB;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].pidB;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.orders[i].status;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = new Date(parseInt(mes.data.orders[i].createAt) * 1000).toLocaleString();
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '<a href="javascript:;">删除</a>'
                    oTr.appendChild(oTd);

                    oTd.getElementsByTagName('a')[0].onclick = function () {
                        $.ajax({
                            url: "http://192.168.2.54:8080/huanle/orders/deleteOrders",
                            type: "post",
                            data: {
                                oid: mes.data.orders[i].oid

                            },

                            success: function (data) {
                                console.log(data)
                                if (data.code != 0) {
                                    alert('error')

                                } else if (data.code == 0) {
                                    alert('成功')
                                    tableMes3()
                                }
                            }
                        })
                    }
                    tableBodies.appendChild(oTr);
                }
            }
        }
    }
}

function tableMes4() {
    let mesTable1 = document.querySelectorAll('.mesTable')[3]
    let tableBodies = document.querySelectorAll('.tableBodies')[3]
    tableBodies.innerHTML = ''
    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var mes = JSON.parse(xhr.responseText);
            console.log(mes)

            if (mes.code != 0) {
                alert('error')
            } else if (mes.code === 0) {
                for (let i = 0; i < mes.data.feedbackList.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].uid;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].title;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].pid;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].nick_name;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].my_type;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.feedbackList[i].msg;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML =new Date(parseInt(mes.data.feedbackList[i].create_at)*1000).toLocaleString() 
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '<a href="javascript:;">删除</a>'
                    oTr.appendChild(oTd);

                    oTd.getElementsByTagName('a')[0].onclick = function () {
                        $.ajax({
                            url: "http://192.168.2.54:8080/huanle/admin/deleteFeedback",
                            type: "post",
                            data: {
                                fid: mes.data.feedbackList[i].fid

                            },

                            success: function (data) {
                                console.log(data)
                                if (data.code != 0) {
                                    alert('error')

                                } else if (data.code == 0) {
                                    alert('成功')
                                    tableMes4()
                                }
                            }
                        })
                    }
                    tableBodies.appendChild(oTr);
                }
            }
        }
    }
    xhr.open('GET', 'http://192.168.2.54:8080/huanle/admin/feedbackList', true)
    xhr.send(null)
}
window.onload = function () {
    state()
    tableMes()
    tableMes2()
    tableMes3()
    tableMes4()
    let oBtn = document.querySelectorAll('.index')
    let aDiv = document.querySelectorAll('.child');

    for (let i = 0; i < oBtn.length; i++) {
        oBtn[i].onclick = function () {
            for (let j = 0; j < oBtn.length; j++) {
                oBtn[j].className = '';
                oBtn[0].className = 'first-nav'
                oBtn[2].className = 'first-nav'
                aDiv[j].style.display = 'none';
            }
            this.className = 'active';
            aDiv[i].style.display = 'block';
        }
    }

    let firstNav = document.querySelectorAll('.first-nav')
    let biaozhi = document.querySelectorAll('.biaozhi')
    let childNav = document.querySelectorAll('.child-nav')
    let childNav2 = document.querySelectorAll('.child-nav2')
    let navChild = document.querySelectorAll('.navChild')
    let navChild2 = document.querySelectorAll('.navChild2')
    let children = document.querySelectorAll('.children')
    let children2 = document.querySelectorAll('.children2')

    function showList(nav, oDiv) {
        var style = window.getComputedStyle(nav[0]);
        if (style.display == 'none') {
            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = 'block';
            }
            oDiv.style.transform = 'rotateZ(180deg)'

        } else if (style.display == 'block') {
            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = 'none';
            }
            oDiv.style.transform = 'rotateZ(0)'

        }

    }
    firstNav[0].addEventListener("click", function () {
        showList(childNav, biaozhi[0])
    })
    firstNav[1].addEventListener("click", function () {
        showList(childNav2, biaozhi[1])
    })


    for (let i = 0; i < navChild.length; i++) {
        navChild[i].onclick = function () {
            for (let j = 0; j < navChild.length; j++) {
                navChild[j].className = ''
                children2[j].style.display = 'none'
                aDiv[j].style.display = 'none';
            }
            aDiv[0].style.display = 'block';
            navChild[i].className = 'activeNav'
            children2[i].style.display = 'block'
        }
    }
    for (let i = 0; i < navChild2.length; i++) {
        navChild2[i].onclick = function () {
            for (let j = 0; j < navChild2.length; j++) {
                navChild2[j].className = ''
                children[j].style.display = 'none'
                aDiv[j].style.display = 'none';
            }
            navChild2[i].className = 'activeNav'
            children[i].style.display = 'block'
            aDiv[2].style.display = 'block';
        }
    }
    let searchForm = document.querySelectorAll('.searchForm');
    let searchBtn = document.querySelectorAll('.searchBtn');
    let mesTable = document.querySelectorAll('.mesTable')
    let tableBodies = document.querySelectorAll('.tableBodies')
    let goBack = document.querySelectorAll('.goBack')
     for(let i=0;i<goBack.length;i++){
         goBack[i].onclick=function(){
            switch(i){
                case 0: tableMes();break;
                case 1: tableMes2();break;
                case 2: tableMes3();break;
                case 3: tableMes4();break;
            }
         }
     }
    searchBtn[0].onclick = function () {
        var formContent = new FormData(searchForm[0]);
        tableBodies[0].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.data.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.data[i].userInfo.uid;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.data[i].userInfo.nickName;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.data[i].userInfo.gender;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.data[i].userInfo.contact;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.data[i].userInfo.email;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        var times = mes.data.data[i].userInfo.regTime.split('T')
                        oTd.innerHTML = times[0];
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        var lastTime = new Date(parseInt(mes.data.data[i].userInfo.lastLoginTime) * 1000)
                        oTd.innerHTML = lastTime.toLocaleString();
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '<a href="javascript:;">删除</a>'
                        oTr.appendChild(oTd);
    
                        oTd.getElementsByTagName('a')[0].onclick = function () {
                            $.ajax({
                                url: "huanle/personal/delete",
                                type: "post",
                                data: {
    
                                },
                                success: function (data) {
                                    if (peo.code != 0) {
                                        alert('error')
    
                                    } else if (peo.code === 0) {
                                        alert('删除成功')
                                        tableMes()
                                    }
                                }
                            })
                        }
                        tableBodies[0].appendChild(oTr);
                    }
                }
            }

        }
        xhr.open('POST','http://192.168.2.54:8080/huanle/admin/allUserList')
        xhr.send(formContent)
    }
    searchBtn[1].onclick = function () {
        var formContent = new FormData(searchForm[1]);
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                console.log(mes)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code == 0) {
        tableBodies[1].innerHTML = ''
                    for (let i = 0; i < mes.data.productList.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].product.pid;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].product.title;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].product.myType;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].product.price;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].product.inventory;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.productList[i].user;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        if (mes.data.productList[i].status == 1)
                            oTd.innerHTML = '已完成';
                        else
                            oTd.innerHTML = '未完成';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        var fabuTime=new Date(parseInt(mes.data.productList[i].product.createAt)*1000)
                        oTd.innerHTML = fabuTime.toLocaleString()
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '<a href="javascript:;">删除</a>'
                        oTr.appendChild(oTd);
    
                        oTd.getElementsByTagName('a')[0].onclick = function () {
                           $.ajax({
                                url: "huanle/personal/delete",
                                type: "post",
                                data: {
    
                                },
                                success: function (data) {
                                    if (peo.code != 0) {
                                        alert('error')
    
                                    } else if (peo.code === 0) {
                                        alert('删除成功')
                                        tableMes2()
                                    }
                                }
                            })
                        }
                        tableBodies[1].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST','http://192.168.2.54:8080/huanle/admin/allProductList')
        xhr.send(formContent)
    }
    searchBtn[2].onclick = function () {
        var formContent = new FormData(searchForm[2]);
       tableBodies[2].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.orders.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.orders[i].oid;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.orders[i].nums;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  mes.data.orders[i].uidA;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  mes.data.orders[i].pidA;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  mes.data.orders[i].uidB;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  mes.data.orders[i].pidB;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  mes.data.orders[i].status;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =  new Date(parseInt(mes.data.orders[i].createAt)*1000).toLocaleString();
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '<a href="javascript:;">删除</a>'
                        oTr.appendChild(oTd);
    
                        oTd.getElementsByTagName('a')[0].onclick = function () {
                            var mes = new XMLHttpRequest
                            mes.onreadystatechange = function () {
                                if (mes.status == 200 && mes.readyState == 4) {
                                    var peo = JSON.parse(mes.responseText);
                                    console.log(peo)
    
                                    if (peo.code != 0) {
                                        alert('')
    
                                    } else if (peo.code === 0) {
                                        alert('删除成功')
                                        tableMes3()
                                    }
                                }
                            }
                            mes.open('POST', '', true)
    
                            mes.send()
                        }
                        tableBodies[2].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST', 'http://192.168.2.54:8080/huanle/admin/allOrderList', true)
        xhr.send(formContent)
    }
    searchBtn[3].onclick = function () {
        var formContent = new FormData(searchForm[3]);
        tableBodies[3].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.feedbackList.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].uid;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].title;
                        oTr.appendChild(oTd);
    
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].pid;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].nick_name;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].my_type;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data.feedbackList[i].msg;
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML =new Date(parseInt(mes.data.feedbackList[i].create_at)*1000).toLocaleString() 
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '<a href="javascript:;">删除</a>'
                        oTr.appendChild(oTd);
    
                        oTd.getElementsByTagName('a')[0].onclick = function () {
                            var mes = new XMLHttpRequest
                            mes.onreadystatechange = function () {
                                if (mes.status == 200 && mes.readyState == 4) {
                                    var peo = JSON.parse(mes.responseText);
                                    console.log(peo)
    
                                    if (peo.code != 0) {
                                        alert('error')
    
                                    } else if (peo.code === 0) {
                                        alert('删除成功')
                                        tableMes3()
                                    }
                                }
                            }
                            mes.open('POST', '', true)
    
                            mes.send()
                        }
                        tableBodies[3].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST','http://192.168.2.54:8080/huanle/admin/feedbackList' )
        xhr.send(formContent)
    }

}