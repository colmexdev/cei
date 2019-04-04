class PrincipalController < ApplicationController

  def index
		@link_foro = 'https://forointernacional.colmex.mx/index.php/fi'
    @link_agora = 'https://agora.colmex.mx/'
    @fi = HTTParty.get(@link_foro, verify: false)
    @img_foro = Nokogiri::HTML(@fi).at("#homepageImage img").attr("src")
    @agora = HTTParty.get(@link_agora, verify: false)
    @img_agora = @link_agora[0..-2] + Nokogiri::HTML(@agora).at('img[alt="DISPONIBLE AHORA"]').attr("src")
    @rutas = `rake routes`.gsub(/\s+/,' ').strip.split(' ')
    logger.debug @rutas
  end

end
