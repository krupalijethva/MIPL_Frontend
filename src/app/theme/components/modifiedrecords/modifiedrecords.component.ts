import { Component, OnInit } from '@angular/core';
declare let $: any;
declare var moment: any;
import { PunchingDetailEdit } from '../../pojo classes/punchingdetailsedit';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { PunchingService } from '../../../_services/punching.service';


@Component({
  selector: 'app-modifiedrecords',
  templateUrl: './modifiedrecords.component.html',
  styleUrls: ['./modifiedrecords.component.css']
})
export class ModifiedrecordsComponent implements OnInit {

  t;
  comments:string="";
  punchEditObj=new PunchingDetailEdit;

  constructor(private _script: ScriptLoaderService,private punchingService:PunchingService) { }

  ngOnInit() 
  {
    this._script.loadScripts('app-modifiedrecords',['assets/demo/default/custom/crud/forms/widgets/bootstrap-datetimepicker.js','assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js','assets/demo/moment.min.js']);
  }

  ngAfterViewInit() 
  {
    this.DatatableRemoteAjaxDemo();
  }

  recordActions(id,action)
  {    
    this.punchingService.approveRecords(id,action,this.comments).subscribe(()=>{this.t.reload();});

  }

  getRecord(id)
  {
    
    this.punchingService.getRecord(id).subscribe(
      (data:PunchingDetailEdit)=>
      {
        console.log(data);
        this.punchEditObj=data;
      }
    );
  }


//modification with comments

approveWithComment(id)
{
  var action="approve";
  this.punchingService.approveRecords(id,action,this.punchEditObj.comments).subscribe(()=>{this.t.reload();});
}

denyWithComment(id)
{
  var action="deny";
  this.punchingService.approveRecords(id,action,this.punchEditObj.comments).subscribe(()=>{this.t.reload();});
}


