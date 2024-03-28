import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

declare var customJS: any;
declare var $: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  propertyData: any;
  submitForm: boolean =false;

  constructor(private route: ActivatedRoute, private service: AppserviceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // customJS();

    const propertyID = this.route.snapshot.paramMap.get('id');
    this.getPropertyDetail(propertyID);
  }

  getPropertyDetail(id: any) {
    this.service.get("property/" + id).pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.propertyData = res?.data;
        console.log(this.propertyData);
        this.propertyForm.patchValue({ projectID: id });

        $('#single-property').layerSlider({
          sliderVersion: '6.5.0b2',
          type: 'popup',
          pauseOnHover: 'disabled',
          skin: 'photogallery',
          globalBGSize: 'cover',
          navStartStop: false,
          hoverBottomNav: true,
          showCircleTimer: false,
          thumbnailNavigation: 'always',
          tnContainerWidth: '100%',
          tnHeight: 70,
          popupShowOnTimeout: 1,
          popupShowOnce: false,
          popupCloseButtonStyle: 'background: rgba(0,0,0,.5); border-radius: 2px; border: 0; left: auto; right: 10px;',
          popupResetOnClose: 'disabled',
          popupDistanceLeft: 20,
          popupDistanceRight: 20,
          popupDistanceTop: 20,
          popupDistanceBottom: 20,
          popupDurationIn: 750,
          popupDelayIn: 500,
          popupTransitionIn: 'scalefromtop',
          popupTransitionOut: 'scaletobottom',
          skinsPath: 'assets/assets/skins/'
        });
      }
    }, error => {
      this.service.openSnackBar(error.message, 'Failed');
    })
  }

  propertyForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    mobile: ["", [Validators.required]],
    projectID: ['', [Validators.required]],
  })

  // property submit 
  propertySubmit() {
    this.loader = true;
    if (this.propertyForm.valid) {
      this.service.post("projectContact", this.propertyForm.value).pipe(finalize(() => (this.loader = false))).subscribe((res: any) => {
        if (res?.success) {
          this.propertyForm.reset();
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
