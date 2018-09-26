import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../_services/leave.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { User } from '../../pojo classes/user';
declare let $: any;
declare var swal: any;
declare var moment: any;
declare let mApp: any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  username:any;
  showForm:boolean=true;
  leavetype="";
  show:boolean;
  makes: Array<any> = [];
  user=new User;
  remaining_leave:String;
  userlist:Array<any>=[];
  selectedLeader=null;
  full:boolean=true;
  partial:boolean=true;
  durationval;
  fromdate:any;
  todate:any;
  t;
  fromdatetime:any;
  todatetime:any;
  reason=""; 
  sendfromdate:any;
  sendtodate:any;
  time:Number;
  totalSecs:Number;
  hours:Number;
  mins:Number;
  secs:Number;
  days:Number;
  days1:String;
  dVal:any;
  leaveRecords: Array<any> = [];
  constructor(private leaveService:LeaveService,private _script: ScriptLoaderService){}
  ngOnInit()
  {
    this.username=localStorage.getItem("currentUser");
    this.getLeaveCredit();
    this.DatatableRemoteAjaxDemo();
  }
  ngAfterViewInit() 
  {
    this._script.loadScripts('app-leave',['assets/demo/default/custom/crud/forms/widgets/bootstrap-datetimepicker.js','assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js','assets/demo/moment.min.js','assets/demo/default/custom/crud/forms/validation/form-controls.js','assets/demo/default/custom/crud/forms/validation/form-widgets.js']);
    (<any>mApp).init();
    (<any>mApp).scrollTop();
  }

  getLeaveCredit()
  {
    var username=localStorage.getItem('currentUser');
    this.leaveService.getCredit(username).subscribe((data)=>{this.remaining_leave=data;
  });
  }
  getLeaveRecords()
    {
      var username=localStorage.getItem('currentUser');
      this.leaveService.getLeaveRecords(username).subscribe((leaveRecords: any) => {
      this.leaveRecords=leaveRecords;
    });
    }

  delete(id)
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
      }).then(function (e)
       {
        if (e.value == true) 
        {
    
         self.deleteLeaveRecord(id);
        } 
      });
  }
  deleteLeaveRecord(id)
    {
      this.leaveService.deleteLeaveRecord(id).then(()=>this.t.reload());
  }
  applyLeave()
    {
        this.showForm=false;
        var username=localStorage.getItem('currentUser');
        this.leaveService.getLeaveDetails(username).subscribe((makes: any) => {
        this.makes=makes;
        this.user=JSON.parse(this.makes['user']);      
        this.userlist=JSON.parse(this.makes['userList']);
        console.log(this.user);
        });
  };
  leaveSubmit()
    {
      if(($("#m_form_2").valid()) == true)
      {
          var username=localStorage.getItem('currentUser');
          var result,date,time;
          this.fromdate=$("input[name=fromdate]").val();
          this.todate=$("input[name=todate]").val();
          this.fromdatetime=$("input[name=fromdatetime]").val();
          this.todatetime=$("input[name=todatetime]").val();
          this.leaveService.insertleave(this.user,this.selectedLeader,this.durationval,this.fromdate,this.todate,this.fromdatetime,this.todatetime,this.reason,username).then(()=>{
            this.selectedLeader=null;
            this.leavetype=null;
            this.durationval=null;
            this.reason=null;
            $("input[name=fromdate]").val('');
            $("input[name=todate]").val('');
            $("input[name=fromdatetime]").val('');
            $("input[name=todatetime]").val('');
            this.t.reload(); 
            this.showForm=true;
          });
      }
  };

  hideForm()
  {
    this.showForm=true;
  }
  select(e)
  {
    let index= e.target.selectedIndex;

      if(index==0)
      {
        this.full=false;
        this.partial=true;
      }
      else{
        this.partial=false;
        this.full=true;
      }
  
  }
DatatableRemoteAjaxDemo()
    {
    
        this.t = $("#leavedetail_data").mDatatable({
        data: {
          type: "remote",
          source:
          {
            read:
            {
              url: "http://localhost:8080/getLeaveRecords/"+this.username,
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
            return t.durationValue;
          },
        },
        {
          field: "durationtype",
          title: "Duration Type",
          width:100
        },
        {
          field: "leaveCategory",
          title: "Leave Duration Category",
          width:100
        }, 
        {
          field: "commentsEmployee",
          title: "Comments",
          width:200,
          template: function (t){
            debugger
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
          field: "Actions",
          title: "Actions",
          sortable: !1,
          overflow: "visible",
          template: function (t, e, a) {
            return '\t\t\t\t\t\t<button type="button" data-toggle="modal" data-target="#m_modal_4" class="editpunching m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit" ></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t<button type="button" id="'+t.id+'"  class="deleteLeave m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</button>\t\t\t\t\t'
          }
        }
      ]
        
      }) 
      var self = this;
      $("#m_form_status").on("change", function()
      {
      self.t.search($(this).val(), "leaveStatus")
      }), $("#m_form_status").selectpicker()
    
      this.t.on('m-datatable--on-layout-updated', function ()
      {
        $('.deleteLeave').click(function () {
            
          self.delete(this.id);
        });
      });
};

}
