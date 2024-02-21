import { Component, OnInit } from '@angular/core';
declare var customJS: any;
declare var $: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customJS();

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
      skinsPath: 'assets/skins/'
    });
    
  }


}
