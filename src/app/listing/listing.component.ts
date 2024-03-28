import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

declare var customJS: any;
declare var $: any;

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
  selectedBedrooms: any = '';
  selectedBathrooms: any = '';
  selectedLocation: any = '';

  constructor(private service: AppserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // customJS();

    const cityParam = this.route.snapshot.paramMap.get('city');
    const locationParam = this.route.snapshot.paramMap.get('location');
    console.log(locationParam);
    
    if (cityParam && !locationParam) {
      this.getPropertyByCity(cityParam);
    }else if(cityParam && locationParam){
      this.getPropertyByLocation(cityParam, locationParam);
    } 
    else {
      this.getAllProperty();
    }


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
    console.log('Selected Bedrooms:', this.selectedBedrooms);
    console.log('Selected Bathrooms:', this.selectedBathrooms);

    if (this.selectedCategory) {
      this.getPropertyByCategory(this.selectedCategory);
    } else if (this.selectedType) {
      this.getPropertyByType(this.selectedType);
    } else if (this.selectedBedrooms) {
      this.getPropertyByBedrooms(this.selectedBedrooms);
    } else if (this.selectedBathrooms) {
      this.getPropertyByBathrooms(this.selectedBathrooms);
    } else if (this.selectedLocation) {
      this.getPropertyByCity(this.selectedLocation);
    } else {
      // Get the values from the slider
      const sliderValues = $(".filter_price").val().split(';');

      const minValue = sliderValues[0];
      const maxValue = sliderValues[1];
      
      $('.toggle-btn').trigger('click');
      this.filterPropertyByPrice({ min: minValue, max: maxValue });
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

  // Get Property By BedRoom
  getPropertyByBedrooms(event: any) {
    this.service.get(`getPropertyByRooms?bedrooms=${event}`).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // Get Property By BathRoom
  getPropertyByBathrooms(event: any) {
    this.service.get(`getPropertyByRooms?bathrooms=${event}`).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // filter property by Price
  filterPropertyByPrice(event: any) {
    this.service.get(`filterPropertyByPrice?minPrice=${event.min}&maxPrice=${event.max}`).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
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

  // Get Property By City
  getPropertyByCity(city: any) {
    this.service.get("getPropertyByCity/" + city).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  getPropertyByLocation(city:any,location: any) {
    this.service.get("getPropertyByCityAndLocation/"+city + "/" +location).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

}
