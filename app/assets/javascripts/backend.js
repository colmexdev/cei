function changeToggle(over){
	var tog = (over == 0);
	$("#but-toggle").css({"background-color": (tog ? "#DCDCDC" : "")});
	$("#bar-s").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
	$("#bar-m").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
	$("#bar-i").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
}

function uncheckBoxes(element,clase){
	if(element.checked)
		$("."+clase).attr("checked",false);
}

function uncheckNull(id){
	$("#"+id).attr("checked",false);
}

function addField(event,element,parent_class,cont_id,field_id){
	var total = $("."+parent_class).length;
	var div = document.createElement("div");
	div.style.width = "100%";
	div.className = parent_class;
	div.id = field_id + total;
	//Estructura del campo a añadir
	var html = '<div class="photo-upload">' + 
		  '<label for="sesion_fotos">' + '<span class="glyphicon glyphicon-upload glyph-padding"></span>Añadir imágenes' + '</label><br>' +
		  '<input type="file" name="sesion[fotos][]" id="sesion_fotos" multiple="multiple" onchange="readURL(this,\'#galerias-cont-' + total + '\')">' +
			'</div>' +
			'<div class="img-display" id="galerias-cont-' + total + '">' +
			'</div>' +
			'<div style="float:right;width:30px;">' +
				'<span style="font-size:12px;cursor:pointer;" class="glyphicon glyphicon-plus" id="foto-new-0" data-id="0" onclick="addField(event,this,\'fields-fotos\',\'fields-fotos\',\'foto-\')"></span>' +
				'<span style="font-size:12px;cursor:pointer;" class="glyphicon glyphicon-minus" id="foto-del-0" data-id="0" onclick="deleteField(event,this,\'foto-\')"></span>' +
			'</div>';
	div.innerHTML = html;
	document.getElementById(cont_id).appendChild(div);
}

function deleteField(event,element,field_id){
	var field = document.getElementById(field_id + element.dataset["id"]);
	return field.parentNode.removeChild(field);
}

function slideMenu(){
	var slide = ($("#menu-lat").width() == 0);
	$("#menu-lat").css({"width": (slide ? "" : "0px") });
	$("#graphs-gest").css({"width": (slide ? "" : "100%")});
}

function adjustWidths(cols){
	return /*(100/cols) + "%"*/ "250px";
}

function hideLink(event,element,link,method,keyword,filter_el,sort_el,in_index){
  keyword = keyword || null;
	filter_el = filter_el || null;
	event = event || null;
	sort_el = sort_el || null;
	in_index = in_index || false;
	method = method || "";
	var query_filter = (in_index ? setFilter(event, filter_el) : "");
	var query_sort = (in_index ? setSort(event, sort_el) : "");
  if(event != null)
		event.preventDefault();
	$(element).append('<a ' + (method == "DELETE" ? ('data-method="'+method+'" rel="nofollow" data-remote=true data-confirm="¿Seguro que desea eliminar el objeto?"') : (method =="PUT" ? ('data-method="' + method + '"') : "data-remote=true")) + ' href="' + link + query_sort + (keyword != null ? '&keyword=' + keyword : "") + query_filter +'" style="display:none;" id="vlink"></a>');
	window.complete_url = "https://ceitest.colmex.mx" + $("#vlink").attr("href");
	if(method.toUpperCase() == "POST"){
		var url_params = new URL(window.complete_url).searchParams;
		$.post(
			window.complete_url.split("?")[0],
			{"offset": url_params.get("offset") || 0, "locale": url_params.get("locale"), "set": url_params.get("set") || "", "keyword": url_params.get("keyword") || "", "sort_c[]": url_params.getAll("sort_c[]"), "sort_d[]": url_params.getAll("sort_d[]"), "filt_fo[]": url_params.getAll("filt_fo[]"), "filt_v[]": url_params.getAll("filt_v[]")},
			function(data) { }
		);
	} else { $("#vlink").trigger("click"); }
	$("#vlink").remove();
}

function filterAnalytics(link){
	var conds = [];
	var pars = "";
	var url = "";
	if($("#fecha_desde")[0].value != "")
		conds.push(["di",$("#fecha_desde")[0].value]);
	if($("#fecha_hasta")[0].value != "")
		conds.push(["dd",$("#fecha_hasta")[0].value]);
	if(conds.length != 0){
		url = link + (link.indexOf("?") != -1 ? "" : "?")
		for(var i in conds)
			pars = pars + conds[i][0] + "=" + conds[i][1] + (i == conds.length -1 ? "" : "&");
		url = url + "&" + pars;
	}
	//console.log(url);
	return url;
}

