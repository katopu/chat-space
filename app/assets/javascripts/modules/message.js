$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list__margin" data-message-id=${message.id}>
          <div class="chat-main__message-list__margin__top-content">
            <div class="chat-main__message-list__margin__top-content__users-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__margin__top-content__post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__margin__second-content">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;

    } else {
      let html =
        `<div class="chat-main__message-list__margin" data-message-id=${message.id}>
          <div class="chat-main__message-list__margin__top-content">
            <div class="chat-main__message-list__margin__top-content__users-name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__margin__top-content__post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__margin__second-content">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.form-box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.send').attr('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
      $('.send').attr('disabled', false)
    });
  });
});