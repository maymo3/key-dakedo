$(function() {

	var $topBtn = $('#top-btn');
	$topBtn.css("display","none");

	$(window).on('load resize',function(){
		var w = $(window).width();
		if (w >= 768) {
				// 300スクロールしたら戻るボタンを出す
			$(window).scroll(function(){
				if ($(this).scrollTop() > 300) {
					$topBtn.fadeIn(500);
				} else {
					$topBtn.fadeOut(500);
				}
			});
				// 戻るボタンをクリックしたらトップに戻る
			$topBtn.click(function(){
				$('html,body').animate({
					scrollTop: 0
				},800);
				return false;
			});
		} else {
			$topBtn.css("display","none");
		}
});
	
	
	function makeToc() {
		$('#markdown-toc li').click(function(){
			var speed = 800;
			var href = $(this).find('a').attr('href');
			var target = $(href == '#'||href == ''?'html': href);
			var position = target.offset().top -15;
			$('html,body').stop().animate({scrollTop:position},speed);
			return false;
		});

		var secTopArr = new Array();
		secTopArr.length = 0;
		var current = -1;

		$('article h2').each(function(i){
			secTopArr[i] = $(this).offset().top;
		});

		$(window).on('load scroll',function(){
			for (var i = secTopArr.length - 1; i >= 0; i--) {
				if ($(window).scrollTop() > secTopArr[i] -30) {
					$('.sideToc > ol > li').removeClass('current').eq(i).addClass('current');
					// $('.sideToc ol ol li.current').parent('ol').prev().addClass('current');
					break;
				} else {
					$('.sideToc > ol > li').removeClass('current')
				}
			}
		});
	}
	$(window).on('load resize', function(){
		setTimeout(function(){
			makeToc();
		},1000);
	});
	
});