class RevistasController < ApplicationController

  def revista
    @rev = (request.fullpath.include?("agora") ? "agora" : "foro")
    @rev_t = @rev + "_html"
  end
end
