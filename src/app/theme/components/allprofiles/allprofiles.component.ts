import { Component, OnInit } from '@angular/core';
declare let $: any;
import { Route, Router } from '@angular/router';
import { UsersService } from '../../../_services/users.service';

declare var moment: any;

@Component({
  selector: 'app-allprofiles',
  templateUrl: './allprofiles.component.html',
  styleUrls: ['./allprofiles.component.css']
})
export class AllprofilesComponent implements OnInit {

  t;
  emailList:[any];
  candidateUsername:any;
  userid:any;
  constructor(private router: Router,private userS:UsersService) { }

  ngOnInit() {
    this.DatatableRemoteAjaxDemo();

  }

getusernamelist(id)
{
this.userS.getUsernameList().subscribe((data)=>{
  console.log(data);
  this.emailList=data['userList'];
  this.userid=id;
});
}

moveToEmp(id)
{
  this.userS.moveToEmp(id,this.candidateUsername).subscribe((data)=>{this.t.reload();
  });
}

DatatableRemoteAjaxDemo() {

    this.t = $("#allcandidate_data").mDatatable({
      data: {
        type: "remote",
        source:
        {
          read:
          {
            url: "http://localhost:8080/getAllProfiles",
            map: function (t) {

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
          field: "user_id",
          title: "ID",
          width: 50
        },
        {
          field: "first_name",
          title: "First Name",
          width: 100
        },

        {
          field: "last_name",
          title: "Last Name",
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
          field: "contact_number",
          title: "Contact No",
          width: 100
        },
        {
          field: "appliedtype",
          title: "Applied For",
          width: 100
        },
        {
          field: "Actions",
          title: " ",
          sortable: !1,
          width: 100,
          overflow: "visible",

          template: function (t, e, a) {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<span class="approve btn-link" id="'+t.user_id+'" >     <i style="color:#716aca;" class="fa fa-info"></i>More Info       </span>\t\t\t\t\t\t</div>\t\t\t\t\t\t'

          }
        },
        {
          field: "Move",
          title: " ",
          sortable: !1,
          width: 100,
          overflow: "visible",

          template: function (t, e, a) {
            return '\t\t\t\t\t\t<div class="dropdown '
              + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="move btn m-btn--pill    btn-outline-primary" data-toggle="modal" data-target="#m_modal_4" id="'+t.user_id+'">Move To Employee</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t'

          }
        },

      ]
    })

    var self = this;
    $("#m_form_status").on("change", function () {
      self.t.search($(this).val(), "punchStatus")
    }), $("#m_form_status").selectpicker()

    this.t.on('m-datatable--on-layout-updated', function () {
      $('.approve').click(function (e) {
        self.router.navigate(['','index','candidateprofile',e.target.id]);
      });

      $('.move').click(function (e) {
        self.getusernamelist(e.target.id);     
      });
    });
  };



}
