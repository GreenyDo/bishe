window.onload = function(){
	var captchaBar = document.getElementById("captcha_button");
	var imgCtrl = document.getElementById("captcha_code");
	captchaBar.onclick = function(event){
		event.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open("get","captcha",true);
		xhr.send(null);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var dataMessage = xhr.getAllResponseHeaders();//查看http头部信息
				// console.log(dataMessage+'kehuduan');//查看http头部信息
				imgCtrl.innerHTML = xhr.responseText;//获取svg图像
			}
		}
	}
};