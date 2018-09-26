import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../_services/users.service';


declare let $: any;
declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  t;
  constructor(private userService:UsersService) { }

  ngOnInit() {

    this.DatatableRemoteAjaxDemo();
  }

  changeEmpStatus(empid,Status)
  {
     this.userService.changeEmpStatus(empid,Status).subscribe(this.t.reload());
  }

  confirmation(id,Status)
  {
    var txtchange=" ";
    if(Status == "Activate")
    {
      txtchange="deactivate"
    }
    else
    {
      txtchange="activate"
    }
   
    var self=this;
 
  swal({
    text: "Are you sure you want to "+txtchange+" user?",
    icon: "success",
    confirmButtonText: "<span>YES</span>",
    confirmButtonClass: "yes btn btn-focus m-btn m-btn--pill m-btn--air m-btn--icon",
    showCancelButton: !0,
    cancelButtonText: "<span>No,thanks</span>",
    cancelButtonClass: "btn btn-secondary m-btn m-btn--pill m-btn--icon"
  }).then(function (e) {
    if (e.value == true) {
   
      debugger
     self.changeEmpStatus(id,Status);
    } else {
     
    }
  
  });
  }
  

  DatatableRemoteAjaxDemo()
  {
  
      this.t = $("#allusers_data").mDatatable({
      data: {
        type: "remote",
        source:
        {
          read:
          {
            url: "http://localhost:8080/getUsers",
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
      columns: [
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
        field: "username",
        title: "Username",
      },
      {
        field: "Status",
        title: "Status",
        textAlign: "center",
        sortable: !1,
        overflow: "visible",
        template: function (t, e, a)
        {
      
          if(t.userStatus == 'Activate')
          {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<span class="btn m-btn--pill    btn-success active" style="width:30%;" id='+t.id+' >active</span>\t\t\t\t\t\t  \t'
          }
          else
          {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<span class="btn m-btn--pill    btn-danger active" style="width:30%;" id='+t.id+' >Inactive</span>\t\t\t\t\t\t  \t'
          }  
        }
      },
    
      {
        field: "Employee Status",
        title: "Employee Status",
        textAlign: "center",
        sortable: !1,
        overflow: "visible",
        template: function (t, e, a)
        {
       
          debugger
          if(t.userStatus == 'Activate')
          {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<button type="button" class="deactivateuser btn m-btn--pill    btn-secondary active" style="width:40%;" id='+t.employeeid+' >Deactivate</button>\t\t\t\t\t\t  \t'
          }
          else
          {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<button type="button" class="activateuser btn m-btn--pill    btn-secondary active" style="width:40%;"  id='+t.employeeid+' >Activate</button>\t\t\t\t\t\t  \t'
          }  
        }
      }
     
    ]
      
    }) 

    var self=this;
    this.t.on('m-datatable--on-layout-updated', function ()
    {
     $('.deactivateuser').click(function () {

      var Status="Activate";
      self.confirmation(this.id,Status);
     });

     $('.activateuser').click(function () { 
      
      var Status="Deactivate";
      self.confirmation(this.id,Status);
     });
    
  });




   
  
};

}
