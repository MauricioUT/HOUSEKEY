import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { 
      path: '', 
      component: PagesComponent, children: [
          //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
          { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
          { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
          { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
          { path: 'properties', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule) },
          { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
          { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) }      ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load 
    initialNavigation: 'enabledBlocking', // for one load page, without reload
    useHash: false
  })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
