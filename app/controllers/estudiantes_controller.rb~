class EstudiantesController < ApplicationController

  def estudiantes
  end

  #POST autenticar
  def autenticar
    @usr = params[:correo]
    @pwd = params[:pass]
    respond_to do |format|
      flash[:notice] = t('.auth')
      format.html {redirect_to estudiantes_path}
    end
  end

end
