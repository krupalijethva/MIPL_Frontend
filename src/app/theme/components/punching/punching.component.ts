import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
declare let $: any;
import { PunchingDetail } from '../../Pojo Classes/punchingdetails';
import {PunchingDetailEdit} from '../../pojo classes/punchingdetailsedit';
import { Router } from '@angular/router';
import { PunchingService } from '../../../_services/punching.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
declare var swal: any;
declare var moment: any;
@Component({
  selector: 'app-punching',
  templateUrl: './punching.component.html',
  styleUrls: ['./punching.component.css']
})
export class PunchingComponent implements OnInit 
{

  bktime:any='';
  username1:any;
  status:any;
  punchObj= new PunchingDetail;
  punchingEditObj:PunchingDetailEdit=new PunchingDetailEdit();
  punching:PunchingDetail[];
  Status: Array<any> = [];
  id1:number;
  in:any;
  out:any;
  ShowDate:boolean=false;
  ShowHeader="edit";
  punchdate:any;
  action='';
  username='';
  deleteval:boolean=false;
  t;
   e;
   finalr;
   date;
   datetext;
  @ViewChild('form') form;

  @ViewChild('form1') form1;

  
  constructor(private router:Router,private punchingService: PunchingService, private _script: ScriptLoaderService) { }


  ngOnInit() 
  {
    this._script.loadScripts('app-punching', ['assets/demo/default/custom/crud/forms/widgets/bootstrap-timepicker.js','assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js','assets/demo/default/custom/crud/forms/validation/form-controls.js','assets/demo/moment.min.js']);
    this.status=localStorage.getItem('status');
    this.username1=localStorage.getItem('currentUser');
   
  }
  ngAfterViewInit() 
  {
    
    this.DatatableRemoteAjaxDemo();
  }

  reset() {
    this.form.nativeElement.reset();
  }
  showDate()
  {
    $("#breaktime").inputmask( {
      mask:"99:99-(OUT),99:99-(IN)"
    });
    this.punchingEditObj.breakTime="";
  }

  cancel()
  {
    $('#NewPunch').modal('hide');  
    $("#newPunchForm").resetForm(true);
  }


  //Show Punching Data
  getid(id) 
  {
    this.punchingService.getpunchingdetail(id).subscribe((data)=>{this.punchingEditObj=data;
    });
  };

  //Edit Punching Code
  onPunchSubmit(id)
  {
    if($("#editPunchForm").valid() == true)
    {
      $('#m_modal_4').modal('hide');  
      this.in=$("input[name=loginTime]").val();
      this.out=$("input[name=logoutTime]").val();
      this.punchingEditObj.loginTime = new Date(this.punchingEditObj.logindate+" "+this.in);
      this.punchingEditObj.logoutTime=new Date(this.punchingEditObj.logindate+" "+this.out);
      this.punchingService.editPunching(this.punchingEditObj,id).then(()=>{this.t.reload();this.form.nativeElement.reset();});
    }
  };

