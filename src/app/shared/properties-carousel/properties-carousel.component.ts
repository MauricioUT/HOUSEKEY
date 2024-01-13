import { Component, OnInit, Input } from '@angular/core';

import { Property } from 'src/app/app.models';

@Component({
  selector: 'app-properties-carousel',
  templateUrl: './properties-carousel.component.html',
  styleUrls: ['./properties-carousel.component.scss']
})
export class PropertiesCarouselComponent implements OnInit {
  @Input('properties') properties: Array<Property> = [];


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
   
  }

}