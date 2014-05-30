class ChatsController < ApplicationController
  def show
    @chat = Chat.find_by(id: params[:id])
    if !@chat
      redirect_to root_path
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