/* Funciones de ordenamiento y filtrado */
function toggleFilters(){
	document.querySelector("#filter-accord").classList.toggle("active");
	document.querySelector("#filter-grid").style.height = ( document.querySelector("#filter-accord").classList.contains("active") ? document.querySelector("#filter-grid div").offsetHeight + "px" : "");

}

function setFilter(event, element){
	element = element || null;
	try{
		var url = new URL(window.complete_url);
		var fields = url.searchParams.getAll("filt_fo[]");
		var vals = url.searchParams.getAll("filt_v[]");
		var url_fields = "", url_vals = "";
		if(element != null){
			var field = element.dataset.field;
			var op = element.dataset.op;
			var val = element.value;
			if(val != null && val !== ""){
				if(fields.indexOf(encodeURIComponent(field + "*" + op)) != -1) vals[fields.indexOf(encodeURIComponent(field + "*" + op))] = encodeURIComponent(val);
				else {
					fields.push(encodeURIComponent(field + "*" + op));
					vals.push(encodeURIComponent(val.replace(/\\/g,"\\\\")));
				} 
			} else {
				var indice = fields.indexOf(encodeURIComponent(field + "*" + op));
				fields.splice(indice, 1);
				vals.splice(indice, 1);
			}
		}
		for(var i = 0; i < fields.length; i++){
			url_fields = url_fields + "&filt_fo[]=" + fields[i];
			url_vals = url_vals + "&filt_v[]=" + vals[i];
		}
		return url_fields + (fields.length > 0 ? url_vals : "");
	} catch(err) { return "" }
}

function setSort(event, element){
	element = element || null;
	try{
		var url = new URL(window.complete_url);
		var fields = url.searchParams.getAll("sort_c[]");
		var dirs = url.searchParams.getAll("sort_d[]");
		var url_campos = "", url_orden = "";
		if(element != null){
			var dir = element.dataset.order;
			var field = element.dataset.field;
			var indice;
			element.parentNode.querySelectorAll(".span-cursor").forEach(function(span){
				span.classList.remove("active");
			});
			if(dir !== "nil"){
				element.classList.add("active");
				if(fields.indexOf(field) == -1){
					fields.push(encodeURIComponent(field));
					dirs.push(encodeURIComponent(dir));
				} else {
					dirs[fields.indexOf(field)] = encodeURIComponent(dir);
				}
			}	else {
				if(fields.indexOf(field) != -1){
					indice = fields.indexOf(encodeURIComponent(field));
					fields.splice(indice,1);
					dirs.splice(indice,1);
				}
			}
		}
		for(var i = 0; i < fields.length; i++){
			url_campos = url_campos + "&sort_c[]=" + encodeURIComponent(fields[i]);
			url_orden = url_orden + "&sort_d[]=" + encodeURIComponent(dirs[i]);
		}
		return url_campos + (fields.length > 0 ? url_orden : "")
	} catch(err) { return "" }
}

function highlightSort(){
	var url = new URL(window.complete_url);
	var fields = url.searchParams.getAll("sort_c[]");
	var dirs = url.searchParams.getAll("sort_d[]");
	var sort_s, texto;
	var span_n, s1, s2;
	for(var i = 0; i < fields.length; i++){
		span_n = document.createElement("span");
		s1 = document.createElement("i");
		s2 = document.createElement("i");
		texto = document.createTextNode(i + 1);
		span_n.classList.add("fa-stack", "span-auto");
		s1.classList.add("fa", "fa-stack-1x", "fa-circle", "span-canvas");
		s2.classList.add("fa", "fa-stack-1x", "span-lay", "fa-inverse");
		s2.append(texto);
		span_n.append(s1);
		span_n.append(s2);
		span_n.setAttribute("title", "Prioridad " + (i + 1) + " en el ordenamiento");
		sort_s = document.querySelector("[data-field=" + fields[i] + "][data-order=" + dirs[i] + "]");
		sort_s.classList.add("active");
		document.querySelector("[data-field=" + fields[i] + "][data-order=nil]").classList.remove("span-oculto");
		sort_s.parentNode.append(span_n);
	}
	var f_fields = url.searchParams.getAll("filt_fo[]");
	var f_vals = url.searchParams.getAll("filt_v[]");
	var fo;
	for(var i = 0; i < f_fields.length; i++){
		fo = decodeURIComponent(f_fields[i]).split("*");
		document.querySelector("[data-tipo=filtro][data-field=" + fo[0] + "][data-op=" + fo[1] + "]").value = f_vals[i].replace(/\\\\/g,"\\");
	}
	var offs = url.searchParams.get("offset") || 0;
	document.querySelector("[data-tipo=pag][data-pag='" + offs + "']").classList.add("active");
	if(url.searchParams.has("keyword")) document.querySelector("#keyword").value = url.searchParams.get("keyword");
}

