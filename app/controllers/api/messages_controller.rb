class Api::Messagescontroller < applicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end