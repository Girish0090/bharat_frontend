import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
declare var customJS:any;

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  
  loader:boolean = false;
  pdf:any;

  constructor(private service:AppserviceService,private fb:FormBuilder) { }

  ngOnInit(): void {
    // customJS();
  }

  careerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required]],
    mobile: ["", [Validators.required]],
    education_Level: ["", [Validators.required]],
    additional_Msg: ["", [Validators.required]],
  })

  onSelectFile(event: any) {
    this.pdf = event.target.files[0];
  }
  
  //contact us 
  submitCareerForm() {
    // this.loader = true;
    const formData = new FormData();
    formData.append('name', this.careerForm.value.name);
    formData.append('email', this.careerForm.value.email);
    formData.append('mobile', this.careerForm.value.mobile);
    formData.append('education_Level', this.careerForm.value.education_Level);
    formData.append('additional_Msg', this.careerForm.value.additional_Msg);
    formData.append('resumePDF', this.pdf, this.pdf?.name);

    if (this.careerForm.valid) {
      
      this.service.post("joinUs",formData).pipe(finalize(()=>(this.loader = false))).subscribe((res:any)=>{
        if(res?.success){
          this.careerForm.reset();
          this.service.openSnackBar(res?.message, 'Success');
        }
      },error=>{
        this.service.openSnackBar(error.message, 'Failed');
      })

    }
  }

}
