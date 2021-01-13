import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Customer } from '../models/customer';
import { Equipment } from '../models/equipment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // http://localhost:8888/API/get/(ชื่อตาราง)
  // http://localhost:8888/API/get/(ชื่อตาราง)/(id)
  // http://localhost:8888/API/post/(ชื่อตาราง)
  // http://localhost:8888/API/update/(idที่จะแก้)
  // http://localhost:8888/API/del/(ชื่อตาราง)/(idที่จะลบ)
  // http://localhost:8888/API/eq_detail/(eq_id)

  // API path
  base_path = 'http://localhost/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   }
  //   else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  // async get_user() {
  //   return new Promise((res, rej) => {
  //     this.http.post('https://episcancovid.mapedia.co.th/episcan_api/get_user.php?type=all_user', '')
  //       .subscribe((data: any) => {
  //         res(data)
  //       }, (err: any) => {
  //         rej(err)
  //       });
  //   });
  // }

  async getListCustomers() {
    return new Promise((res, rej) => {
      this.http.get<Customer>(this.base_path + "API/get/customer")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getCustomer(id: number) {
    return new Promise((res, rej) => {
      this.http.get<Customer>(this.base_path+'API/get/customer/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createCustomer(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Customer>(this.base_path+'API/post/customer', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async updateCustomer(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<Customer>(this.base_path+'API/update/customer/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteCustomer(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<Customer>(this.base_path+'API/del/customer/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async getListEq() {
    return new Promise((res, rej) => {
      this.http.get<Equipment>(this.base_path + "API/get/equipment")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEq(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Equipment>(this.base_path+'API/post/equipment', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
}
