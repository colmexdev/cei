class PrincipalController < ApplicationController

  def index
    @fi = HTTParty.get('https://forointernacional.colmex.mx/index.php/fi', verify: false)
    @img_foro = Nokogiri::HTML(@fi).at("#homepageImage img").attr("src")
    @agora = HTTParty.get('https://agora.colmex.mx/', verify: false)
    @img_agora = "https://agora.colmex.mx" + Nokogiri::HTML(@agora).at('img[alt="DISPONIBLE AHORA"]').attr("src")
    @rutas = `rake routes`
    logger.debug @rutas.class
  end

end
