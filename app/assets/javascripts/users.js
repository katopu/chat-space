$(function() {
  function addUser(user) {
    let html = `
                  <div class="ChatMember clearfix">
                    <p class="ChatMember__name">${user.name}</p>
                    <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`;
    $("#UserSearchResult").append(html);
      console.log(html)
  }
  function addNoUser() {
    let html = `
                  <div class="ChatMember clearfix">
                    <p class="ChatMember__name">ユーザーが見つかりません</p>
                  </div>`;
    $("#UserSearchResult").append(html);
  }

  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type:  "GET",
      url:  "/users", //どこをみた？
      data:  { keyword: input },//inputわ上で定義した関数、意味は分かる、どうしてこうなる？もう一度確認
      dataType:  "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    // const userName = $(this).attr("data-user-name");
    const userName = $(this).data('user-name');//data,カスタムデータ属性を取得するメソッド
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });
  
  $(".ChatMembers").on("click", "chatMember__remove", function() {
    $(this).parent().remove();
  });
});
