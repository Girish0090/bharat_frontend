import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
declare var customJS:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loader:boolean = false;
  sliderData: any;
  clientReviewData: any;
  propertyData: any;
  propertyCategoryByCat: any;
  categoryValues: any;

  constructor(private service:AppserviceService) { }

  ngOnInit(): void {
    this.loader = true;
    customJS();
    this.getAllSlider();
    this.getClientReview();
    this.getAllProperty();
    this.getPropertyBycategory();
  }
  
  //get all slider
  getAllSlider(){
    this.service.get("slider").pipe(finalize(() => this.loader = false )).subscribe((res:any)=>{
      if(res?.success){
        this.sliderData = res?.data;
        // console.log(this.sliderData[0]?.slider_image?.path);
      }
    },error=>{
      this.service.openSnackBar(error, 'Failed');
    })
  }

  // get client review
  getClientReview(){
    this.service.get("reviews").pipe(finalize(()=>this.loader = false)).subscribe((res:any)=>{
      if(res?.success){
        this.clientReviewData = res?.data;
        // console.log(this.clientReviewData);
      }
    },error=>{
      this.service.openSnackBar(error, 'Failed');
    })
  }

  // get all property
  getAllProperty(){
    this.service.get("properties").pipe(finalize(()=>this.loader=false)).subscribe((res:any)=>{
      if(res?.success){
        this.propertyData = res?.data;
        // console.log(this.propertyData);
      }
    },error=>{
      this.service.openSnackBar(error, 'Failed');
    })
  }

  categoryValue(category:any){
    this.categoryValues = category;
    this.getPropertyBycategory();
  }

  // get property by category
  getPropertyBycategory(){
    this.service.get("getPropertyByCat/"+this.categoryValues).pipe(finalize(()=>this.loader = false)).subscribe((res:any)=>{
      if(res?.success){
        this.propertyCategoryByCat = res?.data;
        console.log(this.propertyCategoryByCat);
      }
    })
  }

}
