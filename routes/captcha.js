var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();

var thisCaptchaCode = "";//存储用户填写的验证码
router.get('/captcha', function (req, res ) {
	var captcha = svgCaptcha.create();//创建验证码
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);//发送svg验证码图形
	thisCaptchaCode = captcha.text;
});

module.exports = router;