class CorreosMailer < ActionMailer::Base
  default to: 'etenorio@colmex.mx'

  def contacto_mail(nombre,correo,cuerpo)
    @nombre = nombre
    @correo = correo
    @cuerpo = cuerpo
    @asunto = asunto
    email_with_name = %("#{@nombre}" <#{@correo}>)
    mail(from: email_with_name, nombre: @nombre, subject: @asunto)
  end
end
