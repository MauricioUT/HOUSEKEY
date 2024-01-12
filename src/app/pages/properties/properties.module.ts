import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps'; 
import { SharedModule } from '../../shared/shared.module';
import { PropertyComponent } from './property/property.component';

export const routes: Routes = [
  { path: ':id', component: PropertyComponent }
];

@NgModule({
  declarations: [
    PropertyComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    SharedModule
  ]
})
export class PropertiesModule { }
