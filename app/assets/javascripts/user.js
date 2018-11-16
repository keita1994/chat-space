$(function() {

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `
    <div class='chat-group-user clearfix' id='chat-group-user-22'>
      <input name='chat_group[${user.id}][]' type='hidden' value='22'>
      <p class='chat-group-user__name'>
        ${user.name}
      </p>
    </div>
           `
    search_list.append(html);
}

function appendNoUser(user) {
  var html = `
    <div class='chat-group-user clearfix' id='chat-group-user-22'>
      ${ user }
    </div>
        `
    search_list.append(html);
}

   $("#user-search-field").on("keyup", function() {
     var input = $(this).val();
     console.log(input);

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
        })
      }
      else {
        appendNoUser("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  })
})
