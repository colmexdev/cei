class InformacionGeneralController < ApplicationController

  def sobre
  end

  def contacto
  end

  #POST "enviar"
  def enviar_mail
    respond_to do |format|
      CorreosMailer.contacto_mail(params[:nombre], params[:correo], params[:cuerpo]).send_later
      flash[:notice] = "Correo enviado. Se atenderá a la brevedad."
      format.html { redirect_to contacto_path }
    end
  end
end