/* Función para mantener fijo el paginado */
function fixPagination(left, container_id){
	container_id.forEach(function(c){
		document.querySelector(c).style.left = left + "px";
	});
}

function buildQuery(conds){
	var query = "";
	var url_params = "";
	for(var i in conds){
		var filter = $("#"+conds[i][0])[0];
		if(filter.value == "" || filter.value == null) continue
		else{
			query += (query.length > 0 ? " and " : "") + conds[i][0] + " " + conds[i][1] + " " + (conds[i][2] == 0 ? "'" : ( conds[i][2] == 1 ? "'%'" : "")) + filter.value + (conds[i][2] == 0 ? "'" : ( conds[i][2] == 1 ? "'%'" : ""));
			url_params += (url_params.length > 0 ? "&" : "") + conds[i][0] + "=" + filter.value;
		}
	}
	return [query,url_params];
}

/* Función para eliminar el contenido multimedia previsualizado */
function deleteImage(element,id_vis) {
	if(element.checked) $("#"+id_vis).html("");
}

/* Función para desplegar contenido multimedia */
function readURL(input,display,check_del,multi) {
	check_del = check_del || "";
  multi = multi || false;
  if(check_del != "")
    $(check_del)[0].checked = false;
  if (input.files && input.files.length > 0) {

		for(var i = 0; i < input.files.length; i++){
    	var reader = new FileReader();
    
		  reader.onload = function (e) {
				try{
					if(e.target.result.includes("data:application/pdf"))
						$(display).html((multi ? $(display).html() : "") + "<object type=\"application/pdf\" data =\"" + e.target.result + "\"><embed src=\"" + e.target.result + "\" type=\"application/pdf\"></object>" + (multi ? "<br><br>" : ""));
					else if(e.target.result.includes("data:image/"))
						$(display).html((multi ? $(display).html() : "") + "<img src=\"" + e.target.result + "\">" + (multi ? "<br><br>" : ""));
					else
						$(display).html((multi ? $(display).html() : "") + "Vista previa no disponible" + (multi ? "<br><br>" : ""));
				} catch(err){
						$(display).html((multi ? $(display).html() : "") + "Vista previa no disponible" + (multi ? "<br><br>" : ""));
				}
		  }
 
    	reader.readAsDataURL(input.files[i]);
		}
  }
}

// Función para automatizar los datepickers
function styleDatepickers(){
	$(".fechas").datepicker({
		format: "yyyy-mm-dd", language: "es-MX", autoclose: true, todayBtn: "linked", todayHighlight: true, clearBtn: true
	});
}

function formatDate(fecha){
	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	var day = fecha.getDate(), month = fecha.getMonth();
	return months[month] + " " + padZero(day) /*padZero(month)*/
}

