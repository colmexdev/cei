class CorreosMailer < ActionMailer::Base

  def contacto_mail(nombre,correo,cuerpo)
    @nombre = nombre
    @correo = correo
    @cuerpo = cuerpo
    mail(from: 'etenorio@colmex.mx', to: @correo, subject: 'Duda o comentario')
  end
end
