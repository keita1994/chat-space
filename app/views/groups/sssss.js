$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendMemberList(member){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${member.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${member.id}" data-user-name="${member.user_name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendMember(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }


  $('#user-search-field').on('keyup', function(){
    const url = "/users/"
    var input = $('#user-search-field').val();
    $.ajax({
      url: url,
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(members) {
      $("#user-search-result").empty();
      if (members.length !== 0) {
        members.forEach(function(member){
        appendMemberList(member);
      });
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })

  $("#user-search-result").on('click', $(".chat-group-user__btn--add"), function() {
    var userId = $('.user-search-add').data('userId');
    var userName = $('.user-search-add').data('userName');
    $(this).remove();
    appendMember(userId, userName);
  })
  $("#chat-group-users").on('click', $(".chat-group-user__btn--remove") ,function() {
    $("#chat-group-user-8").remove();
  })

});
