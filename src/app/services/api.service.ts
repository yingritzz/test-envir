import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // http://localhost:8888/API/read/customerlist
  // http://localhost:8888/API/read.php?table=customer&id=2

  // API path
  base_path = 'http://localhost/API/read';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Get customers list data
  getListCustomers(): Observable<Customer> {
    return this.http
      .get<Customer>(this.base_path + "/customerlist")
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single customer data by ID
  getCustomer(id:number): Observable<Customer> {
    return this.http
      .get<Customer>(this.base_path + ".php?table=customer&id=" + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
