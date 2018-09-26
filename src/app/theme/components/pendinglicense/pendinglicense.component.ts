import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-pendinglicense',
  templateUrl: './pendinglicense.component.html',
  styleUrls: ['./pendinglicense.component.css']
})
export class PendinglicenseComponent implements OnInit {

  t;
  constructor(private _script: ScriptLoaderService,private router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() 
  {
    this.DatatableChildRemoteDataDemo ();
  }
    DatatableChildRemoteDataDemo ()
  {
     this.t=$("#pendingLicense_data").mDatatable({
      data: {
       type: "remote",
       source: {
        read: {
         url: "http://localhost:8080/getPendingLicenseDetails"
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
       title: "First Name",
       sortable: "asc"
      }, 
      {
        field: "firstname",
        title: "First Name",
        sortable: "asc"
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
       title: "Actions",
       sortable: !1,
       overflow: "visible",
       template: function(t, e, a) {
        return '\t\t\t\t\t\t<div >\t\t\t\t\t\t\t<button id='+t.idLicenseDetail+' class="generatelicense btn m-btn--pill    btn-outline-primary">General License Key</button>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
       }
      }]
     })
     var self = this;
    this.t.on('m-datatable--on-layout-updated', function ()
     {
      $('.generatelicense').click(function (e) {      
        self.router.navigate(['','index','generateLicenseById',e.target.id]);
      });
   });


   };
}
