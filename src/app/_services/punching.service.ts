import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { PunchingDetail } from '../theme/Pojo Classes/punchingdetails';
import { PunchingDetailEdit } from '../theme/pojo classes/punchingdetailsedit';


@Injectable()
export class PunchingService {


    private isUserLoggedin;
    status;
    loggin: boolean;
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {
        this.isUserLoggedin = false;
    }

    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }

    setLoggedin() {
        debugger
        this.isUserLoggedin = true;
    }
    getloggedin() {
        return this.isUserLoggedin;
    }

    punchingdetails(username: String): Observable<PunchingDetail[]> {
        return this.http.get<PunchingDetail[]>('http://localhost:8080/getPunching/' + username);
    }

    editPunching(PunchingDetailEdit, id) {
        return this.http.put('http://localhost:8080/editPunching/' + id, JSON.stringify(PunchingDetailEdit), { headers: this.headers }).toPromise().then(() => { });

    }

    getpunchingdetail(id): Observable<PunchingDetailEdit> 
    {
        return this.http.get<PunchingDetailEdit>("http://localhost:8080/getPunchingDetail/" + id);

    }
    newPunching(PunchingDetailEdit, teamlead: String,username:String) 
    {
        alert('http://localhost:8080/newPunching?username=' + username+'&teamlead='+teamlead);
        return this.http.post('http://localhost:8080/newPunching?username=' + username+'&teamlead='+teamlead, JSON.stringify(PunchingDetailEdit), { headers: this.headers }).toPromise().then(() => { });
    }


    deletePunch(id) {
        return this.http.delete("http://localhost:8080/deletepunch/" + id, { headers: this.headers }).toPromise().then(() => {
        });

    }
    loginuser(username: String, password: String, action: String): any {
        return this.http.get("http://localhost:8080/loginpage/" + username + "/" + password + "/" + action);


    }
    newloginuser(username:any, password:any, action:any) {
        //var body="username="+username+"&password="+password+"action="+action
        let body: FormData= new FormData();
        body.append("username",username);
        body.append("password",password);
        body.append("action",action);
        return this.http.post("http://localhost:8080/login",body)
            .pipe(map((res: any) => {
                this.loggin = res['validuser'];
                if (this.loggin) {


                    localStorage.setItem('currentUser', username);
                }
                return res;
            }));
    }
    break(username: any, action: any): Observable<any> {

        let body: FormData= new FormData();
        body.append("username",username);
        body.append("action",action);
        return this.http.post("http://localhost:8080/punching" ,body, { responseType: 'text' });
    }

    punchout(username: any, action: any) {
        let body: FormData= new FormData();
        body.append("username",username);
        body.append("action",action);
        return this.http.post("http://localhost:8080/punching",body, { responseType: 'text' });
    }
    logout() {
        localStorage.removeItem('currentUser');
    }
    private handleError(error: any): Promise<any> {
        console.error('Error', error); // for demo purpos es only
        return Promise.reject(error.message || error);
    }


    //Admin

    getPunchingRecords(fromdate: any, todate: any)
    {
        
     return  this.http.get("http://localhost:8080/generateRecords/"+fromdate+"/"+todate,{responseType:'blob'});
       
      
    }
    getMonthlyRecords(month: any)
    {
       alert(month);
     return  this.http.get("http://localhost:8080/generateMonthlyRecords/"+month,{responseType:'blob'});
       
      
    }



    //Approve Records
    approveRecords(id:any,action:any,comments:any)
    {
        
        return this.http.get("http://localhost:8080/recordAction?id="+id+"&action="+action+"&comments="+comments);
    }

    getRecord(id)
    {
       
        return this.http.get("http://localhost:8080/getParticularRecord/"+id);
    }


}
