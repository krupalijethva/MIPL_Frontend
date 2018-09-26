import { Component, OnInit } from '@angular/core';
declare let $: any;
import { Router } from '@angular/router';
import { UsersService } from '../../../_services/users.service';
declare var moment: any;
declare var swal: any;


@Component({
  selector: 'app-allemployeeprofile',
  templateUrl: './allemployeeprofile.component.html',
  styleUrls: ['./allemployeeprofile.component.css']
})
export class AllemployeeprofileComponent implements OnInit {

  t;
  constructor(private userS: UsersService, private router: Router) { }

  ngOnInit() 
  {
    this.DatatableRemoteAjaxDemo();
  }

  //Approve Details
  approveConfirm(userid, userid1) 
  {
      this.userS.approveEmployee(userid, userid1).subscribe(() => {
      this.t.reload();
    });
  }
  //Verify Detais
  verifyDetails(userid, userid1) 
  {
      this.userS.verifyDetails(userid, userid1).subscribe(() => {
      this.t.reload();
    });
  }
  approveEdit1(userid, userid1) 
  {
    var self = this;
    swal({
      text: "Are You Sure Want to Approve For Edit Employee Form?",
      icon: "success",
      confirmButtonText: "<span>Approve</span>",
      confirmButtonClass: "btn m-btn--pill    btn-outline-primary active",
      showCancelButton: !0,
      cancelButtonText: "<span>Cancel</span>",
      cancelButtonClass: "btn btn-secondary m-btn m-btn--pill m-btn--icon"
    }).then(function (e) 
    {
      if (e.value == true) 
      {
        self.approveConfirm(userid, userid1);
      } 
    });
  }

  DatatableRemoteAjaxDemo() 
  {
    this.t = $("#allemployee_data").mDatatable({
      data: {
        type: "remote",
        source:
        {
          read:
          {
            url: "http://localhost:8080/AllEmployeeprofile",
            map: function (t) {

              console.log(t);
              var e = t;
              console.log(e);
              return void 0 !== JSON.parse(t.data) && JSON.parse((e = t.data)), JSON.parse(e)
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
          field: "Approve",
          title: " ",
          sortable: !1,
          width: 110,
          overflow: "visible",

          template: function (t, e, a) {

            return '\t\t\t\t\t\t<div class="dropdown '
              + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="btn m-btn--pill    btn-outline-primary" data-toggle="dropdown">Action</span>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<button class="approveEdit dropdown-item" userid="' + t.user_id + '"  userid1="' + t.user1.id + '"><i class="la la-edit"></i> Approve</button>\t\t\t\t\t\t    \t<a  class="moreInfo dropdown-item"  id=' + t.user_id + '><i class="la la-leaf"></i>More Info</a>\t\t\t\t\t\t    \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
            // return '\t\t\t\t\t\t<div >\t\t\t\t\t\t\t<button userid="'+t.user_id+'"  userid1="'+t.user1.id+'" class="approveEdit btn m-btn--pill    btn-outline-primary active"  >Approve Edit</button>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
          }
        },
        {
          field: "Verify",
          title: " ",
          sortable: !1,
          width: 80,
          overflow: "visible",

          template: function (t, e, a) {
            if (t.varification == true) {
              return '\t\t\t\t\t\t<div >\t\t\t\t\t\t\t<button style="width:80px;" userid="' + t.user_id + '"  userid1="' + t.user1.id + '" class="verify btn m-btn--pill    btn-outline-danger active"  >Verify</button>\t\t\t\t\t\t</div>\t\t\t\t\t\t'
            }
            else {
              return '\t\t\t\t\t\t\t<span class="btn m-btn--pill    btn-outline-metal active" data-toggle="dropdown" style="width:80px;">Verified</span>\t\t\t\t\t\t\t'
            }
          }
        },

        {
          field: "emp_id",
          title: "Employee ID",
          width: 80
        },
        {
          field: "first_name",
          title: "First Name",
          width: 100
        },
        {
          field: "middle_name",
          title: "Middle Name",
          width: 100
        },
        {
          field: "last_name",
          title: "Last Name",
          width: 100
        },

        {
          field: "desig",
          title: "Designation",
          width: 100
        },

        {
          field: "branch",
          title: "Department",
          width: 100
        },
        {
          field: "email",
          title: "Email Id",
          width: 150
        },

        {
          field: "gender",
          title: "Gender",
          width: 100
        },
        {
          field: "birth_date",
          title: "Birth Date",
          width: 100,
          template: function (t) {
            this.date = new Date(t.birth_date);
            var format = moment(this.date).format('DD-MM-YYYY');
            return format
          }
        },

        {
          field: "contact_number",
          title: "Contact No",
          width: 100
        },
        {
          field: "present_city",
          title: "Present City",
          width: 100
        },
        {
          field: "permanent_city",
          title: "Permanent City",
          width: 100
        },

      ]
    });
    var self = this;
    $("#m_form_status").on("change", function ()
    {
      self.t.search($(this).val(), "punchStatus")
    }), $("#m_form_status").selectpicker()

    this.t.on('m-datatable--on-layout-updated', function () 
    {
      $('.approveEdit').click(function (e) 
      {
        var userid = e.target.getAttribute("userid");
        var userid1 = e.target.getAttribute("userid1");
        self.approveEdit1(userid, userid1);
      });
      $('.moreInfo').click(function (e) 
      {
        self.router.navigate(['', 'index', 'employeeprofile', e.target.id]);
      });
      $('.verify').click(function (e) 
      {
        var userid = e.target.getAttribute("userid");
        var userid1 = e.target.getAttribute("userid1");
        self.verifyDetails(userid, userid1);
      });
    });



  };

}
