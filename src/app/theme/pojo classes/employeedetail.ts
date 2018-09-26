import { QualificationDetail } from "./qualificationdetail";
import { TrainingDetail } from "./trainingdetail";
import { LanguageDetail } from "./languagedetail";

import { SoftwareDetail } from "./softwaredetail";
import { ActivityDetail } from "./activitydetail";
import { MembershipDetail } from "./memberdetail";
import { ExpirenceDetail } from "./experiencedetail";
import { Candidatedetail } from "./candidatedetail";

export class EmployeeDetail extends Candidatedetail
{
    user_id:Number;
    fullname:String;
    desig:String;
    joining_date:Date;
    pan_number:String;
    bank_name:String;
    bankbranch_name:String;
    account_number:String;
    ifsc_code:String;
    height:String;
    weight:String;
    power_glass:String;
    nature_illness:String;
    phisical_disability:String;
    blood_group:String;
    identification_mark:String
    doctor_name:String;
    doctor_number:String;
    ssc_marksheet:String;
    hsc_marksheet:String;
    leaving_certi:String;
    lastsem_marksheet:String;
    deg_cirty:String;
    proof_1:String;
    proof_2:String;
    emp_id:Number;
    proof_3:String;
    approved:Boolean;
    document_file:String;
    alternate_contact:String;
    newdocument_file:String;
    varification:Boolean;
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

}