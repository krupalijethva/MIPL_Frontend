import { Component, OnInit } from '@angular/core';
declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-officialleave',
  templateUrl: './officialleave.component.html',
  styleUrls: ['./officialleave.component.css']
})
export class OfficialleaveComponent implements OnInit {
  t;
  constructor() { }

  ngOnInit() {

    this.DatatableRemoteAjaxDemo();
  }

  DatatableRemoteAjaxDemo()
  {
  
      this.t = $("#holidays_data").mDatatable({
      data: {
        type: "remote",
        source:
        {
          read:
          {
            url: "http://localhost:8080/getOfficialLeave",
            dataType: "text",
            map: function (t) 
            {
              console.log(t);
              var e = t;
              return void 0 !== t.data && (e = t.data), e
            }
          }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: !0,
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
        field: "leaveDate",
        title: "Leave Date",
        template: function (t)
        {
          var date=new Date(t.leaveDate);
          var formatteddatestr = moment(date).format('DD-MMM-YYYY');
          return formatteddatestr;
        },
       },
      {
        field: "day",
        title: "Day",
        
      },
      {
        field: "festival",
        title: "Festival",
      } 
    ]
      
    });
};



}
