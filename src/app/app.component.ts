import { Component } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router'; 

import { DomHandlerService } from './dom-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public router:Router,  
              private domHandlerService: DomHandlerService){
    this.settings = this.appSettings.settings;
  }

  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  
        this.domHandlerService.winScroll(0, 0);  
      }            
    });    
  }

}
