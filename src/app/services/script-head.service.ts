import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptHeadService {

  private currentApiStatus: BehaviorSubject<Boolean>;
  obsCurrentApiStatus: Observable<Boolean>;

  constructor(httpClient: HttpClient) {
    this.currentApiStatus =  new BehaviorSubject(new Boolean(false));
    this.obsCurrentApiStatus = this.currentApiStatus.asObservable();

    httpClient.jsonp('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    ).subscribe( loaded => {
      this.currentApiStatus.next(loaded);
    });
  }
}