/* Funciones de edición de texto */
function configTrix(){
	Trix.config.blockAttributes.left = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "left"},
		terminal: true
	}
	Trix.config.blockAttributes.center = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "center"},
		terminal: true
	}
	Trix.config.blockAttributes.right = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "right"},
		terminal: true
	}
	Trix.config.blockAttributes.justify = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "justify"},
		terminal: true
	}
	Trix.config.blockAttributes.heading1 = {
		breakOnReturn: true,
		group: false,
		tagName: "h1",
		terminal: true
	}
	Trix.config.blockAttributes.heading2 = {
		breakOnReturn: true,
		group: false,
		tagName: "h2",
		terminal: true
	}
	Trix.config.blockAttributes.heading3 = {
		breakOnReturn: true,
		group: false,
		tagName: "h3",
		terminal: true
	}
	Trix.config.blockAttributes.heading4 = {
		breakOnReturn: true,
		group: false,
		tagName: "h4",
		terminal: true
	}
	Trix.config.blockAttributes.heading5 = {
		breakOnReturn: true,
		group: false,
		tagName: "h5",
		terminal: true
	}
	Trix.config.blockAttributes.heading6 = {
		breakOnReturn: true,
		group: false,
		tagName: "h6",
		terminal: true
	}
	Trix.config.textAttributes.underline = { 
		tagName: "u",
		parser: function(element) {
			return element.style.textDecoration === "underline"
		},
		inheritable: true
	}
	Trix.config.textAttributes.rosaBold = {
    groupTagName: "span", 
		style: { color: "#B03856" },
		parser: function(element) {
			return element.style.color === "rgb(176, 56, 86)"
		},
		inheritable: true
	}
	Trix.config.textAttributes.rosaLight = {
    groupTagName: "span", 
		style: { color: "#CC4E78" },
		parser: function(element) {
			return element.style.color === "rgb(204, 78, 120)"
		},
		inheritable: true
	}
	Trix.config.textAttributes.gray = {
    groupTagName: "span", 
		style: { color: "#808080" },
		parser: function(element) {
			return element.style.color === "rgb(128, 128, 128)"
		},
		inheritable: true
	}
	Trix.config.textAttributes.larger = {
    groupTagName: "span", 
		style: { fontSize: "larger" },
		parser: function(element) {
			return element.style.fontSize === "larger";
		},
		inheritable: true
	}
	Trix.config.textAttributes.smaller = {
    groupTagName: "span", 
		style: { fontSize: "smaller" },
		parser: function(element) {
			return element.style.fontSize === "smaller"
		},
		inheritable: true
	}
	Trix.config.textAttributes.sup = {
		tagName: "sup",
		parser: function(element){
			return element.style.verticalAlign === "super" && element.style.fontSize === "smaller"
		},
		inheritable: true
	}
	Trix.config.textAttributes.sub = {
		tagName: "sub",
		parser: function(element){
			return element.style.verticalAlign === "sub" && element.style.fontSize === "smaller"
		},
		inheritable: true
	}
	Trix.config.textAttributes.italic.tagName = "i";
	Trix.config.textAttributes.bold.tagName = "b";
	Trix.config.attachments.preview.caption = {
		name: false,
		size: false
	};
}

