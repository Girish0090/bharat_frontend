import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var customJS: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  propertyData: any;
  p: number = 1;

  selectedCategory: any = '';
  selectedType: any = '';

  constructor(private service: AppserviceService) { }

  ngOnInit(): void {
    customJS();
    this.getAllProperty();
  }

  // get all property
  getAllProperty() {
    this.service.get("properties").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // Get Searched Property
  getSearchedProperty() {
    console.log('Selected Category:', this.selectedCategory);
    console.log('Selected Type:', this.selectedType);

    if (this.selectedCategory) {
      this.getPropertyByCategory(this.selectedCategory);
    } else if (this.selectedType) {
      this.getPropertyByType(this.selectedType);
    }
  }


  // Get Property By Category
  getPropertyByCategory(event: any) {
    this.service.get("getPropertyByCat/" + event).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })

  }

  // Get Property By Type
  getPropertyByType(event: any) {
    this.service.get("getPropertyByType/" + event).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })

  }


  // Get Property By Sorting
  getSorting(event: any) {
    this.service.get("getSortProperty?sortBy=" + event.target.value).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

}
