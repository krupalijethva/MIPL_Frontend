var FormControls = {
    init: function() {

     $("#m_form_1").validate({
        ignore: "input[type='text']:hidden",
      rules: {
       email: {
        required: !0,
        email: !0,
        minlength: 10
       },
       url: {
        required: !0
       },
       digits: {
        required: !0,
        digits: !0
       },
       creditcard: {
        required: !0,
        creditcard: !0
       },
       phone: {
        required: !0,
        phoneUS: !0
       },
       option: {
        required: !0
       },
       fromdate: {
        required: !0,
        date: !0
       },
       todate: {
        required: !0,
        date: !0
       },
       fromdatetime: {
        required: !0,
       
       },
       todatetime: {
        required: !0,
        date: !0
       },
       
       duration: {
        required: !0
       },
       GeneralLeave: {
        required: !0
       },
       ProjectLead: {
        required: !0
       },
       options: {
        required: !0,
        minlength: 2,
        maxlength: 4
       },
       memo: {
        required: !0,
        minlength: 10,
        maxlength: 100
       },
       checkbox: {
        required: !0
       },
       checkboxes: {
        required: !0,
        minlength: 1,
        maxlength: 2
       },
       radio: {
        required: !0
       }
      },
     
      invalidHandler: function(e, r) {
       var i = $("#m_form_1_msg");
       i.removeClass("m--hide").show(), mApp.scrollTo(i, -200)
      },
      submitHandler: function(e) {

       

      }
     }), 

     $("#m_form_2").validate({
      ignore: "input[type='text']:hidden",
      rules: {
       fromdate: {
        required: !0,
        date: !0
       },
       todate: {
        required: !0,
        date: !0
       },
       fromdatetime: {
        required: !0,
        // date: !0
       },
       todatetime: {
        required: !0,
        // date: !0
       },

       duration: {
        required: !0
       },
       GeneralLeave: {
        required: !0
       },
       ProjectLead: {
        required: !0
       },
       
      //  options: {
      //   required: !0,
      //   minlength: 2,
      //   maxlength: 4
      //  },
      //  memo: {
      //   required: !0,
      //   minlength: 10,
      //   maxlength: 100
      //  },
      //  checkbox: {
      //   required: !0
      //  },
      //  checkboxes: {
      //   required: !0,
      //   minlength: 1,
      //   maxlength: 2
      //  },
      //  radio: {
      //   required: !0
      //  }

      
      },
     
       
   
      invalidHandler: function(e, r) {

      //   $( "#m_datepicker_2" ).change(function() {
      //     $(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('fromdate'));
      // });
        // $('#m_form_2').formValidation('revalidateField', 'm_datepicker_2');
      },
      submitHandler: function(e)
      {
        
        //  $("#m_datepicker_2").on("change",function (e) {
        // $('#m_form_2').bootstrapValidator('revalidateField', 'm_datepicker_2');
        //  });
      }
     }), 

     $("#m_form_3").validate({
      rules: {
       billing_card_name: {
        required: !0
       },
       billing_card_number: {
        required: !0,
        creditcard: !0
       },
       billing_card_exp_month: {
        required: !0
       },
       billing_card_exp_year: {
        required: !0
       },
       billing_card_cvv: {
        required: !0,
        minlength: 2,
        maxlength: 3
       },
       billing_address_1: {
        required: !0
       },
       billing_address_2: {},
       billing_city: {
        required: !0
       },
       billing_state: {
        required: !0
       },
       billing_zip: {
        required: !0,
        number: !0
       },
       billing_delivery: {
        required: !0
       }
      },
      invalidHandler: function(e, r) {
       mApp.scrollTo("#m_form_3"), swal({
        title: "",
        text: "There are some errors in your submission. Please correct them.",
        type: "error",
        confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
       })
      },
      submitHandler: function(e) {
       return swal({
        title: "",
        text: "Form validation passed. All good!",
        type: "success",
        confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
       }), !1
      }
     }),

     $("#editPunchForm").validate({
     
      rules: {
       
       teamlead: {
        required: !0
       },
       selectMonth: {
        required: !0
       },
       logoutTime:
       {
        required: !0
       }

      },
     
       
   
      invalidHandler: function(e, r) {

      //   $( "#m_datepicker_2" ).change(function() {
      //     $(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('fromdate'));
      // });
        // $('#m_form_2').formValidation('revalidateField', 'm_datepicker_2');
      },
      submitHandler: function(e)
      {
        
        //  $("#m_datepicker_2").on("change",function (e) {
        // $('#m_form_2').bootstrapValidator('revalidateField', 'm_datepicker_2');
        //  });
      }
     }),
     $("#newPunchForm").validate({
     
      rules: {
       
        teamlead:
        {
          required: !0
        },
       logoutTime:
       {
        required: !0
       },
       comments:
       {
        required: !0
       },
       loginTime:
       {
        required: !0
       },
       Date:
       {
        required: !0
       }


      },
     
       
   
      invalidHandler: function(e, r) {

      //   $( "#m_datepicker_2" ).change(function() {
      //     $(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('fromdate'));
      // });
        // $('#m_form_2').formValidation('revalidateField', 'm_datepicker_2');
      },
      submitHandler: function(e)
      {
        
        //  $("#m_datepicker_2").on("change",function (e) {
        // $('#m_form_2').bootstrapValidator('revalidateField', 'm_datepicker_2');
        //  });
      }
     }),
     $("#exitform").validate({
     
      rules: 
      {
       
        username:
        {
          required: !0
        },
        reason:
       {
        required: !0
       },
       applieddate:
       {
        required: !0
       }
      


      },
     
       
   
      invalidHandler: function(e, r) {

      //   $( "#m_datepicker_2" ).change(function() {
      //     $(this).closest('form').bootstrapValidator('revalidateField', $(this).prop('fromdate'));
      // });
        // $('#m_form_2').formValidation('revalidateField', 'm_datepicker_2');
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