function buildSearchQuery(conds){
	var query = "?", keys = Object.keys(conds), first = true;
	for(var i = 0; i < keys.length; i++){
		if(conds[keys[i]] == "" || conds[keys[i]] == null)
			continue;
		query = query + (!first ? "&" : "") + keys[i] + "=" + conds[keys[i]];
		first = false;
	}
	return query;
}

/* Filtros de acordeón personal */
function filterDir(fields){
	var where = "";
	if(typeof fields == "string"){
		where = "&conds[inic]="+fields;
	}
	else{
		for(var i = 0; i < fields.length; i++){
			where = where + ($("#"+fields[i]).val() != "" ? ("&conds[" + fields[i] + "]=" + $("#"+fields[i]).val()) : "");
		}
	}
	$.ajax({
		url: '<%= request.fullpath.include?("academico") ? personal_academico_path: personal_administrativo_path %>.js?offset=0' + where,
		success: function(){}
	});
}

function clean(){
	$(".inics.letra").css("color","");
	$("#nombre").val("");
	$.ajax({
		url: '<%= request.fullpath.include?("academico") ? personal_academico_path: personal_administrativo_path %>.js?offset=0',
		success: function(){
			$("#busqueda").html("");
			$("#c_l").html("");
			$("#c_r").html("");
			$("#separadores").html("");
		}
	});
	
}
