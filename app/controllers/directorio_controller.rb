class DirectorioController < ApplicationController

  def personal
    @titulo = (request.fullpath.include?("academico") ? "academico" : "administrativo")
    @t_a = (request.fullpath.include?("academico") ? "temas" : "area")
    @p_s = (request.fullpath.include?("academico") ? "publicaciones" : "servicios")
    respond_to do |format|
      format.html
      format.js
      format.json {render json: {total: params[:total] || 0}}
    end
  end

end
