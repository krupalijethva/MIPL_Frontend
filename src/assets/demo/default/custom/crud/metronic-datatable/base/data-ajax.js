var DatatableRemoteAjaxDemo = {
  init: function() {
    debugger
   var t;
   t = $(".m_datatable").mDatatable({
       
    data: {
        
     type: "remote",
     source: {
      read: {
       url: "http://localhost:8080/getpunchingdetails",
       map: function(t) {
           
        debugger
        var e = t;
        return void 0 !== t.data && (e = t.data), e
       }
      }
     },
     pageSize: 10,
     serverPaging: !0,
     serverFiltering: !0,
     serverSorting: !0
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
    columns: [  {
      field: "idPunching",
      title: "#",
      width: 50,
      sortable: !1,
      selector: !1,
      textAlign: "center",
    },
    
  {
    field: "logindate",
    title: "Date",
    type:"date",
   format:" dd/MM/yyyy "
   }, {
    field: "loginTime",
    title: "Punch In Time ",
    type:"date",
    format: "HH:mm"
    
   }, {
    field: "breakTime",
    title: "Break Time"
   }, {
    field: "logoutTime",
    title: "Punch Out Time",
    def:function () { 
     
      return new Date("logoutTime"); },
    type:"date",
    format: "HH:MM"
   }, {
    field: "totalHours",
    title: "totalHours",
    format: "HH:MM"
   }, {
    field: "punchStatus",
    title: "punchStatus",
    template: function(t) {
    debugger
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
      //  class: " m-badge--primary"
      class:" m-badge--brand"
      },
      LOGGEDIN: {
       title: "Live",
       class: " m-badge--success"
      },
      DENIED: {
       title: "DENIED",
       class: " m-badge--info"
      },
      LATEENTRY: {
       title: "LATEENTRY",
       class: " m-badge--danger"
      },
     
     };
    
     return '<span class="m-badge ' + e[t.punchStatus].class + ' m-badge--wide">' + e[t.punchStatus].title + "</span>"
    }
   }, 
   {
    field: "ac",
    title: "Active Collab Hours",
    format: "HH:MM"
   },
   {
   field: "Actions",
   title: "Actions",
   sortable: !1,
   overflow: "visible",
   template: function(t, e, a) {
     debugger
    return '\t\t\t\t\t\t<div class="dropdown ' 
    + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<span href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </span>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a  class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<button type="button" id="'+t.idPunching+'" value="'+t.idPunching+'" class="editpunching m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit" ></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'
   }
  }]
   }), $("#m_form_status").on("change", function() {
    t.search($(this).val(), "Status")
   }), $("#m_form_type").on("change", function() {
    t.search($(this).val(), "Type")
   }), $("#m_form_status, #m_form_type").selectpicker()
  }
 };
 jQuery(document).ready(function() {
  DatatableRemoteAjaxDemo.init()
 });