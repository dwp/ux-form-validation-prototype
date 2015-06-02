  // scripts and functions specifically for this form

  // do not erase - helper for JSLint
  /*jslint formUtilities: true */

  
  // attach parsley to form for validation
  var parsleyForm = $('#form-main').parsley({
    excluded: 'input[type=button], input[type=submit], input[type=reset], :hidden'
  });

  function validateForm(formObject)
  {
    return formObject.validate();
  }


  // validate and send if no problems
  function submitForm()
  {
    'use strict';

    $('#form-error-message').hide();

    if (validateForm(parsleyForm))
    {
      // form is valid - submitting

      // get the data from the form as a JSON object
      var formData = JSON.stringify(formUtilities.formToJSON($("form")));

      //console.log(formData);

      // should be called if the form submit was a success
      var callbackSuccess = function(){
        //console.log("callBackSuccess called");
        $('#wait').hide();
        window.location.href = 'form-end.html';
      };

      // should be called if the form submit was a failure
      var callbackFailure = function(jqXHR,textStatus){
        $('#wait').hide();
        $('#form-error-message').show();
        //console.log("callBackFailure called");
        console.log(jqXHR);
        console.log(textStatus);
      };

      $('#wait').show();
      

      // post the data to the server
      formUtilities.postData(formData,"http://10.168.0.1:9013/controller",callbackSuccess,callbackFailure);

    } else {
      //console.log("form is not valid - no submission");

    }
  }