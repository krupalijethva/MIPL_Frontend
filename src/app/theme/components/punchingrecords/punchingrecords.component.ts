import { Component, OnInit } from '@angular/core';
declare let $: any;

declare var moment: any;
import 'rxjs/Rx' ;
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { PunchingService } from '../../../_services/punching.service';
@Component({
  selector: 'app-punchingrecords',
  templateUrl: './punchingrecords.component.html',
  styleUrls: ['./punchingrecords.component.css']
})
export class PunchingrecordsComponent implements OnInit {

  t;
  e;
  fromdate;
  todate;
  selectedMonth;
  constructor(private _script: ScriptLoaderService,private punching:PunchingService) 
  { 
  }

  ngOnInit() 
  {
    this.DatatableRemoteAjaxDemo();
  }
  ngAfterViewInit() 
  {
    this._script.loadScripts('app-punchingrecords',['assets/demo/default/custom/crud/forms/widgets/bootstrap-datetimepicker.js','assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js','assets/demo/moment.min.js','assets/demo/default/custom/crud/forms/validation/form-controls.js']);
  }

  reset() 
  {
    this.selectedMonth=null;
  }
  //get punching records

  getPuchingRecords()
  {
    if($("#m_form_2").valid() == true)
    {
        this.fromdate=$("input[name=fromdate]").val();
        this.todate=$("input[name=todate]").val();
        var fromdate = moment(this.fromdate).format('DD-MMM-YYYY');
        var todate= moment(this.todate).format('DD-MMM-YYYY');

        alert(fromdate);
        alert(todate);

        this.punching.getPunchingRecords(fromdate,todate).subscribe((data)=>{
            this.downloadFile(data);
            $("input[name=fromdate]").val('');
            $("input[name=todate]").val('');
        });
    }

  }
  downloadFile(data){
    debugger
    var csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'}); 
    var csvURL = window.URL.createObjectURL(csvData); 
    var tempLink = document.createElement('a'); 
    tempLink.href = csvURL; 
    tempLink.setAttribute('download', 'punchingRecords.csv'); 
    tempLink.click();
  }
  
  getMonthlyRecords()
  {
     
      alert(this.selectedMonth);
      alert($("#editPunchForm").valid())

      if($("#editPunchForm").valid() == true)
      {
          this.punching.getMonthlyRecords(this.selectedMonth).subscribe(
          (data)=>
          {
              this.reset();
              this.downloadFile(data);
          });
      }
      
  }


  DatatableRemoteAjaxDemo()
  {
    
    this.t = $("#punchingRecord_data").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getPunchingRecords/",
            map: function (t) 
            {
   
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
        field: "username",
        title: "Employee",
        width:100
      },
      {
        field: "logindate",
        title: "Date",
        type: "date",
        sortable: !0,
        format: "dd/MM/yyyy",
        textAlign: "center",
        width:100,
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
          this.date=new Date(t.loginTime);
          this.datetext= this.date.toTimeString();
          this.datetext = this.datetext.split(' ')[0];
          this.finalr=this.datetext.split(':');
          return this.finalr[0]+":"+this.finalr[1];
        },

      }, {
        field: "breakTime",
        title: "Break Time",
        width:160

      }, {
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
        title: "totalHours",
        format: "HH:MM",
        width:100
      }, {
        field: "punchStatus",

        title: "punchStatus",
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
              class: " m-badge--danger"
            },
            LATEENTRY: {
              title: "LATEENTRY",
              class: " m-badge--danger"
            },
            COMPLETE: {
              title: "",
              class: ""
            }
            , MODIFIED: {
              title: "MODIFIED",
              class: " m-badge--info"
            },
          };
          if(e[t.punchStatus].class == "")
          {
            return " ";
          }
          else{
          return '<span class="m-badge ' + e[t.punchStatus].class + ' m-badge--wide">' + e[t.punchStatus].title + "</span>"
          }
        }
      },
      {
        field: "ipAddress",
        title: "IP Address",
        width:100
      },
      {
        field: "hostName",
        title: "Host Name",
        width:100
      }
    ]
    })
    var self = this;
     $("#m_form_status").on("change", function()
    {
     self.t.search($(this).val(), "punchStatus")
    }), $("#m_form_status").selectpicker()
    
  };



}
