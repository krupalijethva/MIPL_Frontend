import { Component, OnInit } from '@angular/core';
import { LicenseserviceService } from '../../../_services/licenseservice.service';

declare var swal: any;
@Component({
  selector: 'app-requestlicense',
  templateUrl: './requestlicense.component.html',
  styleUrls: ['./requestlicense.component.css']
})
export class RequestlicenseComponent implements OnInit {

  username:any;
  regkey:any;
  licensekey:any;
  msg:any;
  constructor(private licenseService:LicenseserviceService) { }

  ngOnInit() {
    this.username=localStorage.getItem('currentUser');
  }
  requestLicense()
  {
    alert(this.regkey);
    this.licenseService.requestLicense(this.username,this.regkey).subscribe((data)=>
    {
      console.log(data);
      this.licensekey=data['licensekey'];
      if(this.licensekey == "")
      {
        alert("Invalid Registration key");
      }
      else
      {
        alert("License Key Successfully Generated");
      }
    });
  }

}
