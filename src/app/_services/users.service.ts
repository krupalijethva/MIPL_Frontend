import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { ExitEmployeeDetail } from '../theme/pojo classes/exitemployeedetail';
import { Candidatedetail } from '../theme/pojo classes/candidatedetail';
import { EmployeeDetail } from '../theme/pojo classes/employeedetail';


@Injectable()
export class UsersService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) 
  { 
  }

  getEmployeeDetails(username:String)
  {

         return this.http.get("http://localhost:8080/ReadEmployee?username="+username);
  }
 
  exitEmployee(eed:ExitEmployeeDetail)
  {
    return this.http.post("http://localhost:8080/ExitEmployeeDetails",eed,{headers : this.headers});
  }

  changeEmpStatus(empid:any,Status:any)
  {
    alert(Status);
    return this.http.put("http://localhost:8080/deactivateUser?empid="+empid+"&status="+Status, {headers : this.headers});
  }

  getActiveUserList()
  {

         return this.http.get("http://localhost:8080/getActiveUserList");
  }

  insertUserDetails(candidate:Candidatedetail)
  {
    return this.http.post("http://localhost:8080/InterviewForm",candidate, {headers : this.headers});
  }

  getCandidateDetail(id)
  {
    return this.http.get("http://localhost:8080/getCandidaProfile?id="+id);
  }

  getResume(Filename:any)
  {
    return  this.http.get("http://localhost:8080/getFiles?filename="+Filename,{responseType:'blob'});
  }
  getUsernameList()
  {
    return this.http.get("http://localhost:8080/getUsernameList");
  }
  moveToEmp(id:any,username:any)
  {
    alert();
    return this.http.get("http://localhost:8080/moveToEmployee?cid="+id+"&username="+username);
  }
 approveEmployee(userid:any,userid1:any)
 {
  return this.http.get("http://localhost:8080/approvetoEmployee?userid="+userid+"&userid1="+userid1);
 }
 verifyDetails(userid:any,userid1:any)
 {
  return this.http.get("http://localhost:8080/verificationDetail?userid="+userid+"&userid1="+userid1);
 }

 getEmployeeDetailsById(userid:any)
  {

         return this.http.get("http://localhost:8080/ReadEmployeeById?userid="+userid);
  }
  insertEmployeeDetails(userid:any,employee:EmployeeDetail,changeResumename:any,changePhotoname:any)
  {
    return this.http.post("http://localhost:8080/EmployeeForm?user_id="+userid+"&changeResumename="+changeResumename+"&changePhotoname="+changePhotoname,employee, {headers : this.headers});
  }

  deleteResume(newfile:any,oldfile:any,user_id:any)
  {
    alert();
    return this.http.get("http://localhost:8080/deleteResume?newfile="+newfile+"&oldfile="+oldfile+"&user_id="+user_id);
  }
  deletePhoto(newfile:any,oldfile:any,user_id:any)
  {
    alert();
    return this.http.get("http://localhost:8080/deletePhoto?newfile="+newfile+"&oldfile="+oldfile+"&user_id="+user_id);
  }

}
