var FormControls = {
    init: function() {

     $("#req_form").validate({
      ignore: "input[type='text']:hidden",
      rules: {
        uname: {
        required: !0,
        },
        description: {
        required: !0,
        },
       duration: {
        required: !0,
        },
       accessPermission: {
        required: !0,
       },
       item: {
        required: !0
       },
       quantity: {
        required: !0,
        number: !0,
       },
       ProjectLead: {
        required: !0
       },
      },
     
      invalidHandler: function(e, r) {

        // mApp.scrollTo("#m_form_3"), swal({
        //     title: "",
        //     text: "There are some errors in your submission. Please correct them.",
        //     type: "error",
        //     confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
        //    })
      },
      submitHandler: function(e)
      {
        
        //  $("#m_datepicker_2").on("change",function (e) {
        // $('#m_form_2').bootstrapValidator('revalidateField', 'm_datepicker_2');
        //  });
      }
     })
    }
   };
   jQuery(document).ready(function() {
    FormControls.init()
   });