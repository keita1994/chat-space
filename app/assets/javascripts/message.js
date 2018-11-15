  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var $form = $(this);
    formData = new FormData(this);

    $.ajax({
      url: './messages',
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
