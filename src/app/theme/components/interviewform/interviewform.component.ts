import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Candidatedetail } from '../../pojo classes/candidatedetail';
import { QualificationDetail } from '../../pojo classes/qualificationdetail';
import { TrainingDetail } from '../../pojo classes/trainingdetail';
import { LanguageDetail } from '../../pojo classes/languagedetail';
import { SoftwareDetail } from '../../pojo classes/softwaredetail';
import { ActivityDetail } from '../../pojo classes/activitydetail';
import { MembershipDetail } from '../../pojo classes/memberdetail';
import { ExpirenceDetail } from '../../pojo classes/experiencedetail';
import { Country } from '../../pojo classes/country';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { UsersService } from '../../../_services/users.service';
declare var Dropzone: any;
declare var moment: any;
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-interviewform',
  templateUrl: './interviewform.component.html',
  styleUrls: ['./interviewform.component.css']
})
export class InterviewformComponent implements OnInit,AfterViewInit{

  countryList:any[];
  userid:any;
  qualiinsert: boolean = false;
  candidate: Candidatedetail = new Candidatedetail();
  qualification: QualificationDetail = new QualificationDetail();
  training: TrainingDetail = new TrainingDetail();
  language: LanguageDetail = new LanguageDetail();
  experience: ExpirenceDetail = new ExpirenceDetail();
  software: SoftwareDetail = new SoftwareDetail();
  activity: ActivityDetail = new ActivityDetail();
  membership: MembershipDetail = new MembershipDetail();

  qualiList: QualificationDetail[] = [];
  trainingList: TrainingDetail[] = [];
  langList: LanguageDetail[] = [];
  experienceList: ExpirenceDetail[] = [];
  softwareList: SoftwareDetail[] = [];
  activityList: ActivityDetail[] = [];
  memberList: MembershipDetail[] = [];

  QualiForm: boolean = true;
  TrainingForm: boolean = true;
  LangForm: boolean = true;
  WorkEForm: boolean = true;
  SoftSForm: boolean = true;
  ActivtyForm: boolean = true;
  MembershipForm: boolean = true;

  showNotice: boolean = true;
  same: boolean = false;

  constructor(private _script: ScriptLoaderService, private userService: UsersService) { }

  ngOnInit() {
    this.loadCountry();
    var self = this;
    this.candidate.present_country='India';
    this.candidate.permanent_country='India';
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
    
    this._script.loadScripts('app-interviewform',
      ['assets/demo/default/custom/crud/wizard/wizard.js', 'assets/demo/default/custom/crud/forms/widgets/bootstrap-switch.js', 'assets/demo/default/custom/crud/forms/widgets/input-mask.js', 'assets/demo/default/custom/crud/forms/widgets/bootstrap-datepicker.js', 'assets/demo/default/custom/crud/forms/widgets/dropzone.js']);
    Dropzone._autoDiscoverFunction();

  }

  loadCountry()
  {
    this.countryList=Country.countrylist;
  }

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

