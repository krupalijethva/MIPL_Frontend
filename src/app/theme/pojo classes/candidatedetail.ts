import { QualificationDetail } from "./qualificationdetail";
import { TrainingDetail } from "./trainingdetail";
import { LanguageDetail } from "./languagedetail";
import { SoftwareDetail } from "./softwaredetail";
import { ActivityDetail } from "./activitydetail";
import { MembershipDetail } from "./memberdetail";
import { ExpirenceDetail } from "./experiencedetail";


export class Candidatedetail
{
    user_id:Number;
    branch:String;
    first_name:String;
    middle_name:String;

    last_name:String;
    email:String;
    gender:String;
    marital_status:String;
    birth_date:Date;
    contact_number:String;
    present_address:String;
    present_city:String;
    present_code:Number;
    present_state:String;
    present_country:String;
    permanent_address:String;
    permanent_city:String;
    permanentt_code:Number;
    permanent_state:String;
    permanent_country:String;
    reference1:String;
    reference2:String;
    passport_number:String;
    adhar_number:String;
    election_number:String;
    driving_number:String
    salary_pakage:Number;
    address_same:String;
    other_information:String;
    mailing_address:String;
    major_illness:String;
    photo:String;
    newphoto:String;
    area_intrested:String;
    remark_admin:String;
    mark_admin:String;
    uploadad_ans:String;
    upload_newans:String;
    total_mark:String;
    interview_date:Date;
    selected_not:String;
    persentageans:String;
    appliedtype:String;
    applied_previosly:String;
    upload_resume:String;
    wellness_work:String;
    new_resume:String;


    qualificationdetail:QualificationDetail[];
    trainingdetail:TrainingDetail[];
    languagedetail:LanguageDetail[];
    expirencedetail:ExpirenceDetail[];
    softwaredetail:SoftwareDetail[];
    activitydetail:ActivityDetail[];
    membershipdetail:MembershipDetail[];
}