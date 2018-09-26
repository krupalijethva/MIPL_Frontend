var DatatableChildRemoteDataDemo = {
 init: function() {
  $(".m_datatable").mDatatable({
   data: {
    type: "remote",
    source: {
     read: {
      url: "http://localhost:8080/getPendingLicenseDetails"
     }
    },
    pageSize: 10,
    serverPaging: !0,
    serverFiltering: !1,
    serverSorting: !0
   },
   layout: {
    theme: "default",
    scroll: !1,
    height: null,
    footer: !1
   },
   sortable: !0,
   pagination: !0,
   detail: {
    title: "Load sub table",
    content: function(t) {
        alert(t.data.idLicenseDetail);
     $("<div/>").attr("id", "child_data_ajax_" + t.data.idLicenseDetail).appendTo(t.detailCell).mDatatable({
      data: {
       type: "remote",
       source: {
        read: {
         url: "http://localhost:8080/getPendingLicenseDetails?licenseid="+t.data.idLicenseDetail,
         params: {
          query: {
           CustomerID: t.data.RecordID
          }
         }
        }
       },
       pageSize: 10,
       serverPaging: !0,
       serverFiltering: !1,
       serverSorting: !0
      },
      layout: {
       theme: "default",
       scroll: !1,
       height:null,
       footer: !1,
       spinner: {
        type: 1,
        theme: "default"
       }
      },
      sortable: !0,
      pagination: !1,
      columns: [{
       field: "RecordID",
       title: "#",
       sortable: !1,
       width: 20,
       responsive: {
        hide: "xl"
       }
      }, {
       field: "OrderID",
       title: "Order ID",
       template: function(t) {
        return "<span>" + t.OrderID + " - " + t.ShipCountry + "</span>"
       }
      }, {
       field: "quantity",
       title: "Country",
       width: 100
      }, {
       field: "country",
       title: "Ship Address"
      }, {
       field: "os",
       title: "Ship Name"
      }, 
      {
       field: "language",
       title: "Payment",
       type: "number"
      },
      {
        field: "contactno",
        title: "Payment",
        type: "number"
       },
       {
        field: "address",
        title: "Payment",
        type: "number"
       },
       {
        field: "remarks",
        title: "Payment",
        type: "number"
       },
       {
        field: "registrationkey",
        title: "Payment",
        type: "number"
       },
       {
        field: "internal",
        title: "Payment",
        type: "number"
       },
      ]
     })
    }
   },
   search: {
    input: $("#generalSearch")
   },
   columns: [{
    field: "company",
    title: "Company",
    sortable: "asc"
   }, {
    field: "firstname",
    title: "First Name"
   }, {
    field: "lastname",
    title: "Last Name"
   }, {
    field: "email",
    title: "Email"
   }, {
    field: "downloaddate",
    title: "Download Date"
   },
   {
    field: "application",
    title: "Appication"
   }, 
   {
    field: "Actions",
    width: 110,
    title: "Actions",
    sortable: !1,
    overflow: "visible",
    template: function(t, e, a) {
     return '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'
    }
   }]
  })
 }
};
jQuery(document).ready(function() {
 DatatableChildRemoteDataDemo.init()
});