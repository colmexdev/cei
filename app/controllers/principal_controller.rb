class PrincipalController < ApplicationController

  def index
    @fi = HTTParty.get('https://forointernacional.colmex.mx/index.php/fi', verify: false)
    @img_foro = Nokogiri::HTML(@fi).search("#homepageImage").children.attribute("src").value
    @agora = HTTParty.get('https://agora.colmex.mx/', verify: false)
    @img_agora = "https://agora.colmex.mx" + Nokogiri::HTML(@agora).at('img[alt="DISPONIBLE AHORA"]').attribute("src").value
  end

end