function extendTrix(ev){
	var element = ev.target;
  var editor = element.editor;
  var toolbarElement = element.toolbarElement;
  var textElement = toolbarElement.querySelector(".trix-button-group--text-tools");
	var blockElement = toolbarElement.querySelector(".trix-button-group--block-tools");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"underline\" data-trix-key=\"u\" title=\"Subrayar (Ctrl + u)\" tabindex=\"-1\"><div style=\"display:inline-block;\"><i class=\"fa fa-underline\" aria-hidden=\"true\"></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"larger\" data-trix-key=\"l\" data-trix-action=\"x-larger\" title=\"Incrementar tamaño (Ctrl + l)\" tabindex=\"-1\"><div style=\"display:inline-block;width:100%;text-align:center;\"><i class='fa fa-font' style='font-size:20px;'></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"smaller\" data-trix-key=\"s\" data-trix-action=\"x-smaller\" title=\"Disminuir tamaño (Ctrl + s)\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:10px;width:100%;text-align:center;\"><i class='fa fa-font' style='font-size:10px;'></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"rosaBold\" data-trix-action=\"x-rosaBold\"  data-trix-key=\"r\" title=\"Rosa fuerte (Ctrl + r)\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#B03856;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"rosaLight\" data-trix-action=\"x-rosaLight\" data-trix-key=\"t\" title=\"Rosa claro (Ctrl + t)\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#CC4E78;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"gray\" data-trix-action=\"x-gray\" data-trix-key=\"g\" title=\"Gris (Ctrl + g)\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#808080;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend", '<button type="button" class="trix-button trix-button-icon" data-trix-attribute="sup" data-trix-action="x-sup" title="Superíndice (Ctrl + p)" data-trix-key="p" tabindex="-1"><sup>sup</sup></button>');
  textElement.insertAdjacentHTML("beforeend",'<button type="button" class="trix-button trix-button-icon" tabindex="-1" data-trix-attribute="sub" title="Subíndice (Ctrl + m)" data-trix-key="m" data-trix-action="x-sub"><sub>sub</sub></button>');
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading1\" title=\"Encabezado 1 (Ctrl + 1)\" data-trix-key=\"1\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:18px;width:100%;text-align:center;\">H1</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading2\" title=\"Encabezado 2 (Ctrl + 2)\" data-trix-key=\"2\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:16px;width:100%;text-align:center;\">H2</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading3\" title=\"Encabezado 3 (Ctrl + 3)\" data-trix-key=\"3\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:14px;width:100%;text-align:center;\">H3</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading4\" title=\"Encabezado 4 (Ctrl + 4)\" data-trix-key=\"4\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:12px;width:100%;text-align:center;\">H4</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading5\" title=\"Encabezado 5 (Ctrl + 5)\" data-trix-key=\"5\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:10px;width:100%;text-align:center;\">H5</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading6\" title=\"Encabezado 6 (Ctrl + 6)\" data-trix-key=\"6\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:8px;width:100%;text-align:center;\">H6</div></button>");
	blockElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-action=\"x-attach\" data-trix-key=\"h\" title=\"Adjuntar archivo (Ctrl + h)\"><div style=\"display:inline-block;\"><i class=\"fa fa-cloud-upload\" aria-hidden=\"true\"></i></div></button>");
	blockElement.querySelector(".trix-button--icon-heading-1").parentNode.removeChild(blockElement.querySelector(".trix-button--icon-heading-1"));

	element.addEventListener("trix-action-invoke", function(event){
		if(event.actionName === "x-larger") editor.deactivateAttribute("smaller");
		else if(event.actionName === "x-smaller") editor.deactivateAttribute("larger");
		if(event.actionName === "x-sup") editor.deactivateAttribute("sub");
		else if(event.actionName === "x-sub") editor.deactivateAttribute("sup");
		if(event.actionName === "x-rosaBold"){
			editor.deactivateAttribute("rosaLight");
			editor.deactivateAttribute("gray");
		} else if(event.actionName === "x-rosaLight"){
			editor.deactivateAttribute("rosaBold");
			editor.deactivateAttribute("gray");
		} else if(event.actionName === "x-gray"){
			editor.deactivateAttribute("rosaBold");
			editor.deactivateAttribute("rosaLight");
		}
		if(event.actionName === "x-attach"){
			const fileInput = document.createElement("input");
			fileInput.setAttribute("type", "file");
			fileInput.setAttribute("accept", ".jpeg, .jpg, .png, .gif, .pdf, .doc, .xls, .docx, .xlsx");
			fileInput.setAttribute("multiple", "true");
			fileInput.addEventListener("change", function(){
				const {files} = fileInput;
				Array.from(files).forEach(function(f){
					editor.insertFile(f);
				});
			});
			fileInput.click();
		}
	});
	element.addEventListener("trix-attachment-add", function(event){
		const attachment = event.attachment;
		const file = attachment.file;
		console.log(file);
		let forma = new FormData;
		forma.append("Content-Type", file.type);
		forma.append("gallery[imagen]", file);
		forma.append("set", "Galería");
		
		let xhr = new XMLHttpRequest;
		xhr.open("POST", "/panel.json", true);
		xhr.setRequestHeader("X-CSRF-Token",$("meta[name='csrf-token']").attr("content"));
		
		xhr.upload.onprogress = function(event){
			attachment.setUploadProgress(event.loaded/event.total * 100);
		}

		xhr.onload = function(){
			if(xhr.status === 201){
				var data = JSON.parse(xhr.responseText);
				return attachment.setAttributes({url: data.imagen_url, href: data.imagen_url});
			}
		}

		return xhr.send(forma);
	});

	element.addEventListener("trix-attachment-remove", function(event){
		const file = event.attachment;
		console.log(file);
	});
	element.addEventListener("trix-change", function(event){
		$("#" + event.target.getAttribute("input")).val(event.target.innerHTML.replace(/(<p>)+(.*?)(<\/p>)+/g,"<div>$2</div>"));
	});
	
}

addEventListener("trix-initialize",function(event){
	extendTrix(event);
});

function clearPars(edit){
	try{
		var regex = /<p>(?!<p>)(?!(<--block-->)?<br>).+?<\/p>/g;
		var cars = edit.value.length;
		var newHTML = edit.value.match(regex).join("").replace(/<p>/g,"<div>").replace(/<\/p>/g,"</div>");
		edit.innerHTML = "";
		edit.editor.setSelectedRange([0,cars]);
		edit.editor.deleteInDirection("forward");
		edit.editor.insertHTML(newHTML);
	} catch(err){}
}

function padZero(n){
	return (n < 10 ? "0" + n : n.toString())
}

/* Funciones de graficación */

function modifyTooltip(sheet,left){
	if(sheet.rules.length == 1){
		sheet.removeRule(0);
	}
	sheet.insertRule('#tooltip-backend::after { left: ' + left + 'px }',0);
}

