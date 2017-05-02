var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('./../mongodb/contactdb.js');
mongoose.Promise = require('bluebird');
// 获取验证码


var thisCaptchaCode = "";//存储用户填写的验证码
router.get('/captcha', function (req, res ) {
	var captcha = svgCaptcha.create();//创建验证码
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);//发送svg验证码图形
	thisCaptchaCode = captcha.text;
});
// 登录验证
router.post('/verify', function (req, res){
	if(verifyCaptcha(req.body.captcha)){
		user.findOne({'name':req.body.name},function(err,thisUser){
			if(thisUser==null){
				res.render("nouser");
			}else{
				if(thisUser.name==req.body.name){
					if(thisUser.password==req.body.password){
						res.render('./../public/user.html');
					}else{
						res.render("errorpassword");
					}
				}else{
					res.render("nouser");
				}
			}
			
		});
		
	}else{
		res.render("errorcaptcha");
	}
});





// 验证码验证function
var verifyCaptcha = function(captchaCode){
	if(captchaCode==thisCaptchaCode){
		return true;
	}else{
		return false;
	}
};






module.exports = router;