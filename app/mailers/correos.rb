class CorreosMailer < ActionMailer::Base
  default to: 'direccion.cei@colmex.mx'

  def contacto_mail(nombre,correo,cuerpo,asunto)
    @nombre = nombre
    @correo = correo
    @cuerpo = cuerpo
    @asunto = asunto
    email_with_name = %("#{@nombre}" <#{@correo}>)
    mail(from: email_with_name, nombre: @nombre, subject: @asunto)
  end
end
