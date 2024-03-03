import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var customJS: any;
declare var reviewCarousel: any;
declare var homeCarousel1: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  sliderData: any;
  clientReviewData: any;
  propertyData: any;
  propertyCategoryByCat: any;
  categoryValues: any;

  constructor(private service: AppserviceService) { }

  ngOnInit(): void {
    this.loader = true;
    customJS();
    this.getAllSlider();
    this.getClientReview();
    this.getAllProperty();
  }

  //get all slider
  getAllSlider() {
    this.service.get("slider").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.sliderData = res?.data;
        console.log(this.sliderData);

        setTimeout(() => {
          $('#slider').layerSlider({
            sliderVersion: '6.0.0',
            type: 'fullwidth',
            responsiveUnder: 0,
            maxRatio: 1,
            slideBGSize: 'auto',
            hideUnder: 0,
            hideOver: 100000,
            skin: 'outline',
            fitScreenWidth: true,
            fullSizeMode: 'fitheight',
            navButtons: false,
            navStartStop: false,
            height: 840,
            skinsPath: 'assets/assets/skins/'
          });
        }, 1000);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // get client review
  getClientReview() {
    this.service.get("reviews").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.clientReviewData = res?.data;
        setTimeout(() => {
          reviewCarousel();
        }, 1000);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  // get all property
  getAllProperty() {
    this.service.get("properties").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
        this.categoryValue("all");
        setTimeout(() => {
          homeCarousel1();
        }, 1000);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  categoryValue(category: any) {
    this.categoryValues = category;
    if (this.categoryValues == "all") {
      this.propertyCategoryByCat = this.propertyData
    } else {
      this.getPropertyBycategory();
    }
  }

  // get property by category
  getPropertyBycategory() {
    this.service.get("getPropertyByCat/" + this.categoryValues).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyCategoryByCat = res?.data;
        // this.propertyData = this.propertyCategoryByCat;
        console.log("gvh", this.propertyCategoryByCat);
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

}
