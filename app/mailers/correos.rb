class CorreosMailer < ActionMailer::Base
  default to: 'tenoriole1993@gmail.com'

  def contacto_mail
    @nombre = params[:nombre]
    @correo = params[:correo]
    @asunto = params[:cuerpo]
    mail(from: @correo, subject: 'Duda o comentario')
  end
end
