class DirectorioController < ApplicationController

  def personal
    @titulo = (request.fullpath.include?("academico") ? "academico" : "administrativo")
    @t_a = (request.fullpath.include?("academico") ? "temas" : "area")
    @p_s = (request.fullpath.include?("academico") ? "publicaciones" : "servicios")
    logger.debug request.GET
    respond_to do |format|
      format.html
      format.js
    end
  end

end