  deletePunch(id)
  {
  this.punchingService.deletePunch(id).then(()=>{this.t.reload();})
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
  }).then(function (e) {
    if (e.value == true) {
   
     self.deletePunch(id);
    } else {
     
    }
  
  });
  }
  
  //New Punching Code
  onNewSubmit()
  {
 
    if($("#newPunchForm").valid() == true)
    {
      alert(this.punchingEditObj.teamlead);
        $('#NewPunch').modal('hide');  
        var username=localStorage.getItem('currentUser');
        this.punchdate=$("input[name=Date]").val();
        this.punchingEditObj.logindate=new Date(this.punchdate);
        this.in=$("input[name=loginTime]").val();
        this.out=$("input[name=logoutTime]").val();
        var logdate=this.punchingEditObj.logindate.getFullYear()+"-"+(this.punchingEditObj.logindate.getMonth()+1)+"-"+this.punchingEditObj.logindate.getDate()+" "+this.in; 
        this.punchingEditObj.loginTime=new Date(logdate);
        var logdate=this.punchingEditObj.logindate.getFullYear()+"-"+(this.punchingEditObj.logindate.getMonth()+1)+"-"+this.punchingEditObj.logindate.getDate()+" "+this.out;
        this.punchingEditObj.logoutTime=new Date(logdate);
        this.punchingService.newPunching(this.punchingEditObj,this.punchingEditObj.teamlead,username).then(()=>{this.t.reload();this.form.nativeElement.reset();});
    }
  }
  
  breakstart()
  {
    this.action="breakStart";
      this.punchingService.break(this.username1,this.action)
        .subscribe(
          (data:any)=>{
            this.status=data;
            console.log(this.status);
            this.t.reload();
          }
        );

  }
   
  breakstop()
  {
    this.action="breakStop";

    this.punchingService.break(this.username1,this.action)
    .subscribe(
      (data:any)=>{
        this.status=data;
        console.log(this.status);
        this.t.reload();
      }
    );

  }

  logout()
  {
      this.action="logout";
      this.punchingService.punchout(this.username1,this.action).subscribe(
        ()=>{
        this.punchingService.logout();
        this.router.navigate(['']);
      })
  }


  //Datatable Code
  DatatableRemoteAjaxDemo()
  {
    
    this.t = $("#punching_data").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getpunchingdetails/"+this.username1,
            map: function (t) 
            {
              console.log("punching data")
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
        field: "logindate",
        title: "Date",
        type: "date",
        width:150,
        format: "dd/MM/yyyy",
        textAlign: "center",
        template: function (t)
        {
         this.date=new Date(t.logindate);
         var logdate = moment(this.date).format('DD-MM-YYYY');
         return logdate
        },
      }, 
      {
        field: "loginTime",
        title: "Punch In",
        width:100,
        textAlign: "center",
        template: function (t)
        {
          this.date=new Date(t.loginTime);
          this.datetext= this.date.toTimeString();
          this.datetext = this.datetext.split(' ')[0];
          this.finalr=this.datetext.split(':');
          return this.finalr[0]+":"+this.finalr[1];
        },
      }, 
      {
        field: "breakTime",
        title: "Break Time",
        width: 300,
        template: function (t)
        {
          if(t.breakTime == null)
          {
            return " ";
          }
          else if(t.breakTime == null && t.comments == null && t.commentsEmployee == null)
          {
            return " "
          }
          else if(t.breakTime != null && t.comments == null && t.commentsEmployee == null)
          {
            return t.breakTime;

          }
          else if(t.breakTime != null && t.comments != null && t.commentsEmployee == null)
          {
            return t.breakTime+"<br>"+">"+t.comments;
          }
          else if(t.breakTime != null && t.comments == null && t.commentsEmployee != null)
          {
            return t.breakTime+"<br>"+">"+t.commentsEmployee;
          }
          else
          {
            return t.breakTime+"<br>"+">"+t.comments+"<br>"+">"+t.commentsEmployee;
          }
          
          
        }

      }, 
      {
        field: "logoutTime",
        title: "Punch Out",
        textAlign: "center",
        width:100,
        template: function (t)
         {
           if(t.logoutTime != null)
           {
            this.date=new Date(t.logoutTime);
            this.datetext= this.date.toTimeString();
            this.datetext = this.datetext.split(' ')[0];
            this.finalr=this.datetext.split(':');
            return this.finalr[0]+":"+this.finalr[1];
           }
           else
           {
             return '';
           }
           
         },
      }, {
        field: "totalHours",
        title: "Total Hours",
        textAlign: "center",
        width:150
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
            INCOMPLETE: {
              title: "INCOMPLETE",
              class: " m-badge--danger"
            },
            COMPLETE: {
              title: " ",
              class: " "
            },
            BREAKOUT: {
              title: "BreakTime",
              class: " m-badge--brand"
            },
            LOGGEDIN: {
              title: "Live",
              class: " m-badge--success"
            },
            DENIED: {
              title: "DENIED",
              class: "m-badge--danger"
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

          if(e[t.punchStatus].class == " ")
          {
            return " ";
          }
          else{
          return '<span class="m-badge ' + e[t.punchStatus].class + ' m-badge--wide">' + e[t.punchStatus].title + "</span>"
          }
        }
      },
      {
        field: "ac",
        title: "Active Collab Hours",
        format: "HH:MM",
        width:100
      },
      {
        field: "Actions",
        title: "Actions",
        textAlign: "center",
        sortable: !1,
        overflow: "visible",
        template: function (t, e, a) {
          return '\t\t\t\t\t\t<div class="dropdown '
            + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a  class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<button type="button" id=' + t.idPunching + '  value="' + t.idPunching + '" data-toggle="modal" data-target="#m_modal_4" class="editpunching m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit" ></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t<button type="button" id=' + t.idPunching + '  value="' + t.idPunching + '" class="deletepunching m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</button>\t\t\t\t\t'
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
      $('.editpunching').click(function () {
        self.ShowHeader="edit";
        self.ShowDate=true;   
        self.getid(this.id);
      });

      $('.deletepunching').click(function () {      
         self.delete(this.id);
      });
      $('#breakstart').click(function () {      
        
     });

     $('#breakstop').click(function () 
     {      
      this.t.reload();
      });
   });
  };

 
//Add BreakTime
addBreak()
{
  this.punchingEditObj.breakTime+=$("#breakStart").val()+"-(OUT),"+$("#breakStop").val()+"-(IN),"
}
addEditBreak()
{
  this.punchingEditObj.breakTime+=$("#editBreakStart").val()+"-(OUT),"+$("#editBreakStop").val()+"-(IN),"
}

}
