import { Component, OnInit } from '@angular/core';
import { ExitEmployeeDetail } from '../../pojo classes/exitemployeedetail';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { UsersService } from '../../../_services/users.service';

declare let $: any;
declare var moment: any;
@Component({
  selector: 'app-exitform',
  templateUrl: './exitform.component.html',
  styleUrls: ['./exitform.component.css']
})
export class ExitformComponent implements OnInit {

  exitEmpDetail:ExitEmployeeDetail= new ExitEmployeeDetail();
  appliedDate:any;
  activeUser:[any];

  constructor(private _script: ScriptLoaderService,private userService:UsersService) { }

  ngOnInit() 
  {
    this._script.loadScripts('app-exitform',['assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js','assets/demo/default/custom/crud/forms/validation/form-controls.js']);
    this.getActiveUserList();
  }


  getActiveUserList()
  {
    this.userService.getActiveUserList().subscribe((data)=>{
        this.activeUser=JSON.parse(data['userList']);
   
    });
  }

  exitEmpDetailSubmit()
  {

    alert( $("#exitform").valid() );
    if(($("#exitform").valid()) == true)
    {
    this.appliedDate=$("input[name=applieddate]").val();
   
    this.exitEmpDetail.applieddate=new Date(moment(this.appliedDate).format('DD-MMM-YYYY'));
    // alert(this.exitEmpDetail.applieddate);

    // alert(this.exitEmpDetail.username);
    // alert(this.exitEmpDetail.reason);
    // alert(this.exitEmpDetail.applieddate);
    // alert(this.exitEmpDetail.otherEquipment);
    // alert(this.exitEmpDetail.idcard);
    // alert(this.exitEmpDetail.deskkey);
    // alert(this.exitEmpDetail.material);
    // alert(this.exitEmpDetail.companyvehicle);

    
    this.userService.exitEmployee(this.exitEmpDetail).subscribe(()=>
    {
      alert("Successfully Submitted");
      this.exitEmpDetail = new ExitEmployeeDetail();});
      $("input[name=applieddate]").val('');
    }
  }

}
