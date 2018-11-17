$(function() {
  function buildHTML(message) {
    var image = message.image.present? `<img class="lower-message__image" src="${message.imag}">}` : "";
    var html =`
      <div class = "main-content__message-history__message-box", message-id= ${message.id} >
        <ul class="upper-message">
          <li class="name">
            ${message.name}
          </li>
          <li class="created_at">
            ${message.created_at}
          </li>
        <div class="lower-message__content">
          <p>${message.content}</p>
          <div>${image}</div>
        </div>
      </div>
      `

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var href = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-content__message-history').append(html)
      $('#message_content').val('')
      $('.main-content__message-history').animate({scrollTop: $('.main-content__message-history')[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.main-content__message-submit-box__send').prop('disabled', false);
    })
  })

// メッセージ自動更新機能
  var interval = setInterval(update, 5000);

  function update(){
    var messageId = $('.main-content__message-history__message-box').last().attr('message-id')
    var url = window.location.href
    console.log(messageId)

    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

      $.ajax ({
        url: url,
        type: 'GET',
        data: {id : messageId},
        dataType: 'json',
      })

      .done(function(update_messages) {
        var insertHTML = '';
        update_messages.forEach(function(update_message){
          if ( update_message.id > messageId)
            insertHTML += buildHTML(update_message)
            $('.main-content__message-history').append(insertHTML)
            $('.main-content__message-history').animate({scrollTop: $('.main-content__message-history')[0].scrollHeight},'fast');
        });
      })

      .fail(function(json){
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(interval);
    }
  }
});

