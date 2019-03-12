class DirectorioController < ApplicationController

  def personal
    @titulo = (request.fullpath.include?("academico") ? "academico" : "administrativo")
    @t_a = (request.fullpath.include?("academico") ? "temas" : "area")
    @p_s = (request.fullpath.include?("academico") ? "publicaciones" : "servicios")
    @personas = (request.fullpath.include?("administrativo") ? Personal.order(nombre: :asc).limit(5).offset(params[:offset].to_i || 0) : nil)
    @total = (request.fullpath.include?("administrativo") ? Personal.count : (params[:total] || 0))
    respond_to do |format|
      format.html
      format.js
      format.json {render json: (@personas.nil? ? {total: @total} : {profs: @personas, total: @total, pags: (@total.to_f/5).ceil, offset: (params[:offset].to_i || 0)})}
    end
  end

end
