var DropzoneDemo = {
    init: function () {
        Dropzone.options.mDropzoneOne = {
            paramName: "file",
            maxFiles: 1,
            maxFilesize: 5,
            addRemoveLinks: !0,
            accept: function (e, o) {
                "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
            }
        }, Dropzone.options.mDropzoneTwo = {
            paramName: "file",
            maxFiles: 10,
            maxFilesize: 10,
            addRemoveLinks: !0,
            accept: function (e, o) {
                "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
            }
        },
            Dropzone.options.mDropzoneThree = {
                paramName: "file",
                maxFiles: 10,
                maxFilesize: 5,
                addRemoveLinks: !0,
                acceptedFiles: "image/*,.pdf,.psd",
                rules: {
                },
                init: function () {
                    this.on("error", function (file, message) {
                        swal({
                            title: "",
                            text: message,
                            type: "error",
                            confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
                        });
                        this.removeFile(file);
                    });
                    this.on("removedfile", function (file, message) {
                      $("#fileupload").val('');  
                    });
                },
                accept: function (e, o) {


                    "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
                },
                
                success: function (file, response) {
                    if (response != "") {
                        $("#fileupload").val(response['fileName']);
                        $("#uploadresumeDiv").removeClass('has-danger');
                        $("#fileupload-error").remove();
                    } else {
                        toastr["danger"]("File is not valid. Please try Again");
                    }
                }
            }
            Dropzone.options.mDropzoneFour = {
                paramName: "file",
                maxFiles: 10,
                maxFilesize: 5,
                addRemoveLinks: !0,
                acceptedFiles: "image/*",
                rules: {
                },
                init: function () {
                    this.on("error", function (file, message) {
                        swal({
                            title: "",
                            text: message,
                            type: "error",
                            confirmButtonClass: "btn btn-secondary m-btn m-btn--wide"
                        });
                        this.removeFile(file);
                    });
                    this.on("removedfile", function (file, message) {
                      $("#photoupload").val('');
                    });
                },
                accept: function (e, o) {


                    "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
                },
                
                success: function (file, response) {
                    if (response != "") {
                        $("#photoupload").val(response['fileName']);
                        $("#uploadphotoDiv").removeClass('has-danger');
                        $("#photoupload-error").remove();
                    } else {
                        toastr["danger"]("File is not valid. Please try Again");
                    }
                }
            }
    }
};
DropzoneDemo.init();