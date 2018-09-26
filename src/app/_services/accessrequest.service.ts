import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccessrequestService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) { }

  pendriveRequest(username:any,description:any)
  {
    return this.http.get("http://localhost:8080/pendriveRequest?username="+username+"&description="+description);
  }
  internetRequest(username:any,description:any,duration:any)
  {
    return this.http.get("http://localhost:8080/internetAccessRequest?username="+username+"&description="+description+"&duration="+duration);
  }
  folderRequest(username:any,description:any,permission:any)
  {
    return this.http.get("http://localhost:8080/folderAccessRequest?username="+username+"&description="+description+"&permission="+permission);
  }
  stationaryItemRequest(username:any,description:any,item:any,quantity:any)
  {
    return this.http.get("http://localhost:8080/stationeryItemRequest?username="+username+"&description="+description+"&item="+item+"&quantity="+quantity);
  }

  pendirveActions(id:any,action:any)
  {
    return this.http.get("http://localhost:8080/actionOnPendriveRequest?id="+id+"&action="+action);
  }
  internetActions(id:any,action:any)
  {
    return this.http.get("http://localhost:8080/actionOnInternetRequest?id="+id+"&action="+action);
  }
  folderActions(id:any,action:any)
  {
    alert("in folderaction in service");
    return this.http.get("http://localhost:8080/actionOnFolderRequest?id="+id+"&action="+action);
  }
  sItemActions(id:any,action:any,item:any,noofquantity:any)
  {
    alert("in folderaction in service");
    return this.http.get("http://localhost:8080/actionOnSItemRequest?id="+id+"&action="+action+"&item="+item+"&noofquantity="+noofquantity);
  }

  
  pendriveDetailsById(id:any)
  {
    return this.http.get("http://localhost:8080/pendriveDetailsById?id="+id);
  }
  internetReqDetailsById(id:any)
  {
    return this.http.get("http://localhost:8080/internetReqDetailsById?id="+id);
  }
  folderReqDetailsById(id:any)
  {
    return this.http.get("http://localhost:8080/folderReqDetailsById?id="+id);
  }
  sItemReqDetailsById(id:any)
  {
    return this.http.get("http://localhost:8080/itemReqDetailsById?id="+id);
  }


  internetActionsWithComments(id:any,action:any,comments:any)
  {
    return this.http.get("http://localhost:8080/actionOnInternetRequest?id="+id+"&action="+action+"&comments="+comments);
  }
  pendriveActionsWithComments(id:any,action:any,comments:any)
  {
    return this.http.get("http://localhost:8080/actionOnPendriveRequest?id="+id+"&action="+action+"&comments="+comments);
  }
  folderActionsWithComments(id:any,action:any,comments:any)
  {
    return this.http.get("http://localhost:8080/actionOnFolderRequest?id="+id+"&action="+action+"&comments="+comments);
  }
  sItemActionsWithComments(id:any,action:any,comments:any,item:any,noofquantity:any)
  {
    return this.http.get("http://localhost:8080/actionOnSItemRequest?id="+id+"&action="+action+"&comments="+comments+"&item="+item+"&noofquantity="+noofquantity);
  }
}

