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
        `<div class="chat-main__message-list__margin" data-message-id=${message.id}></div>
           <div class="chat-main__message-list__margin">
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
          </div>
        </div>`
      return html;
    };
  }


  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得 ブラウザーの一番下に表示されているメッセージのIDを取得する。
    let last_message_id = $('.chat-main__message-list__margin:last').data("message-id") || 0;//chat-main__message-list__margin:last'の親要素の一番最後にmessage-idを
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url:  "api/messages",
      type:  'get',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      dataType:  'json',
      data:  {id: last_message_id}//上で取得した最新のメッセージIDをコントローラーにkye:idで送る
      //dataオプションでリクエストに値を含める
    })
    .done(function(messages) {
      if (messages.length !==0) {
        // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
        let insertHTML = '';
        //追加するHTMLの入れ物を作る
        $.each(messages, function(i, message) {
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML += buildHTML(message)//上で定義されているメソッド、一度上へ
        });
        $('.chat-main__message-list').append(insertHTML);//HTMLの情報を入れて返ってくる、そのデータを一番したへ追加
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').animate({ scrolltop: $('.chat-main__message-list')[0].scrolHeight});//cssは？
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);//7秒で？リロード？
});