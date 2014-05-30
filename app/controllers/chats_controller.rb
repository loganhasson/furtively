class ChatsController < ApplicationController
  def show
    @chat = Chat.find_by(uuid: params[:id])
    respond_to do |format|
      if !@chat
        format.js { render 'invalid_chat'}
      else
        format.js
      end
    end
  end

  def new
    @chat = Chat.new
    begin
      uuid = SecureRandom.hex(5)
      @chat.uuid = uuid
    end while Chat.exists?(uuid: uuid)
    @chat.save

    respond_to do |format|
      format.json
    end
  end
end