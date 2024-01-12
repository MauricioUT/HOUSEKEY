import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(public formBuilder: UntypedFormBuilder) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // this.map.googleMap.setOptions({styles: this.mapStyles});
    }

}
