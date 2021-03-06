import { Component, OnInit } from '@angular/core';
import { AccessrequestService } from '../../../_services/accessrequest.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';

declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-internetaccessrequest',
  templateUrl: './internetaccessrequest.component.html',
  styleUrls: ['./internetaccessrequest.component.css']
})
export class InternetaccessrequestComponent implements OnInit {

  t;
  fullname:any;
  username:any;
  duration:any;
  description:any;
  constructor(private accessReqService:AccessrequestService,private _script: ScriptLoaderService) { }

  

  ngOnInit() {
    this.fullname=localStorage.getItem('fullname');
    this.username=localStorage.getItem('currentUser');
    this._script.loadScripts('app-internetaccessrequest',['assets/demo/default/custom/crud/forms/validation/access-request.js']);
    this.DatatableRemoteAjaxDemo();
  }
  internetRequest()
  {
    if(($("#req_form").valid()) == true)
    {
      this.accessReqService.internetRequest(this.fullname,this.description,this.duration).subscribe(()=>{this.t.reload();this.description=null;this.duration=null;})
    }
  }
  DatatableRemoteAjaxDemo()
  {
    this.t = $("#internetRequest_data").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getInternetReqDetails?username="+this.username,
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
        field: "accessdate",
        title: "Access Date",
        width:100,
        template: function (t)
        {
          if(t.accessdate != null)
          {
            var date=new Date(t.accessdate);
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
        field: "returndate",
        title: "Return Date",
        width:100,
        template: function (t)
        {
          if(t.returndate != null)
          {
            var date=new Date(t.returndate);
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
        field: "duration",
        title: "Duration",
        width:100
      },  
      {
        field: "description",
        title: "Description",
        width:300
      },  
      {
        field: "comments",
        title: "Comments",
        width:200
      },
      {
        field: "status",
        title: "Status", 
        width:150,
        template: function (t) {
          var e = {
            Pending: {
              title: "PENDING",
              class: "m-badge--warning"
            },
            Denied: {
              title: "DENIED",
              class: " m-badge--danger"
            },
            Approved: {
              title: "APPROVED",
              class: "m-badge--success"
            },
            RemovedAccess: {
              title: "RemovedAccess",
              class: " m-badge--info"
            },
          };
          debugger
          return '<span class="m-badge ' + e[t.status].class + ' m-badge--wide">' + e[t.status].title + "</span>"
        }
      }
    ]
    })
    
    
  };
}
