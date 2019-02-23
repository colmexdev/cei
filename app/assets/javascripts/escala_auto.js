ancho = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
barra_render = false;


$(document).ready(function(){
	$(window).trigger("resize");
});

window.onresize = function(){
	$(document).trigger("scroll");
	try{
		$("#f_logo_r").height($("#f_logo_l").height());
		$("#f_logo_r img").css({"padding-top": (($("#f_logo_l img").height() - $("#f_logo_r img").height())/2) + "px" });
	} catch(err){}
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
