import { Component, OnInit } from '@angular/core';
declare var customJS:any;
declare var teamCarousel: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customJS();
    teamCarousel();
  }

}
