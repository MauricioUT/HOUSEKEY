import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Property } from 'src/app/app.models';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CompareOverviewComponent } from 'src/app/shared/compare-overview/compare-overview.component';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { EmbedVideoService } from 'src/app/services/embed-video.service';
import { DomHandlerService } from 'src/app/dom-handler.service';
import { ScriptHeadService } from 'src/app/services/script-head.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [EmbedVideoService]
})
export class PropertyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;  
  public sidenavOpen:boolean = true;
  private sub: any;
  public property:Property; 
  public settings: Settings;  
  public embedVideo: any;
  public relatedProperties: Property[];
  public featuredProperties: Property[];
  public agent:any;
  public mortgageForm: UntypedFormGroup;
  public monthlyPayment:any;
  public contactForm: UntypedFormGroup;
  mapOptions: google.maps.MapOptions = { 
    mapTypeControl: true,
    fullscreenControl: true
  }
  lat: number = 0;
  lng: number = 0;  
  
  apiLoaded!: boolean;

  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private activatedRoute: ActivatedRoute, 
              private embedService: EmbedVideoService,
              public fb: UntypedFormBuilder,
              private domHandlerService: DomHandlerService,  private scriptService: ScriptHeadService) {
    this.settings = this.appSettings.settings; 

          this.agent  = { 
            id: 1,
            fullName: 'Luxore',
            desc: 'agregar descripción',            
            organization: 'Luxore',
            email: 'ajustar correo',
            phone: 'ajustar número',
            social: {
              facebook: 'lusia',
              twitter: 'lusia',
              linkedin: 'lusia',
              instagram: 'lusia',
              website: 'https://lusia.manuel.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-1.jpg' 
        }

        this.scriptService.obsCurrentApiStatus.subscribe(status => {
          this.apiLoaded = status.valueOf();
        });
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {   
      this.getPropertyById(params['id']); 
    });
    this.getRelatedProperties();
    this.getFeaturedProperties();
    if(this.domHandlerService.window?.innerWidth < 960){
      this.sidenavOpen = false;
      if(this.sidenav){
        this.sidenav.close();
      } 
    };
    this.mortgageForm = this.fb.group({
      principalAmount: ['', Validators.required],
      downPayment: ['', Validators.required], 
      interestRate: ['', Validators.required],
      period: ['', Validators.required]
    });
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  } 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  

  @HostListener('window:resize')
  public onWindowResize():void {
    (this.domHandlerService.window?.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true; 
  }

  public getPropertyById(id: number){
    this.appService.getPropertyById(id).subscribe(data=>{
      this.property = data;  
      this.embedVideo = this.embedService.embed(this.property.videos[1].link);
      this.lat = +this.property.location.lat;
      this.lng = +this.property?.location.lng;
    });
  }


  public addToCompare(){
    this.appService.addToCompare(this.property, CompareOverviewComponent, (this.settings.rtl) ? 'rtl':'ltr'); 
  }

  public onCompare(){
    return this.appService.Data.compareList.filter(item=>item.id == this.property.id)[0];
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl':'ltr');
  }

  public onFavorites(){
    return this.appService.Data.favorites.filter(item=>item.id == this.property.id)[0];
  }

  public getRelatedProperties(){
    this.appService.getRelatedProperties().subscribe(properties=>{
      this.relatedProperties = properties;
    })
  }

  public getFeaturedProperties(){
    this.appService.getFeaturedProperties().subscribe(properties=>{
      this.featuredProperties = properties.slice(0,3); 
    })
  } 


  public onContactFormSubmit(values:Object){
    if (this.contactForm.valid) { 
      console.log(values);
    } 
  }

  public onMortgageFormSubmit(values:Object){ 
    if (this.mortgageForm.valid) { 
      var principalAmount = values['principalAmount']
      var down = values['downPayment']
      var interest = values['interestRate']
      var term = values['period']
      this.monthlyPayment = this.calculateMortgage(principalAmount, down, interest / 100 / 12, term * 12).toFixed(2);
    }     
  }
  public calculateMortgage(principalAmount:any, downPayment:any, interestRate:any, period:any){    
    return ((principalAmount-downPayment) * interestRate) / (1 - Math.pow(1 + interestRate, -period));
  } 

}