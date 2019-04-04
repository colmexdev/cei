class RevistasController < ApplicationController

  def revista
		@link_foro = 'https://forointernacional.colmex.mx/index.php/fi'
    @link_agora = 'https://agora.colmex.mx/'
    @fi = HTTParty.get(@link_foro, verify: false)
    @img_foro = Nokogiri::HTML(@fi).at("#homepageImage img").attr("src")
    @agora = HTTParty.get(@link_agora, verify: false)
    @img_agora = @link_agora[0..-2] + Nokogiri::HTML(@agora).at('img[alt="DISPONIBLE AHORA"]').attr("src")
    @link = (request.fullpath.include?("agora") ? @link_agora : @link_foro)
		@imagen = (request.fullpath.include?("agora") ? @img_agora : @img_foro)
    @rev = (request.fullpath.include?("agora") ? "agora" : "foro")
    @rev_t = @rev + "_html"
  end
end
