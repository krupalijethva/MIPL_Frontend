import { Component, OnInit } from '@angular/core';
import { AccessrequestService } from '../../../_services/accessrequest.service';

declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-approveinternetreq',
  templateUrl: './approveinternetreq.component.html',
  styleUrls: ['./approveinternetreq.component.css']
})
export class ApproveinternetreqComponent implements OnInit {

  t;
  internet_id:any;
  comments:any;

  constructor(private accessService:AccessrequestService) { }

  ngOnInit() {
    this.DatatableRemoteAjaxDemo();
  }

  internetReqActions(id,action)
  {
    alert(id);
    alert(action);
    this.accessService.internetActions(id,action).subscribe(()=>{this.t.reload();})
  }
  getInternetReqDetails(id)
  {
    this.internet_id=null;
    this.accessService.internetReqDetailsById(id).subscribe((data)=>{console.log(data);
    this.internet_id=data['internet_id'];
    })
  }
  approveWithComment(id)
  {
    var action="approve";
    this.accessService.internetActionsWithComments(id,action,this.comments).subscribe(()=>{this.t.reload();this.comments=null;});
  }
  denyWithComment(id)
  {
    var action="deny";
    this.accessService.internetActionsWithComments(id,action,this.comments).subscribe(()=>{this.t.reload();this.comments=null;});
  }
  receiveWithComment(id)
  {
    var action="receive";
    this.accessService.internetActionsWithComments(id,action,this.comments).subscribe(()=>{this.t.reload();this.comments=null;});
  }

  DatatableRemoteAjaxDemo()
  {
    this.t = $("#approveInternet_request").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getInternetReqDetails",
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
          field: "Actions",
          title: "Actions",
          width:100,
          textAlign: "center",
          sortable: !1,
          overflow: "visible",
          template: function (t, e, a) {
            return '\t\t\t\t\t\t<div class="dropdown '
            + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="btn m-btn--pill    btn-outline-primary" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="approveRequest dropdown-item" id=' + t.internetaccessid + '><i class="la la-edit"></i> Approve</a>\t\t\t\t\t\t    \t<a  class="denyRequest dropdown-item"  id=' + t.internetaccessid + '><i class="la la-leaf"></i>Deny</a>\t\t\t\t\t\t    \t<a id=' + t.internetaccessid + ' class="removeAccess dropdown-item"><i class="la la-print"></i>Remove Access</a>\t\t\t\t\t\t<a id=' + t.internetaccessid + ' class="commentwith dropdown-item" data-toggle="modal" data-target="#m_modal_4"><i class="la la-print"></i>Comments</a> \t\t\t\t\t\t \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
          }
          },
        {
          field: "username",
          title: "Username",
          width:100
        },
        {
          field: "requestdate",
          title: "Request Date",
          width:100,
          template: function (t)
          {
            if(t.requestdate != null)
            {
              var date=new Date(t.requestdate);
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
              class: "m-badge--info"
            },
          };
          debugger
          return '<span class="m-badge ' + e[t.status].class + ' m-badge--wide">' + e[t.status].title + "</span>"
        }
      }
    ]
    });
    var self = this;
    $("#m_form_status").on("change", function()
   {
    self.t.search($(this).val(), "status")
   }), $("#m_form_status").selectpicker()

   this.t.on('m-datatable--on-layout-updated', function ()
   {
    $('.approveRequest').click(function () {
      var action="approve";
      self.internetReqActions(this.id,action);
    });

    $('.denyRequest').click(function () {
     
     var action="deny";
     self.internetReqActions(this.id,action);
   });
   $('.removeAccess').click(function () {
     
     var action="receive";
     self.internetReqActions(this.id,action);
   });  
   $('.commentwith').click(function () {
     
     self.getInternetReqDetails(this.id);
   });  
 });
    
    
  };
}
