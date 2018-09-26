import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LeaveService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http:HttpClient) { }



      getLeaveRecords(username:String):any
      {
             return this.http.get("http://localhost:8080/getLeaveRecords/"+username);
      }


      getLeaveDetails(username:String):any
      {
            return this.http.get("http://localhost:8080/manageLeave/"+username);
      }

      getCredit(username:String)
      {
            return this.http.get("http://localhost:8080/getCredit/"+username,{responseType: 'text'})
      }

      insertleave(User,teamlead:String,durationval:String,fromdate:any,todate:any,fromdatetime:any,todatetime:any,reason:String,username:String)
      {
           return this.http.post("http://localhost:8080/insertLeave?teamlead="+teamlead+"&durationval="+durationval+"&fromdate="+fromdate+"&todate="+todate+"&fromdatetime="+fromdatetime+"&todatetime="+todatetime+"&reason="+reason+"&username="+username,JSON.stringify(User), {headers : this.headers}).toPromise().then(()=>{});
      }

      deleteLeaveRecord(id)
      {
            return this.http.delete("http://localhost:8080/deleteLeave/"+id, {headers : this.headers}).toPromise().then(()=>{
  
            });
      }


      //approval Leave
    approveRecords(id:any,action:any,comments:any,username:any,name:any)
    {
      //   return null;
      alert("hello");
        return this.http.get("http://localhost:8080/approveLeave?id="+id+"&action="+action+"&comments="+comments+"&username="+username+"&name="+name);
    }

    getLRecord(id):Observable<any>
    {
        return this.http.get<any>("http://localhost:8080/leaveRecords/"+id);
    }

    //assign Leave

    assignLeave(id,leavecatagory)
    {
        return this.http.get("http://localhost:8080/assignLeaveInsert?id="+id+"&leaveCategory="+leavecatagory);
    }


}
