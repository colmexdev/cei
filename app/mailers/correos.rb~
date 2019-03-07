class CorreosMailer < ActionMailer::Base
  default to: 'etenorio@colmex.mx'

  def contacto_mail(nombre,correo,cuerpo)
    @nombre = nombre
    @correo = correo
    @cuerpo = cuerpo
    mail(from: @correo, subject: 'Duda o comentario')
  end
end
