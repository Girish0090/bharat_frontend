import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent-listing',
  templateUrl: './agent-listing.component.html',
  styleUrls: ['./agent-listing.component.css']
})
export class AgentListingComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  agentData: any;
  p: number = 1;

  constructor(private service: AppserviceService) { }

  ngOnInit(): void {
    this.getAllAgents();
  }

  // get all property
  getAllAgents() {
    this.service.get("getAllAgents").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.agentData = res?.data;
        console.log(this.agentData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // Get Sorting
  getSorting(event: any) {
     this.service.get("getSortedAgents?sortBy=" + event.target.value).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.agentData = res?.data;
        console.log(this.agentData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

}
