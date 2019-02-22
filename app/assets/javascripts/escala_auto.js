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

function escalarSlider(arr_a){
	var ancho_slide = $("#div_slider").width();
	var alto_slide = ancho_slide*(17/40);
	$('#div_slider').css({'height':alto_slide+'px'});
	$('.ghost-slider').css("height",alto_slide+"px");
}

function reajustarBadges(arr){
	for( var i = 0; i < gon.cant_sliders; i++){
		var ancho_nuevo = ($("#div_slider").width() * arr[i]) / 1341;
		$( "#badge-" + i ).css({"width": ancho_nuevo + "px", "max-width": arr[i]+"px" });
	}
}
