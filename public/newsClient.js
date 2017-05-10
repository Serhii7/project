$(function () {

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	var token = getCookie("token");
	var socket = io.connect();
	socket.emit('news',token);

	socket.on('news', function(msg){
		$('body').append('<div class="alert-msg alert alert-info" role="alert">'+msg+'</div>');
		console.log(msg);
		$('.alert-msg').fadeIn(1000);

		$('.alert-msg').fadeOut(3000);
	});
});
