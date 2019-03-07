class InformacionGeneralController < ApplicationController

  def sobre
  end

  def contacto
  end

  #POST "enviar"
  def enviar_mail
    respond_to do |format|
      CorreosMailer.contacto_mail(params[:nombre], params[:correo], params[:cuerpo], params[:asunto]).deliver_now
      flash[:notice] = t('.sent')
      format.html { redirect_to contacto_path }
    end
  end
end
