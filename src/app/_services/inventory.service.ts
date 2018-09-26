import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InventoryService {

  constructor(private http:HttpClient) { }

  addQuantity(id:any,quantity:any)
  {
    alert("in service");
    return this.http.get("http://localhost:8080/addQuantity?id="+id+"&quantity="+quantity);
  }

  addItem(item:any,quantity:any)
  {
    alert("in service");
    return this.http.get("http://localhost:8080/addItem?item="+item+"&quantity="+quantity);
  }

}
