import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'; 
import { Settings, AppSettings } from '../../app.settings';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Property } from 'src/app/app.models';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  public watcher: Subscription; 
  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService, public mediaObserver: MediaObserver) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() { 
    
    this.watchForChanges();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
    
  public disableSwiper(){
   
  }
  public enableSwiper(){
     
  }

  public clear(){
    this.appService.Data.compareList.length = 0;
  }

  public remove(property:Property) {
    const index: number = this.appService.Data.compareList.indexOf(property);
    if (index !== -1) {
        this.appService.Data.compareList.splice(index, 1);
    }  
    this.watchForChanges();     
  }

  public watchForChanges(){
    this.watcher = this.mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
       if(change.mqAlias == 'xs' && this.appService.Data.compareList.length > 1) {
         this.enableSwiper();
       }
       else if(change.mqAlias == 'sm' && this.appService.Data.compareList.length > 2){
         this.enableSwiper();
       }
       else if(change.mqAlias == 'md' && this.appService.Data.compareList.length > 3){
         this.enableSwiper();
       }
       else if(change.mqAlias == 'lg' && this.appService.Data.compareList.length > 4){
         this.enableSwiper();  
       }
       else if(change.mqAlias == 'xl' && this.appService.Data.compareList.length > 4){
         this.enableSwiper();
       }
       else{
         this.disableSwiper();
       } 
     });
  }  

}