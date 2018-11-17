$(function() {

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `
    <div class='chat-group-user clearfix' id='chat-group-user-22'>
      <input name='chat_group[${user.id}][]' type='hidden' value='22'>
      <p class='chat-group-user__name'>
        ${user.name}
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>
      追加
      </a>
    </div>
           `
    search_list.append(html);
}

function appendAddUser( user_id, user_name) {
  var html = `
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
      <p class='chat-group-user__name'>${user_name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  </div>
        `
  $("#chat-group-users").append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  })

  $("#user-search-result").on('click', ".chat-group-user__btn--add", function() {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    appendAddUser(userId, userName);
    $(this).parent().remove();
  })

  $("#chat-group-users").on("click", '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  })
})



