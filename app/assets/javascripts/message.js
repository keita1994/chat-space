$(function() {
  function buildHTML(message) {
    var imgge = message.image? `<img class="lower-message__image" src="${message.imag}">}` : "";
    var html =
      `<ul class="upper-message">
        <li class="name">
          ${message.name}
        </li>
        <li class="created_at">
          ${message.created_at}
        </li>
      <div class="lower-message__content">
        <p>${message.content}</p>
        <div>${message.image}</div>
      </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: './messages',
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-content__message-history__message-box').append(html)
      $('#new_message').val('')
      $('.main-content__message-history').animate({scrollTop: $('.main-content__message-history')[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    })
  })
});

