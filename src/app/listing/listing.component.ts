import { Component, OnInit } from '@angular/core';
declare var customJS:any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customJS();
  }

}
