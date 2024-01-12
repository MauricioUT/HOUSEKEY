import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { DomHandlerService } from '../dom-handler.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;  
  public showBackToTop: boolean = false;
  public scrolledCount = 0;

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public router:Router,  
              private domHandlerService: DomHandlerService) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit() {
  }
      
 
  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(this.domHandlerService.window?.pageYOffset, this.domHandlerService.winDocument.documentElement.scrollTop, this.domHandlerService.winDocument.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false; 

    if(this.settings.stickyMenuToolbar){      
      let top_toolbar = this.domHandlerService.winDocument.getElementById('main-toolbar');
      if(top_toolbar){ 
        if(scrollTop >= top_toolbar.clientHeight) {
          this.settings.mainToolbarFixed = true;
        }
        else{
          this.settings.mainToolbarFixed = false;
        } 
      }        
    } 
    
        
    let load_more = this.domHandlerService.winDocument.getElementById('load-more');
    if(load_more){
      if(this.domHandlerService.window?.innerHeight > load_more.getBoundingClientRect().top + 120){ 
        if(!this.settings.loadMore.complete){
          if(this.settings.loadMore.start){        
            if(this.scrolledCount < this.settings.loadMore.step){  
              this.scrolledCount++; 
              if(!this.settings.loadMore.load){ 
                this.settings.loadMore.load = true; 
              }
            }
            else{
              this.settings.loadMore.start = false;
              this.scrolledCount = 0;
            }
          }  
        }              
      }
    }
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -this.domHandlerService.window?.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(this.domHandlerService.window?.pageYOffset != 0){
        this.domHandlerService.window?.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(this.domHandlerService.window?.innerWidth <= 768){ 
      this.domHandlerService.winScroll(0, 0);  
    }
  }

  ngAfterViewInit(){
    this.domHandlerService.winDocument.getElementById('preloader')?.classList.add('hide');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.sidenav.close();
        this.settings.mainToolbarFixed = false; 
        this.domHandlerService.winScroll(0, 0);   
      }            
    });    
  }   
 

}
