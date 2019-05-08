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
                window.location.href = "logreg.html"
            } else if (peo.code === 0) {
                userNick.innerHTML = peo.userNick;
            }
        }
    }
    mes.open('GET', 'huanle/index/upInfo', true)
    mes.send(null)
    out.onclick = function () {
        window.localStorage.clear()
        window.close()
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
                for (let i = 0; i < mes.data.length; i++) {
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
                    oTd.innerHTML = mes.data.data[i].userInfo.lastLoginTime;
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
                    oTd.innerHTML = lastTime;
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
                    mesTable1.tBodies[0].appendChild(oTr);
                }
            }
        }
        xhr.open('GET', '/huanle/admin/allUserList', true)
        xhr.send(null)
    }
}

function tableMes2() {
    let mesTable1 = document.querySelectorAll('.mesTable')[1]
    let tableBodies = document.querySelectorAll('.tableBodies')[1]
    tableBodies.innerHTML = ''
    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var mes = JSON.parse(xhr.responseText);
            console.log(mes)

            if (mes.code != 0) {
                alert('error')
            } else if (mes.code === 0) {
                for (let i = 0; i < mes.data.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].pid;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].title;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].myType;
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].price;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].inventory;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data.productList[0].d;
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    if (mes.data.productList[0].status == 1)
                        oTd.innerHTML = '已完成';
                    else
                        oTd.innerHTML = '未完成';
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
                    mesTable1.tBodies[0].appendChild(oTr);
                }
            }
        }
    }
    xhr.open('GET', 'huanle/admin/allProductList', true)
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
                alert('error')
            } else if (mes.code === 0) {
                for (let i = 0; i < mes.data.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data[0];
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
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
                    mesTable1.tBodies[0].appendChild(oTr);
                }
            }
        }
    }
    xhr.open('GET', '', true)
    xhr.send(null)
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
                for (let i = 0; i < mes.data.length; i++) {
                    var oTr = document.createElement('tr');
                    var oTd = document.createElement('td');
                    oTd.innerHTML = mes.data[0];
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
                    oTr.appendChild(oTd);
                    var oTd = document.createElement('td');
                    oTd.innerHTML = '';
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
                    mesTable1.tBodies[0].appendChild(oTr);
                }
            }
        }
    }
    xhr.open('GET', '', true)
    xhr.send(null)
}
window.onload = function () {
    state()
    tableMes()
    tableMes2()
    tableMes3()
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

    searchBtn[0].onclick = function () {
        var formContent = new FormData(searchForm[0]);
        mesTable[0].tBodies[0].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data[0];
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
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
                        mesTable[0].tBodies[0].appendChild(oTr);
                    }
                }
            }

        }
        xhr.open('POST', )
        xhr.send(formContent)
    }
    searchBtn[1].onclick = function () {
        var formContent = new FormData(searchForm[1]);
        mesTable[1].tBodies[0].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data[0];
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
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
                        mesTable[1].tBodies[0].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST', )
        xhr.send(formContent)
    }
    searchBtn[2].onclick = function () {
        var formContent = new FormData(searchForm[2]);
        mesTable[2].tBodies[0].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data[0];
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
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
                        mesTable[2].tBodies[0].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST', )
        xhr.send(formContent)
    }
    searchBtn[3].onclick = function () {
        var formContent = new FormData(searchForm[3]);
        mesTable[3].tBodies[0].innerHTML = ''
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var mes = JSON.parse(xhr.responseText)
                if (mes.code != 0) {
                    alert('error')
                } else if (mes.code === 0) {
                    for (let i = 0; i < mes.data.length; i++) {
                        var oTr = document.createElement('tr');
                        var oTd = document.createElement('td');
                        oTd.innerHTML = mes.data[0];
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
                        oTr.appendChild(oTd);
                        var oTd = document.createElement('td');
                        oTd.innerHTML = '';
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
                        mesTable[3].tBodies[0].appendChild(oTr);
                    }
                }
            }
        }
        xhr.open('POST', )
        xhr.send(formContent)
    }

}