function escala(tipo,dom,rango,pad){
	var scale = (tipo == 't' ? d3.scaleTime() : (tipo == 'l' ? d3.scaleLinear() : d3.scaleBand()));
	if(tipo == "b") scale = scale.paddingInner(pad[0]).paddingOuter(pad[1]);
	return scale
				.domain(dom)
				.range(rango)
}

function eje(o,escala,n_ticks,s_ticks,p_ticks,f_ticks){
	f_ticks = f_ticks || null;
	p_ticks = p_ticks || null;
	n_ticks = n_ticks || 10;
	s_ticks = s_ticks || null;
	var axis = (o == 'b' ? d3.axisBottom(escala) : d3.axisLeft(escala));
	return axis
					.ticks(n_ticks)
					.tickSize(s_ticks)
					.tickPadding(p_ticks)
					.tickFormat(f_ticks)
}

function completaFechas(f_i,f_f,only){
	only = only || false;
	var fs = [];
	var dif_dias = Math.ceil((f_f-f_i)/(24000*3600));
	for(var i=0; i<dif_dias; i++){
		if(!only)
			fs.push({key: new Date(f_i.getTime()+(i*24000*3600)), value: 0});
		else
			fs.push(new Date(f_i.getTime()+(i*24000*3600)));
	}
	return fs
}

function containerSelect(cont_id,cont_props){
	var c = d3.select(cont_id);
	for(var k in cont_props){
		if(cont_props.hasOwnProperty(k)){
			c = c.style(k,cont_props[k]);
		}
	}
	return c;
}

function traceFigures(canvas,d_set,fig_class,figure,fig_props,sc_x,sc_y,styles,delegs){
	styles = styles || null;
	delegs = delegs || null;
	var figs = d3.select(canvas).selectAll("."+fig_class)
		.data(d_set)
		.enter().append(figure);

	for(var k in fig_props){
		if(fig_props.hasOwnProperty(k)){
			figs = figs.attr(k,fig_props[k]);
		}
	}

	if(styles != null){
		for(var k in styles){
			if(styles.hasOwnProperty(k)){
				figs = figs.style(k,styles[k]);
			}
		}
	}

	if(delegs != null){
		for(var k in delegs){
			if(delegs.hasOwnProperty(k)){
				figs = figs.on(k,delegs[k]);
			}
		}
	}
}

function adjustLabels(){
	d3.selectAll(".axis-left .tick text").attr("x","-7");
	d3.selectAll(".axis-right .tick text").attr("x","7");
	d3.selectAll(".axis-top .tick text").attr("y","-10");
	d3.selectAll(".axis-bottom .tick text").attr("y","8");
}

// 0 : Fecha; 1: Número; Default other
function linea(sc_x,sc_y,inter,typeX,typeY,area,y0){
	area = area || false
	var fig = (area ? d3.area() : d3.line());
		fig = fig.x(function(d){return sc_x((typeX == 0 ? new Date(d.key) : (typeX == 1 ? +d.key : d.key)))}).curve(inter);
		fig = (area ? fig.y1(function(d){return sc_y((typeY == 0 ? new Date(d.value) : (typeY == 1 ? +d.value : d.value)))}) : fig.y(function(d){return sc_y((typeY == 0 ? new Date(d.value) : (typeY == 1 ? +d.value : d.value)))}) );
		

	return (area ? fig.y0(y0) : fig);
}

function pieChart(div_cont,cont_props,canvas,corners,c_id,radii,pads,sect_class,d_set,delegs){
	var cont = containerSelect(div_cont,cont_props);
	var svg_p = cont.select(canvas)
 		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 "+corners[0]+" "+corners[1])
		.append("g")
		.attr("id",c_id)
		.attr("transform","translate("+(corners[0]/2)+","+(corners[1]/2)+")");

	var arc = d3.arc()
			.outerRadius(radii[1])
			.innerRadius(radii[0])
			.padAngle(pads[0])
			.padRadius(pads[1]);

	/*var labelArc = d3.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);*/

	var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.value; });

	var p_c = svg_p.selectAll("."+sect_class)
			.data(pie(d_set))
			.enter().append("g")
			.attr("class",sect_class)
			.attr("id",function(d,i){ return sect_class+"-"+i})
			.append("path")
			.attr("d",arc);

	for(var k in delegs){
		p_c = p_c.on(k,delegs[k]);
	}
}
