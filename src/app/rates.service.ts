import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rate } from './rate';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  rates = new Array<Rate>();

  constructor(private api: ApiService) { 

  }
  // public getAllRates(): Observable<any>{
    
  // }
}
