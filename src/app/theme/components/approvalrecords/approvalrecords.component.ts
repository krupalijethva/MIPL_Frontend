import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../_services/leave.service';
declare let $: any;

declare var moment: any;
@Component({
  selector: 'app-approvalrecords',
  templateUrl: './approvalrecords.component.html',
  styleUrls: ['./approvalrecords.component.css']
})
export class ApprovalrecordsComponent implements OnInit {

  t;
  comments:string="";
  // leaveRecords:any;
  username:any;
  leaveid:any;
  fullname:any;
  

  constructor(private leaveService:LeaveService) 
  { 

    
  }
  ngOnInit()
  {
    this.username=localStorage.getItem("currentUser");

    this.DatatableRemoteAjaxDemo();
    
  }
  ngAfterViewInit() 
  {
    
  }
  recordActions(id,action)
  {
    var username=localStorage.getItem("currentUser");
    var name="";
    this.leaveService.getLRecord(id)
    .subscribe(
      (data)=>
      {
        console.log(data);
        name=data.userleavedetail.user.fullname;
        this.leaveService.approveRecords(id,action,this.comments,username,name).
        subscribe(
          ()=>
          {
            this.t.reload();
          });

      }
    );
  }

  getRecord(id)
  {
    alert(id);
    this.leaveService.getLRecord(id)
    .subscribe(
      (data)=>
      {
        console.log(data);
        this.leaveid=data.id;
        this.fullname=data.userleavedetail.user.fullname;
        // return data;
      }
    );
  }


//modification with comments

approveWithComment(id,name)
{
  alert(this.comments);
  alert(id);
  var action="approve";

  var username=localStorage.getItem("currentUser");

 this.leaveService.approveRecords(id,action,this.comments,username,name).subscribe(()=>{this.t.reload();});
}

denyWithComment(id,name)
{
  alert(this.comments);
  alert(id);
  var action="deny";
  var username=localStorage.getItem("currentUser");
  this.leaveService.approveRecords(id,action,this.comments,username,name).subscribe(()=>{this.t.reload();});
}

DatatableRemoteAjaxDemo()
    {
    
        this.t = $("#approveLeave_data").mDatatable({
        data: {
          type: "remote",
          source:
          {
            read:
            {
              url: "http://localhost:8080/approvalLeaveRecords/"+this.username,
              map: function (t) 
              {
                console.log(t);
                var e = t;
                return void 0 !== JSON.parse(t.data) && (e = JSON.parse(t.data)), e
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

            if(t.leavestatus=="PENDING_TEAMLEAD" || t.leavestatus=="PENDING_ADMIN")
            {
            return '\t\t\t\t\t\t<div class="dropdown '
            + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="btn m-btn--pill    btn-outline-primary" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="approve dropdown-item" id=' + t.id + '><i class="la la-edit"></i> Approve</a>\t\t\t\t\t\t    \t<a  class="deny dropdown-item"  id=' + t.id + '><i class="la la-leaf"></i>Deny</a>\t\t\t\t\t\t    \t<a id=' + t.id + ' class="commentwith dropdown-item" data-toggle="modal" data-target="#m_modal_4"><i class="la la-print"></i>Comments</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
            }
            else
            {
            return '\t\t\t\t\t\t\t<span class="btn m-btn--pill    btn-outline-metal active" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t'
            }
          }
          },
        {
          field: "userleavedetail.user.fullname",
          title: "Employee",
          width:100,
          textAlign: "center"
        },
        {
          field: "fromdate",
          title: "From Date",
          width:150,
          type: "date",
          format: "HH:mm",
          template: function (t)
          {
            var date=new Date(t.fromdate);
            var formatteddatestr = moment(date).format('DD-MMM-YYYY - hh:mm');
            return formatteddatestr;
          },
        },
        {
          field: "todate",
          title: "To Date",
          width:150,
          template: function (t)
          {
            var E;
            var date=new Date(t.todate);
            var formatteddatestr = moment(date).format('DD-MMM-YYYY - hh:mm');
            return formatteddatestr;
          },
        },
        {
          field: "leavetype",
          title: "Leave Type",
          width:100
        }, 
        {
          field: "duration",
          title: "Duration",
          width:100,
          template: function (t)
          {
          
            this.time = t.duration;
        
            this.totalSecs = this.time / 1000;
            this.hours = (this.totalSecs / 3600);
        
            this.mins = (this.totalSecs / 60) % 60;
            this.secs = this.totalSecs % 60;

            if (t.durationtype === "FULLDAY") {
                this.days = (this.hours / 8);
        
                this.days1 = String(this.days);
          
                this.dVal = this.days1 + "." + "00" +":" + "00" + ":" + "00";

              } 
              else 
              {
                this.dVal = "0" + "." + this.hours + ":" + this.mins + ":" + "00";
              } 

          return this.dVal;
          },
        },
        {
          field: "leaveCategory",
          title: "Leave Duration Category",
          width:100
        }, 
        {
          field: "leavestatus",
          title: "Status",
          width:120,

          template: function (t) {
          
            var e = {
              REJECT: {
                title: "DENIED",
                class: "m-badge--danger"
              },
              PENDING_TEAMLEAD: {
                title: "UNDER REVIEW TL",
                class: " m-badge--warning"
              },
              PENDING_ADMIN: {
                title: "UNDER REVIEW ADMIN",
                class: " m-badge--warning"
              },
              APPROVED: {
                title: "APPROVED",
                class: " m-badge--success"
              },
              CANCEL: {
                title: "APPLY FOR CANCEL LEAVE",
                class: " m-badge--primary"
              },
              CANCELLED: {
                title: "CANCELLED",
                class: " m-badge--info"
              },
            };
            return '<span class="m-badge ' + e[t.leavestatus].class + ' m-badge--wide">' + e[t.leavestatus].title + "</span>"
          }
        },
        {
          field: "appliedtime",
          title: "Applied Date",
          width:100,
          template: function (t)
          {
          var date=new Date(t.appliedtime);
          var logdate = moment(date).format('DD-MMM-YYYY');
          return logdate
          },
        }, 
        {
          field: "teamlead",
          title: "Project Lead",
          width:100,
        },

        {
          field: "commentsEmployee",
          title: "Comments",
          width:150,
          template:function(t)
          {

          var comemp,compro;
            if(t.commentsEmployee == null && t.commentsProjectControler != null)
            {
              comemp=" ";
              compro=t.commentsProjectControler;
            }
            else if(t.commentsEmployee != null && t.commentsProjectControler == null)
            {
              comemp=t.commentsEmployee;
              compro=" ";
            }
            else
            {
              comemp=t.commentsEmployee;
              compro=t.commentsProjectControler;
            }

              return ">"+" "+comemp+"<br>"+">"+" "+compro;
            

          }
        },

        ]
        
      }) 
      var self = this;
     $("#m_form_status").on("change", function()
    {
     self.t.search($(this).val(), "leaveStatus")
    }), $("#m_form_status").selectpicker()

    this.t.on('m-datatable--on-layout-updated', function ()
    {
     $('.approve').click(function () {
      
       var action="approve";
        self.recordActions(this.id,action);
     });


     $('.deny').click(function () {
      
      var action="deny";
      self.recordActions(this.id,action);
    });

    

    $('.commentwith').click(function () {
      
      alert(this.id);
      self.getRecord(this.id);
       
    });
     
  });
};

}
