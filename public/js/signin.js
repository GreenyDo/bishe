window.onload = function(){
	var loginBar = document.getElementById("login");
	var signinBar = document.getElementById("signin");
	
	var password = document.getElementById("password");
	var rpassword = document.getElementById("rpassword");
	var myform = document.forms[0];
	loginBar.onclick = function(){
		location.href="index.html";
	};
	signinBar.onclick = function(event){
		event.preventDefault();
		if(password.value==rpassword.value){
			myform.submit();
		}else{
			alert("两次密码输入不一致");
		}
		
	};



	var captchaBar = document.getElementById("captcha_button");
	var imgCtrl = document.getElementById("captcha_code");
	captchaBar.onclick = function(event){
		event.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open("get","signincaptcha",true);
		xhr.send(null);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var dataMessage = xhr.getAllResponseHeaders();//查看http头部信息
				// console.log(dataMessage+'kehuduan');//查看http头部信息
				imgCtrl.innerHTML = xhr.responseText;//获取svg图像
			}
		}
	};

};