import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ScriptHeadService } from 'src/app/services/script-head.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  apiLoaded!: boolean;

  contactForm: UntypedFormGroup;
  center: google.maps.LatLngLiteral = { lat: 40.678178, lng: -73.944158};
  zoom: number = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 40.678178, lng: -73.944158 }
  ];
  mapOptions: google.maps.MapOptions = {
    fullscreenControl: true, 
    mapTypeControl: true
  }
 
  constructor(public formBuilder: UntypedFormBuilder, private scriptService: ScriptHeadService) { 
    this.scriptService.obsCurrentApiStatus.subscribe(status => {
      this.apiLoaded = status.valueOf();
    });
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }

}
