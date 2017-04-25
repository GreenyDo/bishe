$(document).ready(function() {
	$.fn.extend({
		animateCss: function(animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});
	
	var $url_one = $('#url_one');
	var $url_two = $('#url_two');
	var $url_three = $('#url_three');
	var $url_four = $('#url_four');
	$url_one.mouseover(function(){
		$(this).animateCss("bounce");
	});
	$url_two.mouseover(function(){
		$(this).animateCss("bounce");
	});
	$url_three.mouseover(function(){
		$(this).animateCss("bounce");
	});
	$url_four.mouseover(function(){
		$(this).animateCss("bounce");
	});
});