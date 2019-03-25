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
	return (100/cols) + "%";
}

function hideLink(event,element,link,method,keyword,query){
  keyword = keyword || null;
	query = query || null;
	event = event || null;
  if(event != null)
		event.preventDefault();
	$(element).append('<a ' + (method == "DELETE" ? ('data-method="'+method+'" rel="nofollow" data-remote=true data-confirm="¿Seguro que desea eliminar el objeto?"') : (method == "PUT" ? ('data-method="'+method+'"') : "data-remote=true")) + ' href="'+link+(keyword != null ? '&keyword='+keyword : "") + (query != null ? "&"+query[1]+"&complement="+query[0] : "") +'" style="display:none;" id="vlink"></a>');
	$("#vlink").trigger("click");
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

// 0 : Cadena (total)
// 1 : Cadena (parcial)
// 2 : Número
// 3 : Fecha
function filteredParams(set){
	if(set == "Descubre") return [["contenido","=",0]];
	else if(set == "Programas docentes") return [["programa","=",0]];
	else if(set == "Directorio de Autoridades") return [["seccion","=",0]];
	else if(set == "Documentos varios") return [["tipo","=",0]];
	else if(set == "Cátedras y seminarios") return [["tipo","=",0]];
	else if(set == "Directorio académico") return [["adscripcion","=",0]];
	else return [];
}

function deleteImage(element,id_vis) {
	if(element.checked){
		if(id_vis.indexOf("cont") == -1)
			$("#"+id_vis).attr("src","/vacio.png");
		else
			$("#"+id_vis).html("");
	}
}

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
	$(".datepicker").datepicker({
		format: "yyyy-mm-dd", language: "es-MX"
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
}

function extendTrix(ev){
	var element = ev.target;
  var editor = element.editor;
  var toolbarElement = element.toolbarElement;
  var textElement = toolbarElement.querySelector(".trix-button-group--text-tools");
	var blockElement = toolbarElement.querySelector(".trix-button-group--block-tools");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"underline\" title=\"Underline\" tabindex=\"-1\"><div style=\"display:inline-block;\"><i class=\"fa fa-underline\" aria-hidden=\"true\"></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"larger\" title=\"Incrementar tamaño\" tabindex=\"-1\"><div style=\"display:inline-block;width:100%;text-align:center;\"><i class='fa fa-font' style='font-size:20px;'></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"smaller\" title=\"Disminuir tamaño\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:10px;width:100%;text-align:center;\"><i class='fa fa-font' style='font-size:10px;'></i></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"rosaBold\" title=\"Rosa bold\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#B03856;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"rosaLight\" title=\"Rosa light\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#CC4E78;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"gray\" title=\"Gris\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#808080;width:18px;height:20px;margin:5px auto 0;\"></div></button>");
	textElement.insertAdjacentHTML("beforeend", '<button type="button" class="trix-button trix-button-icon" data-trix-attribute="sup"  tabindex="-1"><sup>SUP</sup></button>');
  textElement.insertAdjacentHTML("beforeend",'<button type="button" class="trix-button trix-button-icon" tabindex="-1" data-trix-attribute="sub"><sub>SUB</sub></button>');
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading1\" title=\"Heading1\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:18px;width:100%;text-align:center;\">H1</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading2\" title=\"Heading2\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:16px;width:100%;text-align:center;\">H2</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading3\" title=\"Heading3\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:14px;width:100%;text-align:center;\">H3</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading4\" title=\"Heading4\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:12px;width:100%;text-align:center;\">H4</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading5\" title=\"Heading5\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:10px;width:100%;text-align:center;\">H5</div></button>");
	blockElement.insertAdjacentHTML("afterbegin","<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading6\" title=\"Heading6\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:8px;width:100%;text-align:center;\">H6</div></button>");
	blockElement.querySelector(".trix-button--icon-heading-1").parentNode.removeChild(blockElement.querySelector(".trix-button--icon-heading-1"));

	var atributos = new Set;
	function actualizarAtributos(){
		atributos = new Set;
		var rango = editor.getSelectedRange();
		var piezas = (rango[0] === rango[1] ? editor.getDocument().getPieceAtPosition(rango[0] - 1) : editor.getDocument().getDocumentAtRange(rango).getPieces());
		console.log(piezas);
		window.pz = piezas;
		//piezas.forEach(function(pieza){
			Object.keys(rango[0] === rango[1] ? piezas.getAttributes() : piezas[0].getAttributes()).forEach(function(atributo){
      	atributos.add(atributo);
      });
		//});
	}

	function forzarAtributos(){
		if(editor.attributeIsActive("sup") && atributos.has("sub")) editor.deactivateAttribute("sub");
		else if(editor.attributeIsActive("sub") && atributos.has("sup")) editor.deactivateAttribute("sup");
		if(editor.attributeIsActive("larger") && atributos.has("smaller")) editor.deactivateAttribute("smaller");
		else if(editor.attributeIsActive("smaller") && atributos.has("larger")) editor.deactivateAttribute("larger");
		if(editor.attributeIsActive("rosaBold")){
			if(atributos.has("rosaLight")) editor.deactivateAttribute("rosaLight");
			if(atributos.has("gray")) editor.deactivateAttribute("gray");
		} else if(editor.attributeIsActive("rosaLight")){
			if(atributos.has("rosaBold")) editor.deactivateAttribute("rosaBold");
			if(atributos.has("gray")) editor.deactivateAttribute("gray");
		} else if(editor.attributeIsActive("gray")){
			if(atributos.has("rosaLight")) editor.deactivateAttribute("rosaLight");
			if(atributos.has("rosaBold")) editor.deactivateAttribute("rosaBold");
		}
		actualizarAtributos();
	}

	actualizarAtributos();
	/*element.addEventListener("trix-focus", function(event){
		actualizarAtributos();
		window.tr_rg = event.target.editor.getSelectedRange();
		window.tr_ed = event.target.editor;
		window.tr_el = event.target.editor.attributeIsActive("sup");
		window.tr_ep = event.target.editor.attributeIsActive("sub");
		forzarAtributos();	
	});*/
	element.addEventListener("trix-selection-change", actualizarAtributos); 
	element.addEventListener("trix-change", function(event){
		forzarAtributos();
		$("#" + event.target.getAttribute("input")).val(event.target.innerHTML.replace(/(<p>)+(.*?)(<\/p>)+/g,"<div>$2</div>"));
	});
	
}

addEventListener("trix-initialize",function(event){
	extendTrix(event);
});

/*$(document).on("trix-change",function(event){
	$("#" + event.target.getAttribute("input")).val(event.target.innerHTML.replace(/(<p>)+(.*?)(<\/p>)+/g,"<div>$2</div>"));
});

$(document).on("trix-selection-change",function(event){

});*/

function clearPars(edit){
	try{
	var regex = /<p>(?!<p>)(?!(<--block-->)?<br>).+?<\/p>/g;
	var cars = edit.value.length;
	var newHTML = edit.value.match(regex).join("").replace(/<p>/g,"<div>").replace(/<\/p>/g,"</div>");
	edit.innerHTML = "";
	edit.editor.setSelectedRange([0,cars]);
	edit.editor.deleteInDirection("forward");
	edit.editor.insertHTML(newHTML);
	
	}catch(err){

	}
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
