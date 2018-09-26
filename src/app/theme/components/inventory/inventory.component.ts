import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../_services/inventory.service';

declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  t;
  inventory_id:any;
  quantity:any;
  item:any;
  constructor(private inventoryService:InventoryService) { }

  ngOnInit() {
    this.DatatableRemoteAjaxDemo();
  }
  addQuantity(id)
  {
    alert(id);
    this.inventoryService.addQuantity(id,this.quantity).subscribe(()=>{this.t.reload();this.quantity=null;})
  }
  addItem()
  {
    this.inventoryService.addItem(this.item,this.quantity).subscribe(()=>{this.t.reload();this.quantity=null;this.item=null;});
  }

  DatatableRemoteAjaxDemo()
  {
    this.t = $(".m_datatable").mDatatable({
      data: {
        type: "remote",
        source:
         {
          read:
           {
            url: "http://localhost:8080/getInventoryStocks",
            map: function (t) 
            {
              var e = t;
              console.log(e);
              return void 0 !== t.data && (e = t.data), e;
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
          title: "ADD",
          width:100,
          textAlign: "center",
          sortable: !1,
          overflow: "visible",
          template: function (t, e, a) 
          {
            return '\t\t\t\t\t\t<div>\t\t\t\t\t\t\t<button type="button" class="add btn m-btn--pill    btn-outline-primary" data-toggle="modal" data-target="#m_modal_4" id='+t.id+'>ADD</button>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t'
          }
          },
        {
          field: "item",
          title: "Item",
          width:200
        },
        {
          field: "totalavailablequantity",
          title: "Total Available Quantity ",
          width:200
        }
    ]
    });
    var self = this;
     $("#m_form_status").on("change", function()
    {
     self.t.search($(this).val(), "leaveStatus")
    }), $("#m_form_status").selectpicker()

    this.t.on('m-datatable--on-layout-updated', function ()
    {
     $('.add').click(function (e) {
      self.inventory_id=null;
      self.inventory_id=this.id;
     });
  });  
  };
}