  DatatableRemoteAjaxDemo()
  {
    
      this.t = $("#modifiedRecord_data").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getModifiedRecords",
            map: function (t) 
            {
          
              console.log(t);
              var e = t;
              console.log(e);
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
          field: "Actions",
          title: "Actions",
          sortable: !1,
          width:100,
          overflow: "visible",
    
          template: function (t, e, a) {

            if(t.punchStatus == "UNDER_REVIEW"){
              return '\t\t\t\t\t\t<div class="dropdown '
              + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="btn m-btn--pill    btn-outline-primary" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="approve dropdown-item" id=' + t.idPunching + '><i class="la la-edit"></i> Approve</a>\t\t\t\t\t\t    \t<a  class="deny dropdown-item"  id=' + t.idPunching + '><i class="la la-leaf"></i>Deny</a>\t\t\t\t\t\t    \t<a id=' + t.idPunching + ' class="commentwith dropdown-item" data-toggle="modal" data-target="#m_modal_4"><i class="la la-print"></i>Comments</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
            }
           else
           {
            return '\t\t\t\t\t\t\t<span class="btn m-btn--pill    btn-outline-metal active" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t'
           }
          }
        },
       
      {
        field: "username",
        title: "Employee",
        width:100
      },
      {
        field: "logindate",
        title: "Date",
        type: "date",
        width:100,
        format: "dd/MM/yyyy",
        
        template: function (t)
        {
         this.date=new Date(t.logindate);
         var logdate = moment(this.date).format('DD-MM-YYYY');
         return logdate
        },
      }, {
        field: "loginTime",
        title: "Punch In",
        textAlign: "center",
        width:100,
        
        template: function (t)
        {
          // if(t.loginTime == null || t.loginTimeedit == null)
          // {
          //   return " ";
          // }
          // else
             this.date=new Date(t.loginTime);
              this.datetext= this.date.toTimeString();
              this.datetext = this.datetext.split(' ')[0];
              this.finalr=this.datetext.split(':');
              var date=new Date(t.loginTimeedit);
              var datetext= date.toTimeString();
              var datetext = datetext.split(' ')[0];
              var finalr=datetext.split(':');
              var format=this.finalr[0]+":"+this.finalr[1] +"<br>"+finalr[0]+":"+finalr[1];
              return format;
        },

      },
      {
        field: "breakTime",
        title: "Break Time",
        width:160,

        template: function (t)
        {
          var bktime,bktimeedit;
          if(t.breakTime == null && t.breakTimeedit != null)
          {
            bktime=" ";
            bktimeedit=t.breakTimeedit;
          }
          else if(t.breakTime != null && t.breakTimeedit == null)
          {
            bktime=t.breakTime;
            bktimeedit=" ";
          }
          else
          {
            bktime=t.breakTime;
            bktimeedit=t.breakTimeedit;
          }
            var format=bktime+"<br>"+bktimeedit;
            return format;
        }
      },
      {
        field:"comments",
        title: "Comments",
        width:300,
        template: function (t)
        {
          debugger
          var com,comemp;
          if((t.comments == null ) && (t.employeeComments != null))
          {
            com=" ";
            comemp=t.employeeComments;
          }
          else  if((t.comments != null ) && (t.employeeComments == null))
          {
           com=t.comments;
           comemp=" ";
          }
          else  if((t.comments == null ) && (t.employeeComments == null))
          {
            com=" ";
            comemp=" ";
          }
          else
          {
            com=t.comments;
            comemp=t.employeeComments;
          }
            var format=comemp+"<br>"+com;
            return format;
          
          
        }
      },
      {
        field: "logoutTime",
        title: "Punch Out",
        width:100,

        template: function (t)
        {
          this.date=new Date(t.logoutTime);
          this.datetext= this.date.toTimeString();
          this.datetext = this.datetext.split(' ')[0];
          this.finalr=this.datetext.split(':');
          var date=new Date(t.logoutTimeedit);
          var datetext= date.toTimeString();
          var datetext = datetext.split(' ')[0];
          var finalr=datetext.split(':');
          var format=this.finalr[0]+":"+this.finalr[1] +"<br>"+finalr[0]+":"+finalr[1];
          return format;
        },
      },
      {
        field: "totalHours",
        title: "Total Hours",
        width:100,
        template: function (t)
        {
         
          var totalH,totalHE;
          if(t.totalHours == null && t.totalHoursedit != null)
          {
            totalH="00:00:00";
            totalHE=t.totalHoursedit;
          }
          else if(t.totalHours != null && t.totalHoursedit == null)
          {
            totalH=t.totalHours;
            totalHE="00:00:00";
          }
          else if(t.totalHoursedit == null && t.totalHours == null)
          {
            totalH="00:00:00";
            totalHE="00:00:00";
          }
          else
          {
            totalH=t.totalHours;
            totalHE=t.totalHoursedit;
          }
          var format=totalH+"<br>"+totalHE;
          return format;
        },

      },
      {
        field: "punchStatus",
        title: "Status",
        width:150,
        template: function (t) {
        
          var e = {
            UNDER_REVIEW: {
              title: "UNDER_REVIEW",
              class: "m-badge--warning"
            },
            DENIED: {
              title: "DENIED",
              class: " m-badge--danger"
            },
            
            COMPLETE: {
              title: "",
              class: ""
            },
            MODIFIED: {
              title: "MODIFIED",
              class: " m-badge--info"
            },
            LATEENTRY: {
              title: "LATEENTRY",
              class: " m-badge--danger"
            }
          };

          if(e[t.punchStatus].class == "")
          {
            return " ";
          }
          else{
          return '<span class="m-badge ' + e[t.punchStatus].class + ' m-badge--wide">' + e[t.punchStatus].title + "</span>"
          }
          
        }
      }
    ]
    })

    var self = this;
     $("#m_form_status").on("change", function()
    {
     self.t.search($(this).val(), "punchStatus")
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
      
     
      self.getRecord(this.id);
       
    });
     
  });


    
  };

}
