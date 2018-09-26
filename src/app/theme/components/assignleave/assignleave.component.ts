import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveService } from '../../../_services/leave.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
declare let $: any;


@Component({
  selector: 'app-assignleave',
  templateUrl: './assignleave.component.html',
  styleUrls: ['./assignleave.component.css']
})
export class AssignleaveComponent implements OnInit {

  t;
  totalcredit:any;
  @ViewChild('form') form;
  constructor(private leaveService:LeaveService,private _script: ScriptLoaderService) { }

  ngOnInit() {
    this._script.loadScripts('app-assignleave', ['assets/demo/default/custom/crud/forms/validation/form-controls.js']);
    this.DatatableRemoteAjaxDemo();

  }
  reset() 
  {
    this.totalcredit=null;
  }

  updateLeave()
  {
    if($("#editPunchForm").valid() == true )
    {
      $('#m_modal_4').modal('hide');  
      var id=localStorage.getItem('id');
      this.leaveService.assignLeave(id,this.totalcredit).subscribe(
      ()=>
      {
        this.reset();
        this.t.reload();
      });
    }
  }

  DatatableRemoteAjaxDemo()
    {
    
        this.t = $("#assignLeave_data").mDatatable({
        data: {
          type: "remote",
          source:
          {
            read:
            {
              url: "http://localhost:8080/assignLeave",
              dataType: "text",
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
        columns: [{
          field: "Actions",
          title: "Actions",
          textAlign: "center",
          sortable: !1,
          overflow: "visible",
          template: function (t, e, a)
          {

            
            return '\t\t\t\t\t\t<div class="dropdown '
            + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="update btn m-btn--pill    btn-outline-primary m-btn m-btn--custom" data-toggle="modal" id='+t.id+' data-target="#m_modal_4">Update</span>\t\t\t\t\t\t  \t'
            
          }
        },
        {
          field: "id",
          title: "#",
          width: 50,
          selector: !1,
          textAlign: "center",
          responsive: {hidden: 'xl'}
       
        },
       
        {
          field: "employeeid",
          title: "Employee Id",
          type: "date",
          format: "HH:mm",
         },
        {
          field: "fullname",
          title: "Employee Name",
          
        },
        {
          field: "leavedetail.totalleave",
          title: "Total Leave",
        } 
      ]
        
      }) 

      var self=this;
      this.t.on('m-datatable--on-layout-updated', function ()
      {
       $('.update').click(function () {
        
         localStorage.setItem('id',this.id);
       });
      
    });
  
  
  
  
     
    
  };

}
