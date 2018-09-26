import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LicenseDetail } from '../../pojo classes/licensedetail';
import { ActivatedRoute } from '@angular/router';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { LicenseserviceService } from '../../../_services/licenseservice.service';

@Component({
  selector: 'app-generatelicense',
  templateUrl: './generatelicense.component.html',
  styleUrls: ['./generatelicense.component.css']
})
export class GeneratelicenseComponent implements OnInit,AfterViewInit {
  file:File;
  disablevalidity:boolean=false;
  disablecontactno:boolean=true;
  disableaddress:boolean=false;
  licensetype:any;
  licenseObj:LicenseDetail=new LicenseDetail();
  constructor(private _ActivatedRoute: ActivatedRoute,private licenseService:LicenseserviceService,private _script: ScriptLoaderService) { }

  ngOnInit() {
    this.licensetype="Perpetual License";
    this.licenseObj.idLicenseDetail=this._ActivatedRoute.snapshot.params['id'];
    if(this.licenseObj.idLicenseDetail != null)
    {
     this.getLicenseDetails(this.licenseObj.idLicenseDetail);
    }
  }
  ngAfterViewInit()
  {
    this._script.loadScripts('app-generatelicense',['assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js']);
  }

  getLicenseDetails(id)
  {

    this.licenseService.getLicenseDetails(id).subscribe((data:LicenseDetail)=>{
      this.licenseObj=data;
      console.log(this.licenseObj);
      if(this.licenseObj != null)
      {
        this.disablecontactno=false;
        this.disableaddress=false;
      }
    })
  }
  generateLicense(id)
  {
    if(this.licensetype == "Time Limited License")
    {
      var result:any;
      result= $("#licensevalidity").val();
      var date=result.split("/");
      this.licenseObj.validtilldate= new Date(date[2]+"-"+date[0]+"-"+date[1]);
    }
    this.licenseService.generateLicense(this.licenseObj,this.licensetype).subscribe((data)=>{console.log(data);
      this.licenseObj.licensekey=data['licensekey'];
      this.licenseObj.application=data['appname'];
      if(this.licenseObj.licensekey == "")
      {
        alert("Invalid Registration key");
      }
      else
      {
        alert("License Key Successfully Generated");
      }
    
    });
  }

  toggleSelection(e)
  {
    if(e.target.value == "Time Limited License")
    {
      this.disablevalidity=true;
    }
    else
    {
      this.disablevalidity=false;
    }
  }
  onChange(e)
  {
    this.file= e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      let lines=fileReader.result.split('\n');
      for(let line=0;line<lines.length-1;line++)
      {
        var a1 = lines[line].split(',');
        if (a1[0] == "Username") {
          this.licenseObj.firstname=a1[1];
        }
        if (a1[0] == "EmailId") {
          this.licenseObj.email = a1[1];
        }
        if (a1[0] == "CompanyName") {
          this.licenseObj.company= a1[1];
        }
        if (a1[0] == "ContactNo") {
          this.licenseObj.contactno= a1[1];
        }
        if (a1[0] == "Address") {
          this.licenseObj.address = a1[1];
        }
        if (a1[0] == "RegistrationKey") {
          this.licenseObj.registrationkey = a1[1];
        }
      }
    }
    fileReader.readAsText(this.file);
    console.log(this.file);
  }



}
