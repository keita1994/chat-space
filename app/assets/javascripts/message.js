$(function() {
  function buildHTML(message) {
    var image = message.image.present? `<img class="lower-message__image" src="${message.imag}">}` : "";
    var html =`
      <div class = "main-content__message-history__message-box">
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
      $('.main-content__message-submit-box__send').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    })
  })
});

