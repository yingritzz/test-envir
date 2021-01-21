import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Customer } from '../models/customer';
import { Equipment } from '../models/equipment';
import { EquipmentDetail } from '../models/equipment-detail';
import { Employment } from '../models/employment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:8888/';

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

  //Equipment
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
  async deleteEq(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<Equipment>(this.base_path+'API/del/equipment/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  //EquipmentDetail
  async getListEqd() {
    return new Promise((res, rej) => {
      this.http.get<EquipmentDetail>(this.base_path + "API/get/equipment_detail")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEqDetail(idEq: number) {
    return new Promise((res, rej) => {
      this.http.get<EquipmentDetail>(this.base_path+'API/eq_detail/'+idEq)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEqd(id: number) {
    return new Promise((res, rej) => {
      this.http.get<EquipmentDetail>(this.base_path+'API/get/equipment_detail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEqDetail(data: any) {
    return new Promise((res, rej) => {
      this.http.post<EquipmentDetail>(this.base_path+'API/post/equipment_detail', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async updateEqDetail(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<EquipmentDetail>(this.base_path+'API/update/equipment_detail/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteEqDetail(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<EquipmentDetail>(this.base_path+'API/del/equipment_detail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  //Employment
  async getEmployment(type: string) {
    return new Promise((res, rej) => {
      this.http.get<Employment>(this.base_path+'API/job/'+type)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEmploymentDetail(id: any) {
    return new Promise((res, rej) => {
      this.http.get<Employment>(this.base_path+'API/jobdetail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEmployment(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Employment>(this.base_path+'API/post/employment', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async updateEmployment(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<Employment>(this.base_path+'API/update/employment/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteEmployment(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<Employment>(this.base_path+'API/del/employment/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  //Employment Detail
  async createEmDetail(data: any) {
    return new Promise((res, rej) => {
      this.http.post<EquipmentDetail>(this.base_path+'API/post/employment_detail', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async getEmDetail(id: number) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'API/jobid/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getHome(endpoint: string) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'API/'+endpoint)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
}
