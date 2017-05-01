var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('./../mongodb/contactdb.js');


// 验证码
var thisCaptchaCode = "";//存储用户填写的验证码
router.get('/signincaptcha', function (req, res ) {
	var captcha = svgCaptcha.create();//创建验证码
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);//发送svg验证码图形
	thisCaptchaCode = captcha.text;
});


// signin
var myUser={};
router.post('/signin',function (req, res){
	if(verifyCaptcha(req.body.captcha)){
		if(findUser(req.body.name)){
			res.render('alreadyhave');
		}else{
			var userEntity = new user({
				name: req.body.name,
				password: req.body.password
			});
			userEntity.save(function(err){
				if(err){
					console.log("增加数据发生错误");
					res.render("signinerror");
				}else{
					res.render("signinsuccess");
				}
			});
		}

	}else{
		res.render("errorcaptcha");
	}

});


// go to mongodb find user and password
// findUser
var findUser = function(userName){
	var thisUser = user.findOne({name:"okok"});
	console.log(thisUser.name);
	console.log("MMMMMMMM");
	console.log(userName);
	if(thisUser.name==userName){
		return true;
	}else{
		return false;
	}
}

// 验证码验证function
var verifyCaptcha = function(captchaCode){
	if(captchaCode==thisCaptchaCode){
		return true;
	}else{
		return false;
	}
};

module.exports = router;
