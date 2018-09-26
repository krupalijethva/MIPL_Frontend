import { Component, OnInit } from '@angular/core';

import { Candidatedetail } from '../../pojo classes/candidatedetail';
import { QualificationDetail } from '../../pojo classes/qualificationdetail';
import { TrainingDetail } from '../../pojo classes/trainingdetail';
import { LanguageDetail } from '../../pojo classes/languagedetail';
import { ExpirenceDetail } from '../../pojo classes/experiencedetail';
import { SoftwareDetail } from '../../pojo classes/softwaredetail';
import { ActivityDetail } from '../../pojo classes/activitydetail';
import { MembershipDetail } from '../../pojo classes/memberdetail';

import { EmployeeDetail } from '../../pojo classes/employeedetail';
import { Country } from '../../pojo classes/country';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { UsersService } from '../../../_services/users.service';
declare let $: any;
declare let Dropzone: any;
declare var moment: any;
declare var swal: any;
@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {

  countryList: any[];
  userid: any;
  qualiinsert: boolean = false;
  employee: EmployeeDetail = new EmployeeDetail();
  qualification: QualificationDetail = new QualificationDetail();
  training: TrainingDetail = new TrainingDetail();
  language: LanguageDetail = new LanguageDetail();
  experience: ExpirenceDetail = new ExpirenceDetail();
  software: SoftwareDetail = new SoftwareDetail();
  activity: ActivityDetail = new ActivityDetail();
  membership: MembershipDetail = new MembershipDetail();

  qualificationdetail: QualificationDetail[] = [];
  trainingdetail: TrainingDetail[] = [];
  languagedetail: LanguageDetail[] = [];
  expirencedetail: ExpirenceDetail[] = [];
  softwaredetail: SoftwareDetail[] = [];
  activitydetail: ActivityDetail[] = [];
  membershipdetail: MembershipDetail[] = [];

  QualiForm: boolean = true;
  TrainingForm: boolean = true;
  LangForm: boolean = true;
  WorkEForm: boolean = true;
  SoftSForm: boolean = true;
  ActivtyForm: boolean = true;
  MembershipForm: boolean = true;

  showNotice: boolean = true;
  same: boolean = false;
  existresume: boolean = false;
  existphoto:boolean=false;
  showResumeDropzone:boolean=false;
  showPhotoDropzone:boolean=false;

  // success:boolean=true;

  constructor(private _script: ScriptLoaderService, private userService: UsersService) { }
  ngOnInit() 
  {
    this.getEmployeeDetails();
    this.loadCountry();
    var self = this;
    $('#currentWorking').on('switchChange.bootstrapSwitch', function (event, state) {

      if ($('#currentWorking').prop("checked") == true) {
        self.showNotice = false;
      }
      else {
        self.showNotice = true;

      }
    });
    $('#ppsame').on('switchChange.bootstrapSwitch', function (event, state) {

      if ($('#ppsame').prop("checked") == true) {
        self.same = true;
      }
      else {
        self.same = false;
      }
    });

  }
  ngAfterViewInit() {
    this._script.loadScripts('app-employeeform',
      ['assets/demo/default/custom/crud/wizard/wizard.js', 'assets/demo/default/custom/crud/forms/widgets/bootstrap-switch.js', 'assets/demo/default/custom/crud/forms/widgets/input-mask.js', 'assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js', 'assets/demo/default/custom/crud/forms/widgets/dropzone.js']);
    Dropzone._autoDiscoverFunction();
  }

  //allow digits only in percentage      
  check(e, c) {
    var allowedKeyCodesArr = [9, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 39, 109, 189, 46, 110, 190];  // allowed keys
    if ($.inArray(e.keyCode, allowedKeyCodesArr) === -1) {  // if event key is not in array and its not Ctrl+V (paste) return false;
      e.preventDefault();
    } else if ($.trim($(c).val()).indexOf('.') > -1 && $.inArray(e.keyCode, [110, 190]) !== -1) {  // if float decimal exists and key is not backspace return fasle;
      e.preventDefault();
    } else {
      return true;
    }

  }

  //Load Country
  loadCountry()
  {
    this.countryList = Country.countrylist;
  }

  //get Employee Details 
  getEmployeeDetails() {
    var username = localStorage.getItem('currentUser');
    this.userService.getEmployeeDetails(username).subscribe(
      (data) => {
        this.employee = JSON.parse(data['empData']);
        this.qualificationdetail = this.employee.qualificationdetail;
        this.trainingdetail = this.employee.trainingdetail;
        this.languagedetail = this.employee.languagedetail;
        this.expirencedetail = this.employee.expirencedetail;
        this.softwaredetail = this.employee.softwaredetail;
        this.activitydetail = this.employee.activitydetail;
        this.membershipdetail = this.employee.membershipdetail;
        var date=this.employee.joining_date;

      
        $("#DOB").datepicker("setDate",new Date(this.employee.birth_date));
        $("#WorkJoinDate").datepicker("setDate",new Date(this.employee.joining_date));
        
        // if(this.employee.approved == true)
        // {
        //   this.success=true;
        // }
        // else
        // {
        //   this.success=false;
        // }

        console.log(this.employee);
        debugger
        if (this.employee.new_resume !== "" && this.employee.new_resume !== null) 
        {
          this.existresume = true;
        }
        else
        {
          this.showResumeDropzone=true;
        }
        if (this.employee.newphoto !== "" && this.employee.newphoto !== null ) 
        {
          this.existphoto = true;
        }
        else
        {
          this.showPhotoDropzone=true;
        }
      });

  }

  //Show And Hide Child Forms 
  showQualiForm() {
    this.QualiForm = false;
  }
  hideQuali() {
    this.QualiForm = true;
    this.qualification = new QualificationDetail();
    $("input[name=startdate]").val('');
    $("input[name=enddate]").val('');
  }
  showTrainingForm() {
    this.TrainingForm = false;

  }
  hideTrainingForm() {
    this.TrainingForm = true;
    this.training = new TrainingDetail();
    $("input[name=Tfromdate]").val('');
    $("input[name=Ttodate]").val('');
  }

  showLangForm() {
    this.LangForm = false;
  }
  hideLangForm() {
    this.LangForm = true;
    this.language = new LanguageDetail();
  }
  showWorkEForm() {
    this.WorkEForm = false;

  }
  hideWorkEForm() {
    this.WorkEForm = true;
    this.experience = new ExpirenceDetail();
    $("input[name=joindate]").val('');
    $("input[name=relievedate]").val('');
  }
  showSoftSForm() {
    this.SoftSForm = false;
  }
  hideSoftSForm() {
    this.SoftSForm = true;
    this.software = new SoftwareDetail();
  }
  showActivtyForm() {
    this.ActivtyForm = false;
  }
  hideActivtyForm() {
    this.ActivtyForm = true;
    this.activity = new ActivityDetail();
    $("input[name=activityyear]").val('');
  }
  showMembershipForm() {
    this.MembershipForm = false;
  }
  hideMembershipForm() {
    this.MembershipForm = true;
    this.membership = new MembershipDetail();
    $("input[name=expirydate]").val('');
  }

  //add Qualification Detail in the List
  submitQualification() 
  {
    var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
    var degit = /^[0-9]+$/;

    if (this.qualification.qualification == null || this.qualification.school_collage == null || this.qualification.board_uni == null || this.qualification.persentage == null || $("input[name=startdate]").val() == '' || $("input[name=enddate]").val() == '') {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=startdate]").val() != '' && $("input[name=enddate]").val() != '') {
      var s = $("input[name=startdate]").val();
      var e = $("input[name=enddate]").val();
      var start, month1, year1, end, month2, year2;
      start = s.split("/");
      month1 = start[1];
      year1 = start[2];

      end = e.split("/");
      month2 = end[1];
      year2 = end[2];
      if (year1 > year2) {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=startdate]").val('');
        $("input[name=enddate]").val('');
      }
      else if (year1 == year2) {
        if (month1 > month2) {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=startdate]").val('');
          $("input[name=enddate]").val('');
        }
        else {
          this.qualiinsert = true;
        }
      }
      else {
        this.qualiinsert = true;
      }
      if (this.qualiinsert == true) {
        var s1 = $("input[name=startdate]").val();
        var e1 = $("input[name=enddate]").val();
        var start1 = s.split("/");
        var end1 = e.split("/");

        this.qualification.startdate = new Date(start1[2] + "-" + start1[1] + "-" + start1[0]);
        this.qualification.enddate = new Date(end1[2] + "-" + end1[1] + "-" + end1[0]);
        this.qualificationdetail.push(this.qualification);
        console.log(this.qualificationdetail);
        this.qualification = new QualificationDetail();
        $("input[name=startdate]").val('');
        $("input[name=enddate]").val('');
        this.QualiForm = true;
      }
    }
  }
  //add Training Detail in the List
  submitTraining() {
    var qualiinsert = false;
    if (this.training.course_name == null || this.training.institute == null || $("input[name=Tfromdate]").val() == '' || $("input[name=Ttodate]").val() == '') {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=Tfromdate]").val() != '' || $("input[name=Ttodate]").val() != '') {
      var f = $("input[name=Tfromdate]").val();
      var t = $("input[name=Ttodate]").val();
      var from = f.split("/");
      var frommonth = from[1];
      var fromyear = from[2];
      var to = t.split("/");
      var tomonth = to[1];
      var toyear = to[2];

      if (fromyear > toyear) {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=Tfromdate]").val('');
        $("input[name=Ttodate]").val('');
      }
      else if (fromyear == toyear) {
        if (frommonth > tomonth) {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=Tfromdate]").val('');
          $("input[name=Ttodate]").val('');
        }
        else {
          qualiinsert = true;
        }

      }
      else {
        qualiinsert = true;

      }
      if (qualiinsert == true) {
        var f1 = $("input[name=Tfromdate]").val();
        var t1 = $("input[name=Ttodate]").val();
        var fromdate = f1.split("/");
        var todate = t1.split("/");
        this.training.from_date = new Date(fromdate[2] + "-" + fromdate[1] + "-" + fromdate[0]);
        this.training.to_date = new Date(todate[2] + "-" + todate[1] + "-" + todate[0]);

        this.trainingdetail.push(this.training);
        console.log(this.trainingdetail);
        this.training = new TrainingDetail();
        $("input[name=Tfromdate]").val('');
        $("input[name=Ttodate]").val('');
        this.TrainingForm = true;
      }
    }
  }
  //add language Detail in the List
  submitLang() {
    if (this.language.lanuguage == null || this.language.speak_level == null || this.language.read_level == null || this.language.write_level == null) {
      swal("", "please fill all the required fields", "error");
    }
    else {
      this.languagedetail.push(this.language);
      console.log(this.languagedetail);
      this.language = new LanguageDetail();
      this.LangForm = true;
    }
  }
  //add Experience Detail in the List
  submitExperience() {
    var check = false;
    if (this.experience.company_name == null || this.experience.designation == null || $("input[name=joindate]").val() == '' || this.experience.nature_duties == null) {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=relievedate]").val() != '') {
      var f = $("input[name=joindate]").val();
      var t = $("input[name=relievedate]").val();
      var from = f.split("/");
      var frommonth = from[1];
      var fromyear = from[2];
      var to = t.split("/");
      var tomonth = to[1];
      var toyear = to[2];

      if (fromyear > toyear) {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=joindate]").val('');
        $("input[name=relievedate]").val('');
      }
      else if (fromyear == toyear) {
        if (frommonth > tomonth) {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=joindate]").val('');
          $("input[name=relievedate]").val('');
        }
        else {
          check = true;
        }

      }
      else {
        check = true;

      }
      if (check == true) {
        var f1 = $("input[name=joindate]").val();
        var t1 = $("input[name=relievedate]").val();
        var from1 = f1.split("/");
        var to1 = t1.split("/");
        this.experience.joining_date = new Date(from1[2] + "-" + from1[1] + "-" + from1[0]);
        this.experience.reliving_date = new Date(to1[2] + "-" + to1[1] + "-" + to1[0]);

        this.expirencedetail.push(this.experience);
        console.log(this.expirencedetail);
        this.experience = new ExpirenceDetail();
        $("input[name=joindate]").val('');
        $("input[name=relievedate]").val('');
        this.WorkEForm = true;
        console.log()
      }
    }
    else {
      var f1 = $("input[name=joindate]").val();
      var t1 = $("input[name=relievedate]").val();
      var from1 = f1.split("/");
      var to1 = t1.split("/");
      this.experience.joining_date = new Date(from1[2] + "-" + from1[1] + "-" + from1[0]);
      this.experience.reliving_date = new Date(to1[2] + "-" + to1[1] + "-" + to1[0]);

      this.expirencedetail.push(this.experience);
      console.log(this.expirencedetail);
      this.experience = new ExpirenceDetail();
      $("input[name=joindate]").val('');
      $("input[name=relievedate]").val('');
      this.WorkEForm = true;
    }
  }
  //add Software Detail in the List
  submitSoftware() {
    if (this.software.software_name == null || this.software.proficiency == null) {
      swal("", "please fill all the required fields", "error");
    }
    else {
      this.softwaredetail.push(this.software);
      console.log(this.softwaredetail);
      this.software = new SoftwareDetail();
      this.SoftSForm = true;
    }
  }
  //add Activity Detail in the List
  submitActivity() {
    if (this.activity.activity_name == null || this.activity.activity_institute == null || $("input[name=activityyear]").val() == '') {
      swal("", "please fill all the required fields", "error");
    }
    else {
      this.activity.year = moment($("input[name=activityyear]").val()).format('YYYY-MM-DD');
      this.activitydetail.push(this.activity);
      console.log(this.activitydetail);
      this.activity = new ActivityDetail();
      $("input[name=activityyear]").val('');
      this.ActivtyForm = true;

    }
  }
  //add Membership Detail in the List
  submitMembership() {
    if (this.membership.membership_name == null || $("input[name=expirydate]").val() == '') {
      swal("", "please fill all the required fields", "error");
    }
    else {
      this.membership.expiry_date = moment($("input[name=expirydate]").val()).format('YYYY-MM-DD');
      this.membershipdetail.push(this.membership);
      console.log(this.membershipdetail);
      this.membership = new MembershipDetail();
      $("input[name=expirydate]").val('');
      this.MembershipForm = true;
    }
  }

  //Remove Data From List
  removeQuali(index) {
    this.qualificationdetail.splice(index, 1);
  }
  removetraining(index) {
    this.trainingdetail.splice(index, 1);
  }
  removeLang(index) {
    this.languagedetail.splice(index, 1);
  }
  removeExperience(index) {
    this.expirencedetail.splice(index, 1);
  }
  removeSoftware(index) {
    this.softwaredetail.splice(index, 1);
  }
  removeActivity(index) {
    this.activitydetail.splice(index, 1);
  }
  removeMembership(index) {
    this.membershipdetail.splice(index, 1);
  }

  //Update Final Employee Details 
  updateEmployee(id) 
  {
    if ($('#m_form').valid() == true) 
    {
      if ($('#ppsame').prop("checked") == true) 
      {
        this.employee.permanent_address = this.employee.present_address;
        this.employee.permanent_city = this.employee.present_city;
        this.employee.permanentt_code = this.employee.present_code;
        this.employee.permanent_state = this.employee.present_state;
        this.employee.permanent_country = this.employee.present_country;
      }
      if ($('#shift').prop("checked") == true) 
      {
        this.employee.wellness_work = "Yes";
      }
      else
      {
        this.employee.wellness_work = "No";
      }
      if($("#DOB").val() != '')
      {
        this.employee.birth_date = moment($("#DOB").val()).format('YYYY-MM-DD');
      }
    
      if($("#WorkJoinDate").val() != '')
      {
        var s=$("#WorkJoinDate").val();
        alert(s);
        var jdate=s.split("/");
        alert((jdate[1]+"-"+jdate[0]));
        alert(new Date(jdate[1]+"-"+jdate[0]));
        this.employee.joining_date = new Date(jdate[2]+"-"+jdate[1]+"-"+jdate[0]);
        alert(this.employee.joining_date)
      }
      this.employee.qualificationdetail = this.qualificationdetail;
      this.employee.trainingdetail = this.trainingdetail;
      this.employee.languagedetail = this.languagedetail;
      this.employee.expirencedetail = this.expirencedetail;
      this.employee.softwaredetail = this.softwaredetail;
      this.employee.activitydetail = this.activitydetail;
      this.employee.membershipdetail = this.membershipdetail;
      this.employee.alternate_contact=$("#altcontact").val();
      this.employee.contact_number = $("#contact_no").val();
      var changeResumename=$("#fileupload").val();
      var changePhotoname=$("#photoupload").val();
      
      this.userService.insertEmployeeDetails(id, this.employee,changeResumename,changePhotoname).subscribe(() => { 
      swal("Successfully Edited!", "", "success");
        // this.success=false;
        this.qualification = new QualificationDetail();
        this.training = new TrainingDetail();
        this.language = new LanguageDetail();
        this.experience=new ExpirenceDetail();
        this.software = new SoftwareDetail();
        this.activity = new ActivityDetail();
        this.membership = new MembershipDetail();
      });
      
    }
  }


  //Download Photo ANd Resume 
  getPhoto(newphoto, originalphoto) {
    this.userService.getResume(newphoto).subscribe(
      (data) => {
        this.downloadFile(data, originalphoto);
      });
  }
  getFile(newResume, originalfile) {
    this.userService.getResume(newResume).subscribe(
      (data) => {
        this.downloadFile(data, originalfile);
      });
  }
  downloadFile(data, filename: any) {
    debugger
    var csvData = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    var csvURL = window.URL.createObjectURL(csvData);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', filename);
    tempLink.click();
  }


  //Change Resume and Photo
  changeResume(newresume,oldresume,user_id) 
  {
    this.showResumeDropzone=true;
    this.existresume=false;
  }
  changePhoto(newphoto,oldphoto,user_id) 
  {
    this.showPhotoDropzone=true;
    this.existphoto=false;
  }
}
