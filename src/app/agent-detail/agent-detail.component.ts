import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  agentData:any;
  submitForm:boolean = false;

  constructor(private route: ActivatedRoute, private service: AppserviceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const propertyID = this.route.snapshot.paramMap.get('id');
    this.getAgentDetail(propertyID);
  }

  getAgentDetail(id: any) {
    this.service.get("getAgentDetail/" + id).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.agentData = res?.data;
        console.log(this.agentData);
        this.agentQueryForm.patchValue({ agentID: id });
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  agentQueryForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ["", [Validators.required]],
    message: ['', [Validators.required]],
    agentID: ['', [Validators.required]],
  })

  // property submit 
  querySubmit() {
    this.loader = true;
    if (this.agentQueryForm.valid) {
      this.service.post("agentQuery", this.agentQueryForm.value).pipe(finalize(() => (this.loader = false))).subscribe((res: any) => {
        if (res?.success) {
          this.agentQueryForm.reset();
          this.submitForm = false;
          this.service.openSnackBar(res?.message, 'Success');
        }
      }, error => {
        console.log(error);
        
        this.service.openSnackBar(error.error.message, 'Failed');
      })
    } else {
      this.loader = false;
      this.submitForm = true;
    }

  }

}
