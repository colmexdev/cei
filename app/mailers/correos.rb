class CorreosMailer < ActionMailer::Base
  default to: 'tenoriole1993@gmail.com'

  def contacto_mail(nombre,correo,cuerpo)
    @nombre = nombre
    @correo = correo
    @asunto = cuerpo
    mail(from: @correo, subject: 'Duda o comentario')
  end
end
