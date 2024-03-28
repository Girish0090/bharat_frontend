import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
declare var customJS: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  loader: boolean = false;
  submitForm: boolean = false;

  constructor(private service: AppserviceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    customJS();
  }

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
    mobile: ["", [Validators.required]]
  })

  //contact us 
  contactUs() {
    this.loader = true;

    if (this.contactForm.valid) {
      this.service.post("contactForm", this.contactForm.value).pipe(finalize(() => (this.loader = false))).subscribe((res: any) => {
        if (res?.success) {
          this.contactForm.reset();
          this.submitForm = false;
          this.service.openSnackBar(res?.message, 'Success');
        }
      }, error => {
        this.service.openSnackBar(error.error.message, 'Failed');
      })
    } else {
      this.loader = false;
      this.submitForm = true;
    }
    
  }

}
