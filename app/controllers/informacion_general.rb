class InformacionGeneralController < ApplicationController

  def sobre
  end

  def contacto
  end

  #POST "enviar"
  def enviar_mail
    respond_to do |format|
      CorreosMailer.with(nombre: params[:nombre], correo: params[:correo], cuerpo: params[:cuerpo]).contacto_mail.send_later
      flash[:notice] = "Correo enviado. Se atenderá a la brevedad."
      format.html { redirect_to contacto_path }
    end
  end
end
