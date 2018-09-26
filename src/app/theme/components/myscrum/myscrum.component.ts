import { Component, OnInit } from '@angular/core';
import { User } from '../../pojo classes/user';
import { LeaveService } from '../../../_services/leave.service';
import { ScrumDetail } from '../../pojo classes/scrumdetail';

@Component({
  selector: 'app-myscrum',
  templateUrl: './myscrum.component.html',
  styleUrls: ['./myscrum.component.css']
})
export class MyscrumComponent implements OnInit {
  showForm:boolean=true;
  userlist:Array<any>=[];
  scrumobj:ScrumDetail=new ScrumDetail();
  constructor(private leaveService:LeaveService) { }

  ngOnInit() {
  }

  writeScrum()
  {
        this.showForm=false;
        var username=localStorage.getItem('currentUser');
        this.leaveService.getLeaveDetails(username).subscribe((data) => {
        this.userlist=JSON.parse(data['userList']);
        });
  }

  submitScrum()
  {
    alert(JSON.stringify(this.scrumobj));
    alert(this.scrumobj.notAssignWork);
  }



}
