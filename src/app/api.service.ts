import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { Rate } from './rate';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public rates: Rate[];

  constructor(private http: HttpClient) { }

  public getAllRates(): Observable<Rate[]> {
    return this.http
    .get<Rate[]>("http://localhost:8080/rates")
    .pipe(
      map((data: Rate[])=>{
        console.log(data)
        return data
        
      })
    )
    .pipe(catchError(this.handleError));
  }

  private handleError( error: Response | any){
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
