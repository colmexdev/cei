class PanelController < ApplicationController
  before_action :authenticate_admin!
  before_action :select_set
  before_action :get_object_fields, only: [:index, :crear, :actualizar, :eliminar, :mostrar]

  def principal
		grupos = @sets.map {|k,v| v[:model]}
    @groups = []
    grupos.each_with_index do |g,i|
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.today-30).pluck(:nombre,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.today-30).pluck(:titulo,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.current-30).pluck(:cita,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.current-30).pluck(:badge,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
    end
    @groups = @groups.reject{|g| g.empty?}.flatten
    respond_to do |format|
      format.js
      format.json {render json: {groups: @groups, last_time: (Date.current() - 30)}}
    end
  end

  def panel
  end

  def index
    @sort_hash = "", @filter_query = ""
    if params.key?(:sort_c) && params.key?(:sort_d)
      @sort_hash = Hash[params[:sort_c].map {|x| CGI.unescape(x) }.zip(params[:sort_d].map {|x| CGI.unescape(x).to_sym })]
    end
    if params.key?(:filt_fo) && params.key?(:filt_v)
      operadores = {"like": " like ", "leq": " <= ", "geq": " >= ", "eq": " = "}
      campos = params[:filt_fo].map {|x| CGI.unescape(x.split("*")[0]) }
      ops = params[:filt_fo].map {|x| operadores[CGI.unescape(x.split("*")[1]).to_sym] }
      vals = params[:filt_v].map {|x| CGI.unescape(x).gsub("'","''") }
      @filter_query = campos.zip(ops,vals).map {|a| (@models.columns_hash[a[0]].type == :text ? ("lower(" + a[0] + ")") : a[0]) + a[1] + (a[1] == " like " ? ("'%" + a[2].downcase.gsub(/%/,'\\%').gsub(/_/,'\\_').gsub("\\","\\\\") + "%'") : (a[1] == " = " ? ("'" + a[2].downcase + "'") : (@models.columns_hash[a[0]].type == :date ? ("to_date('" + a[2] + "','YYYY-MM-DD')") : a[2]))) }.join(" AND ")
      logger.debug vals.map{|a| a.downcase.gsub("\\","\\\\").gsub(/%/,'\\%').gsub(/_/,'\\_')}
    end
    if params[:keyword].present?
      query
      @query = @query + (params[:complement].present? ? (" and " + params[:complement]) : "")
    else
      @query = (params[:complement].present? ? params[:complement] : "")
    end
    @rpp = 10
    @mod = (@models.class.to_s != "Array" ? @models : @models[0])
    @count = @mod.where(@filter_query).count
    @set = @mod.where(@filter_query).order(@sort_hash).limit(@rpp).offset(params[:offset].to_i*@rpp)

    @pags = (@count == 0 ? 0 : ((@count / @rpp) + (@count % @rpp == 0 ? 0 : 1) ))
    respond_to do |format|
      format.js
      #format.json {render json: {filas: @set} }
    end
  end

  def mostrar
		@obj = @sets[params[:set].to_sym][:model].find(params[:id].to_i)
    respond_to do |format|
      format.js
    end
  end

  def generar
    @obj = @sets[params[:set].to_sym][:model].new
    respond_to do |format|
      format.js
    end
  end

  def crear
    @obj = @sets[params[:set].to_sym][:model].new(obj_params)
	  @sets[params[:set].to_sym][:trix].each do |t|
      @obj[t] = (@obj[t].nil? ? "" : @obj[t].gsub(/<!-- block -->/,""))
    end
    respond_to do |format|
      if @obj.save
#        if @sets[params[:set].to_sym][:model] == Sitio
#          i = 0
#          while i < obj_params[:num_parrafos].to_i
#            @pf = Parrafo.new({sitio_id: @obj.id, p_ind: i})
#            @pf.save
#            i = i + 1
#          end
#          i = 0
#          while i < obj_params[:num_fotos].to_i
#            @pf = Foto.new({sitio_id: @obj.id, f_ind: i})
#            @pf.save
#            i = i + 1
#          end
#          i = 0
#          while i < obj_params[:num_listing].to_i
#            @pf = Listing.new({sitio_id: @obj.id, ord_index: i})
#            @pf.save
#            i = i + 1
#          end
#        end
        format.js { render :mostrar, params: {set: params[:set], id: @obj.id}, notice: 'Objeto generado exitosamente.' }
      else
        format.js { render :generar }
        format.json { render json: @obj.errors, status: :unprocessable_entity }
      end
    end
  end

  def editar
    if @sets[params[:set].to_sym][:model].class.to_s != "Array"
      @obj = @sets[params[:set].to_sym][:model].find(params[:id])
			@sets[params[:set].to_sym][:trix].each do |t|
        @obj[t] = (@obj[t].nil? ? "" : @obj[t].gsub(/<!-- block -->/,""))
      end
    elsif params[:set] == "Contenido de sitios"
      @obj = Sitio.find(params[:id])
      @pars = Parrafo.where("sitio_id = ?",params[:id].to_i)
      @pics = Foto.where("sitio_id = ?",params[:id].to_i)
      @pars.each do |p|
        p.texto = (p.texto.nil? ? "" : p.texto.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
        p.texto_ingles = (p.texto_ingles.nil? ? "" : p.texto_ingles.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
      end
      @pics.each do |p|
        p.caption = (p.caption.nil? ? "" : p.caption.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
        p.caption_ingles = (p.caption_ingles.nil? ? "" : p.caption_ingles.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
      end
    end
  end

  def actualizar
    @obj = @sets[params[:set].to_sym][:model].find(params[:id])
    if params[:set] != "Contenido de sitios"
      @sets[params[:set].to_sym][:trix].each do |t|
        obj_params[t] = obj_params[t].gsub(/<!-- block -->/,"")
      end
    end
    respond_to do |format|
      if params[:set] == "Contenido de sitios"
        if params[:pars].present?
          @llaves_pars = params[:pars].keys
          @vals_pars = params[:pars].values
          params[:pars].each_with_index do |p,i|
					  @vals_pars[i]["texto"] = (@vals_pars[i]["texto"].nil? ? (Parrafo.find(@llaves_pars[i].to_i).texto.nil? || Parrafo.find(@llaves_pars[i].to_i).texto == "" ? "" : Parrafo.find(@llaves_pars[i].to_i).texto) : @vals_pars[i]["texto"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
					  @vals_pars[i]["texto_ingles"] = (@vals_pars[i]["texto_ingles"].nil? ? (Parrafo.find(@llaves_pars[i].to_i).texto_ingles.nil? || Parrafo.find(@llaves_pars[i].to_i).texto_ingles == "" ? "" : Parrafo.find(@llaves_pars[i].to_i).texto_ingles) : @vals_pars[i]["texto_ingles"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
          Parrafo.find(@llaves_pars[i].to_i).update(par_params(ActionController::Parameters.new(@vals_pars[i])))
          end
        end
        if params[:pics].present?
          @llaves_pics = params[:pics].keys
          @vals_pics = params[:pics].values
          params[:pics].each_with_index do |p,i|
					  @vals_pics[i]["caption"] = (@vals_pics[i]["caption"].nil? ? (Foto.find(@llaves_pics[i].to_i).caption.nil? || Foto.find(@llaves_pics[i].to_i).caption == "" ? "" : Foto.find(@llaves_pics[i].to_i).caption) : @vals_pics[i]["caption"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
					  @vals_pics[i]["caption_ingles"] = (@vals_pics[i]["caption_ingles"].nil? ? (Foto.find(@llaves_pics[i].to_i).caption_ingles.nil? || Foto.find(@llaves_pics[i].to_i).caption_ingles == "" ? "" : Foto.find(@llaves_pics[i].to_i).caption_ingles) : @vals_pics[i]["caption_ingles"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
            Foto.find(@llaves_pics[i].to_i).update(pic_params(ActionController::Parameters.new(@vals_pics[i])))
          end
        end
        if params[:listings].present?
          @llaves_list = params[:listings].keys
          @vals_list = params[:listings].values
          params[:listings].each_with_index do |p,i|
            Listing.find(@llaves_list[i].to_i).update(list_params(ActionController::Parameters.new(@vals_list[i])))
          end
        end
        if params[:uri]
          format.html {redirect_to params[:uri]}
        else
          format.js { render :mostrar, params: {set: params[:set], id: params[:id]}, notice: 'Objeto generado exitosamente.' }
        end
      elsif @obj.update(obj_params)
#        if @sets[params[:set].to_sym][:model] == Sitio
#          @num_pars = Parrafo.where("sitio_id = ?", params[:id].to_i)
#          @num_fotos = Foto.where("sitio_id = ?", params[:id].to_i)
#          @num_listing = Listing.where("sitio_id = ?", params[:id].to_i)
#          if @num_pars.count < obj_params[:num_parrafos].to_i
#            k = 0
#            while k < obj_params[:num_parrafos].to_i
#              if Parrafo.where("sitio_id = ? and p_ind = ? ", params[:id].to_i, k).count == 0
#                @pf = Parrafo.new({sitio_id: params[:id].to_i, p_ind: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_pars.count > obj_params[:num_parrafos].to_i
#              @num_pars[-1].destroy
#            end
#          end
#
#          if @num_fotos.count < obj_params[:num_fotos].to_i
#            k = 0
#            while k < obj_params[:num_fotos].to_i
#              if Foto.where("sitio_id = ? and f_ind = ? ",params[:id].to_i, k).count == 0
#                @pf = Foto.new({sitio_id: params[:id].to_i, f_ind: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_fotos.count > obj_params[:num_fotos].to_i
#              @num_fotos[-1].destroy
#            end
#          end
#
#          if @num_listing.count < obj_params[:num_listing].to_i
#            k = 0
#            while k < obj_params[:num_listing].to_i
#              if Listing.where("sitio_id = ? and ord_index = ?",params[:id].to_i, k).count == 0
#                @pf = Listing.new({sitio_id: params[:id].to_i, ord_index: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_listing.count > obj_params[:num_listing].to_i
#              @num_listing[-1].destroy
#            end
#          end
#
#        end
        format.js { render :mostrar, params: {set: params[:set], id: @obj.id}, notice: 'Objeto generado exitosamente.' }
      else
        format.js { render :editar }
        format.json { render json: @obj.errors, status: :unprocessable_entity }
      end
    end
  end

  def eliminar
		@sets[params[:set].to_sym][:model].find(params[:id]).destroy
    if params[:set] == "Catálogo de sitios"
      Parrafo.where("sitio_id = ?", params[:id].to_i).destroy_all
      Foto.where("sitio_id = ?", params[:id].to_i).destroy_all
      Listing.where("sitio_id= ?",params[:id].to_i).destroy_all
    end
    @set = @sets[params[:set].to_sym][:model].order(updated_at: :desc).limit(@rpp).offset(0)
    @rpp = 10
    @count = @sets[params[:set].to_sym][:model].count
    @pags = (@count == 0 ? 0 : ((@count / @rpp) + (@count % @rpp == 0 ? 0 : 1) ))
		respond_to do |format|
      format.js { render :index, params: {set: params[:set]}, notice: 'Se ha eliminado el objeto exitosamente'}
		  format.json { head :no_content }
		end
  end

  private

  def query
    @query = "("
    keys = params[:keyword].split(/ +/).map {|k| " like '%" + k.downcase + "%'"}
    @fields.keys.each do |f|
      h = ""
      if ["anio"].include?(f.to_s)
        next
      end
      keys.each_with_index do |k,i|
        h =  h + f.to_s + k + (i == keys.size - 1 ? '' : ' AND ')
      end

      @query = @query + h + (f == @fields.keys[-1] ? ")" : " or ")
    end
  end

  def select_set
    @sets = {
      "Personal administrativo": {
        model: Personal,
        fields: {nombre: "Nombre", extension: "Extensión", correo: "Correo electrónico", area: "Área de trabajo", servicio: "Servicios"},
        imgs: {},
        trix: [],
        dates: [],
        numbers: [],
        p_text: [:nombre, :extension, :correo, :area],
        textarea: [:servicio],
        select: {area: [["Centro de Estudios Internacionales", "Centro de Estudios Internacionales"]]}
      }, "Programas académicos": {
        model: Programa,
        fields: {titulo: "Título", descripcion_es: "Descripción (español)", descripcion_en: "Descipición (inglés)", fecha_ic: "Fecha inicio de convocatoria", fecha_fc: "Fecha fin de convocatoria"},
        imgs: {},
        trix: [:descripcion_es, :descripcion_en],
        dates: [:fecha_ic, :fecha_fc],
        numbers: [],
        p_text: [:titulo],
        textarea: [],
        select: {}
      }, "Preguntas frecuentes": {
        model: Question,
        fields: {pregunta_es: "Pregunta (español)", pregunta_en: "Pregunta (inglés)", respuesta_es: "Respuesta (español)", respuesta_en: "Respuesta (inglés)", tipo: "Tipo", index: "Índice"},
        imgs: {},
        trix: [:pregunta_es, :pregunta_en, :respuesta_es, :respuesta_en],
        dates: [],
        numbers: [:index],
        p_text: [],
        textarea: [],
        select: {tipo: [["Licenciatura", "Licenciatura"],["Maestría","Maestría"]]}
      }, "Cursos": {
        model: Curso,
        fields: {titulo: "Título", liga: "Liga externa", imparte: "Impartido por", liga_imparte: "Liga de quien imparte", fecha_ic: "Inicio convocatoria", fecha_fc: "Fin convocatoria", fecha_i: "Fecha de inicio", fecha_f: "Fecha final", descripcion: "Descripción", descripcion_en: "Descripción (inglés)", tipo: "Tipo"},
        imgs: {imagen: "Imagen", documento: "Documento"},
        trix: [:titulo, :descripcion, :descripcion_en],
        dates: [:fecha_ic, :fecha_fc, :fecha_i, :fecha_f],
        numbers: [],
        p_text: [:liga, :imparte, :liga_imparte],
        textarea: [],
        select: {tipo: [["Verano","Verano"],["Público","Público"],["MOOC","MOOC"]]}
      }
    }
  end

  def get_object_fields
    @fields = (@sets[params[:set].to_sym][:fields].class.to_s != "Array" ? @sets[params[:set].to_sym][:fields] : @sets[params[:set].to_sym][:fields][0] )
    @imgs = (@sets[params[:set].to_sym][:imgs].class.to_s != "Array" ? @sets[params[:set].to_sym][:imgs] : @sets[params[:set].to_sym][:imgs][0])
    @models = @sets[params[:set].to_sym][:model]
    @dates = @sets[params[:set].to_sym][:dates]
    @trix = @sets[params[:set].to_sym][:trix]
    @numbers = @sets[params[:set].to_sym][:numbers]
    @plains = @sets[params[:set].to_sym][:p_text]
    @textareas = @sets[params[:set].to_sym][:textarea]
    @selects = @sets[params[:set].to_sym][:select]
  end

  def par_params(pars)
    pars.permit(:ref, :texto, :texto_ingles, :p_ind)
  end

  def pic_params(pics)
    pics.permit(:ref, :foto, :f_ind, :caption, :caption_ingles)
  end

  def list_params(lists)
    lists.permit(:ord_index, :list_id, :sitio_id)
  end

  def obj_params
    campos = @fields.keys + @imgs.keys + @imgs.keys.map {|k| (k.to_s + "_del").to_sym}
    params.require(@models.to_s.downcase.to_sym).permit(campos)
    #if params[:set] == "Personal administrativo"
    #  params.require(:personal).permit(:nombre, :extension, :correo, :area, :servicio)
    #elsif params[:set] == "Programas académicos"
    #  params.require(:programa).permit(:titulo, :descripcion_es, :descripcion_en, :fecha_ic, :fecha_fc)
    #elsif params[:set] == "Preguntas frecuentes"
    #  params.require(:question).permit(:pregunta_es, :pregunta_en, :respuesta_es, :respuesta_en, :index, :tipo)
    #elsif params[:set] == "Cursos"
    #  params.require(:curso).permit(:titulo, :imparte, :documento, :liga, :tipo, :liga_imparte, :fecha_i, :fecha_f, :fecha_ic, :fecha_fc, :descripcion, :descripcion_en, :imagen, :imagen_del, :documento_del)
    #end
  end
end
