var WizardDemo = function() {
    $("#m_wizard");
    var e, r, i = $("#m_form");
    return {
     init: function() {
      var n;
      $("#m_wizard"), i = $("#m_form"), (r = new mWizard("m_wizard", {
       startStep: 1
      })).on("beforeNext", function(r) {
       !0 !== e.form() && r.stop()
      }), r.on("change", function(e) {
       mApp.scrollTop()
      }), e = i.validate({
       ignore: ":hidden:not(.validate)",
       rules: {
            applied:
            {
                required: !0
            },
            filename:
            {
                required: !0
            },
            photo:
            {
                required: !0
            },
          
            qualifiaction:
            {
                required: !0
            },
            branch:{
                required: !0
            },
            presentpcode:
            {
                required: !0,
                number: !0
            },
            perpcode:
            {
                required: !0,
                number: !0
            },
            school:
            {
                required: !0
            },
            university:
            {
                required: !0
            },
            percpi:
            {
                required: !0,
                number: !0

            },
            fname:{
                required: !0
            },
            surname:{
                required: !0
            },
            email: {
                required: !0,
                email: !0
            },
            gender:{
                required: !0,
            },
            DOB:
            {
                required: !0,
            },
            contact:
            {
                required: !0,
            },
            addresspresent:{
                required: !0, 
            },
            presentcity:{
                required: !0, 
            },
            statelist:{
                required: !0, 
            },
            countrylist:{
                required: !0, 
            },
            state:{
                required: !0, 
            },
            country:{
                required: !0, 
            },
            peradd:{
                required: !0, 
            },
            percity:{
                required: !0, 
            },
            ref1:{
                required:!0,
            },
            ref2:{
                required:!0,
            },
            topic:
            {
                required:!0,
            },
            institute:
            {
                required:!0,
            },
            lang:
            {
                required:!0,
            },
            speak:
            {
                required:!0,
            },
            read:
            {
                required:!0,
            },
            write:
            {
                required:!0,
            },
            compname:
            {
                required:!0,
            },
            designation:
            {
                required:!0,
            },
            duties:
            {
                required:!0,
            },
            softwarename:
            {
                required:!0,
            },
            proficiency:
            {
                required:!0,
            },
            accept:
            {
                required:!0,
            },

            //Employee Form
            eeid:
            {
                required:!0,
            },
            ealtcontact:
            {
                required:!0,
            },
            efname:
            {
                required:!0,
            },
            emname:
            {
                required:!0,
            },
            esurname:
            {
                required:!0,
            },
            eemail:
            {
                required:!0,
            },
            egender:
            {
                required:!0,
            },
            econtact:
            {
                required:!0,
            },
            ealtcontact:
            {
                required:!0,
            },
            eaddresspresent:
            {
                required:!0,
            },
            epresentcity:
            {
                required:!0,
            },
            epresentpcode:
            {
                required:!0,
            },
            estatelist:
            {
                required:!0,
            },
            ecountrylist:
            {
                required:!0,
            },
            eperadd:
            {
                required:!0,
            },
            epercity:
            {
                required:!0,
            },
            eperpcode:
            {
                required:!0,
            },
            estate:
            {
                required:!0,
            },
            ecountry:
            {
                required:!0,
            },
            eref1:
            {
                required:!0,
            },
            eref2:
            {
                required:!0,
            },
            panno:
            {
                required:!0,
                minlength: 10
            },
            drivingno:
            {
                minlength: 6,
                maxlength: 20
            },
            electionno:
            {
                minlength: 10,
            },
            passportno:
            {
                minlength: 6,
                maxlength: 12
            },
            adharno:
            {
                minlength: 12,
            },
            bloodgroup:
            {
                required:!0
            }

       },
       messages: {
        "account_communication[]": {
         required: "You must select at least one communication option"
        },
        accept: {
         required: "You must accept the Terms and Conditions agreement!"
        },
        filename:
        {
            required: "please upload resume"

        },
        photo:
        {
            required: "please upload photo"
        }
       },
       invalidHandler: function(e, r) {
        mApp.scrollTop(), swal({
         title: "",
         text: "There are some errors in your submission. Please correct them.",
         type: "error",
         confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
        })
       },
       submitHandler: function(e) {}
      }), (n = i.find('[data-wizard-action="submit"]')).on("click", function(r) {
       r.preventDefault(), e.form() && (mApp.progress(n), i.ajaxSubmit({
        success: function() {
         mApp.unprogress(n), swal({
          title: "",
          text: "The application has been successfully submitted!",
          type: "success",
          confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
         })
        }
       }))
      });
     
  
     }
    }
   }();
   jQuery(document).ready(function() {
    WizardDemo.init()
   });