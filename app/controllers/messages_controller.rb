class MessagesController < ApplicationController
  before_action :detect_device_format

  def index
  end

  private

    def detect_device_format
      # TODO: Say it doesn't work with Firefox
    end
end