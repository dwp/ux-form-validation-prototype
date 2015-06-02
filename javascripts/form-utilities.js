var formUtilities = {};

// given a form object, iterate through inputs and return JSON object of values
formUtilities.formToJSON = function ( formRef )
{
  'use strict';

  var form = {};
  $(formRef).find(':input[name]:enabled').each( function() {
    var self = $(this);
    var name = self.attr('name');

    switch (self.attr('type'))
    {
      case 'radio':
        // only save selected radio buttons - parent element will have a 'selected' class
        if(self.parent().hasClass('selected'))
        {
          form[name] = self.val();
        }
        break;
      default:
        if (form[name]) {
          form[name] = form[name] + ',' + self.val();
        }
        else {
           form[name] = self.val();
        }
      }
  });

  return form;
};


// post the data to the server
// expects data as a JSON object
formUtilities.postData =  function (formData, destURL, callbackSuccess, callbackFailure)
{
  'use strict';

  var postRequest = $.ajax({
    type: "POST",
    url: destURL,
    dataType : "text",
    data: formData,
    crossDomain : true
  });

  postRequest.done(function(data)
  {
    if (typeof callbackSuccess === "function") {
      callbackSuccess();
    }
  });

  postRequest.fail(function(jqXHR, textStatus)
  {
    if (typeof callbackFailure === "function") {
      callbackFailure(jqXHR,textStatus);
    }
  });

  /*$.ajax({
      type: "POST",
      url: destURL,
      data: formData,
      success: function(data){
          if(data.success === true)
          {
              $('#wait').hide();
              console.log('data posted to server');
              document.location.href = successDest;
          }
      },
      error: function(resp){
          $('#wait').hide();
          console.log('could not post to server');
          $('#form-error-message').show();
          //console.log(resp);
      }
  });*/
};



