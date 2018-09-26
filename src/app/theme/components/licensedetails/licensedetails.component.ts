import { Component, OnInit } from '@angular/core';
import { LicenseserviceService } from '../../../_services/licenseservice.service';
declare let $: any;
declare var moment: any;
declare var swal: any;
@Component({
  selector: 'app-licensedetails',
  templateUrl: './licensedetails.component.html',
  styleUrls: ['./licensedetails.component.css']
})
export class LicensedetailsComponent implements OnInit {

  t;
  constructor(private licenseService:LicenseserviceService) { }

  ngOnInit() {

    this.DatatableChildRemoteDataDemo();

  }

  confirmDelete(id)
  {
    var self=this;
    swal({
      text: "Are you sure you want to Delete?",
      icon: "success",
      confirmButtonText: "<span>YES</span>",
      confirmButtonClass: "yes btn btn-focus m-btn m-btn--pill m-btn--air m-btn--icon  deletebtn",
      showCancelButton: !0,
      cancelButtonText: "<span>No,thanks</span>",
      cancelButtonClass: "btn btn-secondary m-btn m-btn--pill m-btn--icon"
    }).then(function (e) {
    if (e.value == true) {
      self.deleteLicense(id);
    } else {
    }
    });
  }

  deleteLicense(id)
  {
    this.licenseService.deleteLicense(id).subscribe(()=>{alert("data is deleted successfully"),this.t.reload();});
  }

  DatatableChildRemoteDataDemo ()
  {
    this.t=$("#allLicense_data").mDatatable({
     data: {
      type: "remote",
      source: {
       read: {
        url: "http://localhost:8080/getAllLicenseDetails"
       }
      },
      pageSize: 10,
      serverPaging: !0,
      serverFiltering: !1,
      serverSorting: !0
     },
     layout: {
      theme: "default",
      scroll: !1,
      height: null,
      footer: !1
     },
     sortable: !0,
     pagination: !0,
     detail: {
      title: "Load sub table",
      content: function(t) {
        console.log(t);
       $("<div/>").attr("id", "child_data_ajax_" + t.data.idLicenseDetail).appendTo(t.detailCell).mDatatable({
        data: {
         type: "remote",
         source: {
          read: {
           url: "http://localhost:8080/getDetailsForChild?licenseID="+t.data.idLicenseDetail,
           headers: {
            "x-my-custom-header": "some value",
            "x-test-header": "the value"
           },
           params: {
            query: {
             generalSearch: "",
             CustomerID: t.data.idLicenseDetail
            }
           }
          }
         },
         pageSize: 10,
         serverPaging: !0,
         serverFiltering: !1,
         serverSorting: !0
        },
        layout: {
         theme: "default",
         scroll: !0,
         height: 300,
         footer: !1,
         spinner: {
          type: 1,
          theme: "default"
         }
        },
        sortable: !0,
        columns: [
        {
         field: "quantity",
         title: "Quantity",
         width: 100
        }, 
        {
         field: "country",
         title: "Country"
        }, 
        {
          field: "licensedate",
          title: "License Date",
          template: function (t)
          {
            if(t.downloaddate != null)
            {
              var date=new Date(t.downloaddate);
              var formatteddatestr = moment(date).format('DD-MMM-YYYY');
              return formatteddatestr;
            }
            else
            {
              return " ";
            }
          } 
        },
        {
          field: "validtilldate",
          title: "Validity Date",
          template: function (t)
          {
            if(t.downloaddate != null)
            {
              var date=new Date(t.downloaddate);
              var formatteddatestr = moment(date).format('DD-MMM-YYYY');
              return formatteddatestr;
            }
            else
            {
              return " ";
            }
          } 
        },
        {
         field: "os",
         title: "OS"
        }, 
        {
         field: "language",
         title: "Language"
        },
        {
         field: "contactno",
         title: "Contact No"
        },
        {
         field: "address",
         title: "Address"
        },
        {
         field: "remarks",
         title: "Remarks"
        },
        {
         field: "registrationkey",
         title: "Registration Key"
        },
        {
          field: "licensekey",
          title: "License Key"
         },
        {
         field: "internal",
         title: "Internal"
        }]
       })
      }
     },
     search: {
      input: $("#generalSearch")
     },
     columns: [
     {
      field: "idLicenseDetail",
      title: "",
      sortable: !1,
      width: 20,
      textAlign: "center"
     }, 
   
     {
      field: "company",
      title: "Company Name"
     }, 
     {
       field: "firstname",
       title: "First Name"
      }, 
     {
      field: "lastname",
      title: "Last Name",
      template:function(t)
      {
       console.log(t);
      }
     }, 
     {
      field: "email",
      title: "Email"
     },
     {
       field: "downloaddate",
       title: "Download Date",
       template: function (t)
       {
         if(t.downloaddate != null)
         {
           var date=new Date(t.downloaddate);
           var formatteddatestr = moment(date).format('DD-MMM-YYYY');
           return formatteddatestr;
         }
         else
         {
           return " ";
         }
       } 
     },
     {
       field: "application",
       title: "Application"
     },
     {
      field: "Actions",
      width: 110,
      title: "Actions",
      sortable: !1,
      overflow: "visible",
      template: function(t, e, a) {
        return '\t\t\t\t\t\t<div >\t\t\t\t\t\t\t<button id='+t.idLicenseDetail+' class="delete btn m-btn--pill    btn-outline-primary">Delete</button>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
      }
     }]
    })
    var self = this;
     $("#m_form_status").on("change", function()
    {
     self.t.search($(this).val(), "punchStatus")
    }), $("#m_form_status").selectpicker()
   
    this.t.on('m-datatable--on-layout-updated', function ()
     {
      $('.delete').click(function () {      
         self.confirmDelete(this.id);
      });
   });


  
  };


}
