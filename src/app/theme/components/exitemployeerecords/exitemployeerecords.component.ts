import { Component, OnInit } from '@angular/core';
declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-exitemployeerecords',
  templateUrl: './exitemployeerecords.component.html',
  styleUrls: ['./exitemployeerecords.component.css']
})
export class ExitemployeerecordsComponent implements OnInit {

  t;
  constructor() { }

  ngOnInit() {

    this.  DatatableRemoteAjaxDemo();

  }
  DatatableRemoteAjaxDemo()
  {
    
    this.t = $("#exitemp_data").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getExitEmployeeDetails",
            map: function (t) 
            {
              
              var e = t;
              console.log(e);
              return void 0 !== t.data && (e = t.data), e;
            }
          }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: !1,
        serverSorting: !0, 
        saveState: 
          {
          cookie: false,
          webstorage: false
          },
      },
      layout: {
        scroll: !1,
        footer: !1
      },
      sortable: !0,
      pagination: !0,
      toolbar: {
        items: {
          pagination: {
            pageSizeSelect: [10, 20, 30, 50, 100]
          }
        }
      },
      search: {
        input: $("#generalSearch")
      },
      columns: [
      {
        field: "username",
        title: "Username",
        width:150
      },
      {
        field: "reason",
        title: "Reason for Applied",
        width:200
      },
      {
        field: "applieddate",
        title: "Applied Date",
        width:150
      },
      {
        field: "otherEquipment",
        title: "Other Equipment",
        width:200
      },
      {
        field: "idcard",
        title: "ID Card",
        width:100
      },
      {
        field: "deskkey",
        title: "Desk and Files Key",
        width:100
      },
      {
        field: "otherKey",
        title: "Key To Premises",
        width:100
      },
      {
        field: "material",
        title: "Catalogs and Sales Material",
        width:100
      },
      {
        field: "companyvehicle",
        title: "Company Vehicles",
        width:100
      }
    ]
    })
    
    
  };

}
