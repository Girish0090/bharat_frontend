import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

declare var customJS: any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  baseUrl: any = environment.imageUrl;
  loader: boolean = false;
  galleryData:any;

  constructor(private service: AppserviceService) { }

  ngOnInit(): void {
    // customJS();
    this.getGalleryImages();
  }

  // get Gallery Images
  getGalleryImages(){
    this.service.get("getGalleryImages").pipe(finalize(() => this.loader = false)).subscribe((res: any) => {
      if (res?.success) {
        this.galleryData = res?.data;
      }
    }, error => {
      this.service.openSnackBar(error.error.message, 'Failed');
    })
  }
}
