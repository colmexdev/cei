ancho = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
barra_render = false;


$(document).ready(function(){
	$(document).trigger("scroll");
});

window.onresize = function(){
	$(document).trigger("scroll");
}

$(window).on("orientationchange",function(){
	$(window).trigger("resize");
});
