// mange.js

const api_uri = 'http://api.furrylightningrod.com:3001/api'
const token = $.cookie('token')
let ldata

// 页面载入 请求数据
window.onload = function() {
    localStorage.setItem('page',1)
    $.ajax({
        url: api_uri+'/list/all',
        type: 'GET',
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Bearer "+token);  
        },
        error: function(XHR,TS) {
            console.log(XHR)

        },
        success: function(datas) {
            ldata = datas
            $(function () {
                let tableHtml = ""
                for(let i in datas){
                    tableHtml += "<tr>"
                    tableHtml +=    "<td>"+ datas[i].QQ +"</td>"
                    tableHtml +=    "<td>"+ datas[i].name +"</td>"
                    tableHtml +=    "<td>"+ datas[i].level +"</td>"
                    tableHtml +=    "<td>"+ datas[i].reason +"</td>"
                    // tableHtml +=    "<td>"+ datas[i].reason +"</td>"
                    tableHtml +=    "<td>"+ datas[i].opreatorName +"</td>"
                    // tableHtml +=    "<td>"+ datas[i]._id +"</td>"
                    tableHtml += "</tr>"
                }
                $("#aj_data").html(tableHtml)
            })
            $(function () {
                let tableHtml = ""
                for(let i in datas){
                    tableHtml += "<tr>"
                    tableHtml +=    "<td>"+ datas[i].QQ +"</td>"
                    tableHtml +=    "<td>"+ datas[i].name +"</td>"
                    tableHtml +=    "<td>"+ datas[i].level +"</td>"
                    tableHtml +=    "<td>"+ "<button class='btn btn-primary btn-xq' onclick='xq(" + i + ")'>详情</button>" + "</td>"
                    tableHtml += "</tr>"
                }
                $("#ajm_data").html(tableHtml)
            })
        }
    })
    
}


// 刷新操作员信息
function updateOpreatorName() {
    $.ajax({
        url: api_uri+'/list/update/opreatorName',
        type: 'POST',
        data:{
            token: token
        },
        error: function(XHR,TS) {
            console.log(XHR)

        },
        success: function(data) {
            console.log(data)
            location.reload()
        }
    })
}

// 新增黑名单
function addOne(mode) {
    let QQ
    let name
    let level
    let reason
    if (mode==='m'){
        QQ = document.getElementById('mQQ-text').value
        name = document.getElementById('mname-text').value
        level = Number(document.getElementById('mlevel-select').value)
        reason = document.getElementById('mreason-text').value
    }else{
        QQ = document.getElementById('QQ-text').value
        name = document.getElementById('name-text').value
        level = Number(document.getElementById('level-select').value)
        reason = document.getElementById('reason-text').value
    }
    $.ajax({
        url: api_uri+'/list/add',
        type: 'POST',
        data:{
            token: token,
            QQ: QQ,
            name: name,
            level: level,
            reason: reason
        },
        error: function(XHR,TS) {
            $('div#returnMessage').removeClass('d-none')
            $('div#returnAlert').removeClass('alert-success')
            $('div#returnAlert').addClass('alert-danger')
            $('strong#returnAlertHeading').html(XHR.responseJSON.message)
        },
        success: function(data) {
            $('div#returnMessage').removeClass('d-none')
            $('div#returnAlert').removeClass('alert-danger')
            $('div#returnAlert').addClass('alert-success')
            $('strong#returnAlertHeading').html(data.message)
            setTimeout(location.reload(),1500)
        }
    })
}

// 查看详情（移动端
function xq(no) {
    console.log(ldata)
    alert("QQ：" + ldata[no].QQ + "\n" + "名字：" + ldata[no].name + "\n" + "等级：" + ldata[no].level + "\n" + "原因：" + ldata[no].reason + "\n" + "操作员：" + ldata[no].opreatorName)
}