  //Show And Hide Child Forms 
  showQualiForm() {
    this.QualiForm = false;
  }
  hideQuali()
  {
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
    this.experience=new ExpirenceDetail();
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
    alert($("input[name=startdate]").val());
    alert($("input[name=enddate]").val());  
    var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
    var degit = /^[0-9]+$/;

    if (this.qualification.qualification == null || this.qualification.school_collage == null || this.qualification.board_uni == null || this.qualification.persentage == null || $("input[name=startdate]").val() == '' || $("input[name=enddate]").val() == '') 
    {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=startdate]").val() != '' && $("input[name=enddate]").val() != '') 
    {
      var s = $("input[name=startdate]").val();
      var e = $("input[name=enddate]").val();
      var start, month1, year1, end, month2, year2;
      start = s.split("/");
      month1 = start[0];
      year1 = start[1];

      end = e.split("/");
      month2 = end[0];
      year2 = end[1];
      if (year1 > year2)
      {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=startdate]").val('');
        $("input[name=enddate]").val('');
      }
      else if (year1 == year2) 
      {
        if (month1 > month2) 
        {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=startdate]").val('');
          $("input[name=enddate]").val('');
        }
        else 
        {
          this.qualiinsert = true;
        }
      }
      else 
      {
        this.qualiinsert = true;
      }
      if (this.qualiinsert == true)
      {
        var s1 = $("input[name=startdate]").val();
        var e1 = $("input[name=enddate]").val();
        var start1 = s.split("/");
        var end1 = e.split("/");
        alert(start1[1]+"-"+start1[0]);
        alert(end1[1]+"-"+end1[0]);
        alert(new Date(start1[1]+"-"+start1[0]));
        alert(new Date(end1[1]+"-"+end1[0]));
        this.qualification.startdate = new Date(start1[1]+"-"+start1[0]);
        this.qualification.enddate = new Date(end1[1]+"-"+end1[0]);
        this.qualiList.push(this.qualification);
        console.log(this.qualiList);
        this.qualification = new QualificationDetail();
        $("input[name=startdate]").val('');
        $("input[name=enddate]").val('');
        this.QualiForm = true;
      }
    }
  }
  //add Training Detail in the List
  submitTraining() 
  {
    var qualiinsert = false;
    if (this.training.course_name == null || this.training.institute == null || $("input[name=Tfromdate]").val() == '' || $("input[name=Ttodate]").val() == '') 
    {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=Tfromdate]").val() != '' || $("input[name=Ttodate]").val() != '')
    {
      var f = $("input[name=Tfromdate]").val();
      var t = $("input[name=Ttodate]").val();
      var from = f.split("/");
      var frommonth = from[1];
      var fromyear = from[2];
      var to = t.split("/");
      var tomonth = to[1];
      var toyear = to[2];

      if (fromyear > toyear) 
      {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=Tfromdate]").val('');
        $("input[name=Ttodate]").val('');
      }
      else if (fromyear == toyear) 
      {
        if (frommonth > tomonth) 
        {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=Tfromdate]").val('');
          $("input[name=Ttodate]").val('');
        }
        else 
        {
          qualiinsert = true;
        }

      }
      else 
      {
        qualiinsert = true;

      }
      if (qualiinsert == true) 
      {
        var f1 = $("input[name=Tfromdate]").val();
        var t1 = $("input[name=Ttodate]").val();
        var fromdate = f1.split("/");
        var todate = t1.split("/");
        this.training.from_date = new Date(fromdate[2]+"-"+fromdate[1]+"-"+fromdate[0]);
        this.training.to_date = new Date(todate[2]+"-"+todate[1]+"-"+todate[0]);

        this.trainingList.push(this.training);
        console.log(this.trainingList);
        this.training = new TrainingDetail();
        $("input[name=Tfromdate]").val('');
        $("input[name=Ttodate]").val('');
        this.TrainingForm = true;
      }
    }
  }
  //add language Detail in the List
  submitLang() 
  {
    if (this.language.lanuguage == null || this.language.speak_level == null || this.language.read_level == null || this.language.write_level == null) 
    {
      swal("", "please fill all the required fields", "error");
    }
    else 
    {
      this.langList.push(this.language);
      console.log(this.langList);
      this.language = new LanguageDetail();
      this.LangForm = true;
    }
  }
  //add Experience Detail in the List
  submitExperience() 
  {
    var check = false;
    if (this.experience.company_name == null || this.experience.designation == null || $("input[name=joindate]").val() == '' || this.experience.nature_duties == null) 
    {
      swal("", "please fill all the required fields", "error");
    }
    else if ($("input[name=relievedate]").val() != '') 
    {
      var f = $("input[name=joindate]").val();
      var t = $("input[name=relievedate]").val();
      var from = f.split("/");
      var frommonth = from[1];
      var fromyear = from[2];
      var to = t.split("/");
      var tomonth = to[1];
      var toyear = to[2];

      if (fromyear > toyear)
      {
        swal("", "End Year is Bigger then Start Year", "error");
        $("input[name=joindate]").val('');
        $("input[name=relievedate]").val('');
      }
      else if (fromyear == toyear)
      {
        if (frommonth > tomonth) 
        {
          swal("", "End Month is Bigger then Start Month", "error");
          $("input[name=joindate]").val('');
          $("input[name=relievedate]").val('');
        }
        else 
        {
          check = true;
        }

      }
      else 
      {
        check = true;

      }
      if (check == true) 
      {
        var f1 = $("input[name=joindate]").val();
        var t1 = $("input[name=relievedate]").val();
        var from1 = f1.split("/");
        var to1 = t1.split("/");
        this.experience.joining_date = new Date(from1[2]+"-"+from1[1]+"-"+from1[0]);
        this.experience.reliving_date = new Date(to1[2]+"-"+to1[1]+"-"+to1[0]);
        
        this.experienceList.push(this.experience);
        console.log(this.experienceList);
        this.experience = new ExpirenceDetail();
        $("input[name=joindate]").val('');
        $("input[name=relievedate]").val('');
        this.WorkEForm = true;
        console.log()
      }
    }
    else 
    {
      var f1 = $("input[name=joindate]").val();
      var t1 = $("input[name=relievedate]").val();
      var from1 = f1.split("/");
      var to1 = t1.split("/");
      this.experience.joining_date = new Date(from1[2]+"-"+from1[1]+"-"+from1[0]);
      this.experience.reliving_date = new Date(to1[2]+"-"+to1[1]+"-"+to1[0]);

      this.experienceList.push(this.experience);
      console.log(this.experienceList);
      this.experience = new ExpirenceDetail();
      $("input[name=joindate]").val('');
      $("input[name=relievedate]").val('');
      this.WorkEForm = true;
    }
  }
  //add Software Detail in the List
  submitSoftware() 
  {
    if (this.software.software_name == null || this.software.proficiency == null) 
    {
      swal("", "please fill all the required fields", "error");
    }
    else 
    {
      this.softwareList.push(this.software);
      console.log(this.softwareList);
      this.software = new SoftwareDetail();
      this.SoftSForm = true;
    }
  }
  //add Activity Detail in the List
  submitActivity()
  {
    if (this.activity.activity_name == null || this.activity.activity_institute == null || $("input[name=activityyear]").val() == '') 
    {
      swal("", "please fill all the required fields", "error");
    }
    else 
    {
      var a = $("input[name=activityyear]").val();
     
      var adate = a.split("/");
      this.activity.year = new Date(adate[1]+"-"+adate[0]);
      this.activityList.push(this.activity);
      console.log(this.activityList);
      this.activity = new ActivityDetail();
      $("input[name=activityyear]").val('');
      this.ActivtyForm = true;

    }
  }
  //add Membership Detail in the List
  submitMembership() 
  {
    if (this.membership.membership_name == null || $("input[name=expirydate]").val() == '') 
    {
      swal("", "please fill all the required fields", "error");
    }
    else 
    {
      this.membership.expiry_date = moment($("input[name=expirydate]").val()).format('YYYY-MM-DD');
      this.memberList.push(this.membership);
      console.log(this.memberList);
      this.membership = new MembershipDetail();
      $("input[name=expirydate]").val('');
      this.MembershipForm = true;
    }
  }

  //Remove Data From List 
  removeQuali(index)
  {
    this.qualiList.splice(index, 1);
  }
  removetraining(index)
  {
    this.trainingList.splice(index,1);
  }
  removeLang(index)
  {
    this.langList.splice(index,1);
  }
  removeExperience(index)
  {
    this.experienceList.splice(index,1);
  }
  removeSoftware(index)
  {
    this.softwareList.splice(index,1);
  }
  removeActivity(index)
  {
    this.activityList.splice(index,1);
  }
  removeMembership(index)
  {
    this.memberList.splice(index,1);
  }

  //Submit Final Candidate Details 
  submitCandidate() 
  {
    if ($('#m_form').valid() == true)
    {
      if ($('#appliedpreviously').prop("checked") == true) 
      {
        this.candidate.applied_previosly = "Yes";
      }
      else 
      {
        this.candidate.applied_previosly = "No";
      }
      if ($('#ppsame').prop("checked") == true) 
      {
        this.candidate.permanent_address = this.candidate.present_address;
        this.candidate.permanent_city = this.candidate.present_city;
        this.candidate.permanentt_code = this.candidate.present_code;
        this.candidate.permanent_state = this.candidate.present_state;
        this.candidate.permanent_country = this.candidate.present_country;
      }
      if ($('#shift').prop("checked") == true) 
      {
        this.candidate.wellness_work = "Yes";
      }
      else 
      {
        this.candidate.wellness_work = "No";
      }

      this.candidate.upload_resume = $("#fileupload").val();
      this.candidate.photo = $("#photoupload").val()
      this.candidate.contact_number = $("#contact_no").val();
      this.candidate.birth_date = moment($("input[name=DOB]").val()).format('YYYY-MM-DD');
      this.candidate.qualificationdetail = this.qualiList;
      this.candidate.trainingdetail = this.trainingList;
      this.candidate.languagedetail = this.langList;
      this.candidate.expirencedetail = this.experienceList;
      this.candidate.softwaredetail = this.softwareList;
      this.candidate.activitydetail = this.activityList;
      this.candidate.membershipdetail = this.memberList;

      console.log(this.candidate);
      this.userService.insertUserDetails(this.candidate).subscribe(
        (data:Candidatedetail) => 
        { 
          this.userid=data.user_id;
          swal("Successfully Submitted Form!", "<span style='color:red;'> Please save candidate id </span> "+this.userid+"<span style='color:red;'> for future use</span>", "success");
          this.candidate=new Candidatedetail();
          this.qualification = new QualificationDetail();
          this.training = new TrainingDetail();
          this.language = new LanguageDetail();
          this.experience=new ExpirenceDetail();
          this.software = new SoftwareDetail();
          this.activity = new ActivityDetail();
          this.membership = new MembershipDetail();
          this.qualiList=  [];
          this.trainingList= [];
          this.langList = [];
          this.experienceList = [];
          this.softwareList = [];
          this.activityList = [];
          this.memberList= [];
        });
    }
  }

  
}
