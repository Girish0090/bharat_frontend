import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  agentData:any;

  constructor(private route: ActivatedRoute, private service: AppserviceService) { }

  ngOnInit(): void {
    const propertyID = this.route.snapshot.paramMap.get('id');
    this.getAgentDetail(propertyID);
  }

  getAgentDetail(id: any) {
    this.service.get("getAgentDetail/" + id).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.agentData = res?.data;
        console.log(this.agentData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

}
