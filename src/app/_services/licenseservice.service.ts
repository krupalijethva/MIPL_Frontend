import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LicenseDetail } from '../theme/pojo classes/licensedetail';

@Injectable()
export class LicenseserviceService {

  constructor(private http:HttpClient) { }

  requestLicense(username:any,regkey:any)
  {
    let body: FormData= new FormData();
    body.append("username",username);
   body.append("regkey",regkey);
    return this.http.post("http://localhost:8080/requestLicense",body);
  }
  deleteLicense(licenseid:any)
  {
    let body: FormData= new FormData();
    body.append("licenseid",licenseid);
    return this.http.post("http://localhost:8080/deleteLicense",body);
  }
  getLicenseDetails(id:any)
  {
    let body: FormData= new FormData();
    body.append("licenseid",id);
    return this.http.post("http://localhost:8080/readLicenseDetails",body);
  }
  generateLicense(licenseObj:LicenseDetail,licensetype:String)
  {
    return this.http.post("http://localhost:8080/generateLicenseKeywithobj?licensetype="+licensetype,licenseObj);
  }
      
}
