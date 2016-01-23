class PagesController < ApplicationController
  def client_side_hello_world
    ReactWebpackRails::NodeRenderer.new('',{}).reset
    @name = 'username'
  end
end
