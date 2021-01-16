//环境
const { response } = require('express')
const { token } = require('morgan')
const { render } = require('pug')
const request = require('request')
const auth = require('../controllers/auth')
const apiOptions = {
    server: require('../../config').APIURL
}

//渲染管理页面
const mange = (req, res) => {
    console.log(req.cookies)
    if(!req.cookies.token||req.user.group!='test-group'){
        res.status(404).render('error/404')
    }else{
        res.render('mange',{
            title: '管理页面 - 约稿避雷辅助工具',
            userInfo: req.user
        })
    }
}


//写完模块别忘导出
module.exports = {
    mange
}