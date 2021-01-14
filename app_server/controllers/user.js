//环境
const { response } = require('express')
const request = require('request')
const apiOptions = {
    server: require('../../config').APIURL
}

//登录
const login = (req, res) => {
 res.render('user',{
     title: '登录 - 避雷针',
     enter: 'login'
 })
}


//注册
const register = (req, res) => {
    res.render('user',{
        title: '注册 - 避雷针',
        enter: 'register'
    })
}



//写完模块别忘导出
module.exports = {
    login,
    register
}