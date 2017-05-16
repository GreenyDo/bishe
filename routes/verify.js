var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var mongoose = require('mongoose');
var user = require('./../mongodb/contactdb.js');
mongoose.Promise = require('bluebird');
var multer  = require('multer');



// 获取验证码
var userStorage = "";
var sessionIDStorage = "";
var thisCaptchaCode = "";//存储用户填写的验证码
router.get('/captcha', function (req, res ) {
	var captcha = svgCaptcha.create();//创建验证码
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);//发送svg验证码图形
	thisCaptchaCode = captcha.text;
});



// 登录验证
router.post('/verify', function (req, res,next){
	
	if(verifyCaptcha(req.body.captcha)){
		user.findOne({'name':req.body.name},function(err,thisUser){
			if(thisUser==null){
				res.render("nouser");
			}else{
				if(thisUser.name==req.body.name){
					if(thisUser.password==req.body.password){
						userStorage = thisUser.name;
						res.render('./../public/user.html');
						sessionIDStorage = req.sessionID;
						console.log(thisUser.products);
						
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



// 获取作品
router.get('/myproduct.html', function(req, res) {
 	if((userStorage!="")&&(req.sessionID)){
 		user.findOne({'name':userStorage},function(err,thisUser){
 			ejsUser =  {
 				list:thisUser.products
 			}
 			res.render('myproduct',ejsUser);
 		});
 		
 	}else{
 		res.render('pleaselogin');
 	}
  	
});




// 搜索作品
router.post('/search',function(req, res){
	if((userStorage!="")&&(req.sessionID)){
		var searchName = req.body.searchp;
 		user.findOne({'name':userStorage},function(err,thisUser){
 			var userArray = thisUser.products;
 			var userArrayResult = userArray.filter(function(item,index,array){
 				return (item.name==searchName);
 			});
 			ejsUser =  {
 				list:userArrayResult
 			}
 			res.render('myproduct',ejsUser);
 		});
 		
 	}else{
 		res.render('pleaselogin');
 	}
});



// 获取用户信息
router.get('/userinfo.html', function(req, res) {
  	if((userStorage!="")&&(req.sessionID)){
  		user.findOne({'name':userStorage},function(err,thisUser){
 			ejsUser =  {
 				ejsname:thisUser.name,
 				ejscounts:thisUser.products.length
 			}
 			res.render('myinfo',ejsUser);
 		});
 		
 	}else{
 		res.render('pleaselogin');
 	}
  	
  
});



// 删除作品
router.post('/delete', function(req, res) {
	var deleteName = req.body.productname1;
	
  	if((userStorage!="")&&(req.sessionID)){
  		user.findOne({'name':userStorage},function(err,thisUser){
  			var deleteIndex = 1000;
  			var userArray = thisUser.products;
 			var userArrayResult = userArray.some(function(item,index,array){
 				deleteIndex = index;
 				
 				return (item.name==deleteName);
 			});
 			
 			if(userArrayResult==true){
 				thisUser.products.splice(deleteIndex,1);
 				thisUser.save(function(err){});
 				res.render("deletesuccess");
 			}else{
 				res.render("deleteerror");
 			}
 			
 			
 		});
 		
 	}else{
 		res.render('pleaselogin');
 	}
  	
  
});



// 更新作品
router.post('/updata', function(req, res) {
	var updataName = req.body.productname2;
	console.log(req.body);
	console.log(req.body.productname2);
	console.log(updataName);
	console.log("haha");
  	if((userStorage!="")&&(req.sessionID)){
  		user.findOne({'name':userStorage},function(err,thisUser){
  			var updataIndex = 1000;
  			var userArray = thisUser.products;
 			var userArrayResult = userArray.some(function(item,index,array){
 				updataIndex = index;
 				
 				return (item.name==updataName);
 			});
 			
 			if(userArrayResult==true){
 				var updataObj = {name:updataName,
 					url:req.body.producturl};
 				thisUser.products.splice(updataIndex,1);
 				thisUser.products.push(updataObj);
 				thisUser.save(function(err){});
 				res.render("updatasuccess");
 			}else{
 				res.render("updataerror");
 			}
 			
 			
 		});
 		
 	}else{
 		res.render('pleaselogin');
 	}
  	
  
});


// 登出
router.get('/logout.html', function(req, res) {
	userStorage="";
	sessionIDStorage = "";
  	

  	res.render('logout');

});


// 上传作品 通过上传文件
var filenamenow = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
  	filenamenow = Date.now()+"."+"html";
    cb(null, filenamenow);
  }
});

var upload = multer({ storage: storage });
router.post('/byfile',upload.single('file'),function(req, res){
	var fileinname = req.body.productname;
	if((userStorage!="")&&(req.sessionID)){
		
 		user.findOne({'name':userStorage},function(err,thisUser){
 			
 			var pObj = {
 				name:fileinname,
 				url:"http://127.0.0.1:3000/"+"uploads/"+filenamenow
 			}
 			thisUser.products.push(pObj);
 			thisUser.save(function(err){});
 			

 			console.log(thisUser.productsname);
 			console.log(thisUser.products);
 			res.render('addproduct');
 		});
 	}else{
 		res.render('pleaselogin');
 	}
  	
});







// 上传作品，通过提供作品地址
router.post('/byurl',function(req, res){
	var fileinname = req.body.producturlname;
	if((userStorage!="")&&(req.sessionID)){
 		user.findOne({'name':userStorage},function(err,thisUser){
 			
 			var pObj = {
 				name:fileinname,
 				url:"http://"+req.body.producturl
 			}
 			thisUser.products.push(pObj);
 			thisUser.save(function(err){});
 			res.render('addproduct');
 		});
 	}else{
 		res.render('pleaselogin');
 	}
});




// 改变密码
router.post('/changepassword',function(req, res){
	var oldpassword = req.body.oldpassword;
	var newpassword = req.body.newpassword;
	var again = req.body.again;
	
	if((userStorage!="")&&(req.sessionID)){
		
			if(again==newpassword){
				user.findOne({'name':userStorage},function(err,thisUser){
 				    if(thisUser.password==oldpassword){
 				    	thisUser.password = newpassword;
 				    	thisUser.save(function(err){});
 				    	res.render('changeok');
 				    }else{
 				    	res.render('errorpassword');
 				    }
 				});
		}else{
			res.render('againerror');
		}
 		
 	}else{
 		res.render('pleaselogin');
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