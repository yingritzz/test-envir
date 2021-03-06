import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Customer, SearchCustomer } from '../models/customer';
import { Equipment, EquipmentAmount, EquipmentDetail } from '../models/equipment';
import { Employment, EmploymentDetail, EmploymentDetailEdit } from '../models/employment';
import { Admin, Login, LineLogin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'https://mapedia.co.th/envir-api/';
  // base_path = 'http://localhost/API/';


  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  async login(user: any) {
    return new Promise((res, rej) => {
      this.http.post<Login>(this.base_path+'login.php', JSON.stringify(user), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async getAdminLine() {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'get/line_login')
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async addAdminLine(id_line: any) {
    return new Promise((res, rej) => {
      this.http.post<LineLogin>(this.base_path+'post/line_login', JSON.stringify(id_line), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async adminProfile(id: number) {
    return new Promise((res, rej) => {
      this.http.get<Admin>(this.base_path+'get/admin/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async updateAdmin(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<Customer>(this.base_path+'update/admin/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async searchCus(item: any) {
    return new Promise((res, rej) => {
      this.http.post<SearchCustomer>(this.base_path+'search.php', JSON.stringify(item), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async getHome(endpoint: string) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+''+endpoint)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  // customer
  async getListCustomers() {
    return new Promise((res, rej) => {
      this.http.get<Customer>(this.base_path + "get/customer")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getCustomer(id: number) {
    return new Promise((res, rej) => {
      this.http.get<Customer>(this.base_path+'get/customer/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createCustomer(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Customer>(this.base_path+'post/customer', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async updateCustomer(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<Customer>(this.base_path+'update/customer/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteCustomer(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<Customer>(this.base_path+'del/customer/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async customerProfile(id: number) {
    return new Promise((res, rej) => {
      this.http.get<Customer>(this.base_path+'history/'+id)
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
      this.http.get<Equipment>(this.base_path + "get/equipment")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEq(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Equipment>(this.base_path+'post/equipment', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async deleteEq(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<Equipment>(this.base_path+'del/equipment/'+id)
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
      this.http.get<EquipmentDetail>(this.base_path + "get/equipment_detail")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEqDetail(idEq: number) {
    return new Promise((res, rej) => {
      this.http.get<EquipmentDetail>(this.base_path+'eq_detailsingle.php?table=eq_detail&id='+idEq)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEqDetailHistory(idEqd: number) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'eq_detailsingle.php?table=history&id='+idEqd)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEqd(id: number) {
    return new Promise((res, rej) => {
      this.http.get<EquipmentDetail>(this.base_path+'get/equipment_detail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEqDetail(data: any) {
    return new Promise((res, rej) => {
      this.http.post<EquipmentDetail>(this.base_path+'post/equipment_detail', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async updateEqDetail(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<EquipmentDetail>(this.base_path+'update/equipment_detail/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteEqDetail(id: number) {
    return new Promise((res, rej) => {
      this.http.delete<EquipmentDetail>(this.base_path+'del/equipment_detail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  //Employment
  async getEmAll() {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'get/employment')
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEmployment(type: string) {
    return new Promise((res, rej) => {
      this.http.get<Employment>(this.base_path+'job/'+type)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async getEmploymentDetail(id: any) {
    return new Promise((res, rej) => {
      this.http.get<Employment>(this.base_path+'jobdetail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async createEmployment(data: any) {
    return new Promise((res, rej) => {
      this.http.post<Employment>(this.base_path+'post/employment', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async deleteEm(id: number) {
    return new Promise((res, rej) => {
      this.http.delete(this.base_path+'del/employment/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async updateEqStatus(id: any, amount: any) {
    return new Promise((res, rej) => {
      this.http.put<EquipmentAmount>(this.base_path+'update/eq_status/'+id , JSON.stringify(amount), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async updateEqStatusSuccess(id: any, amount: any) {
    return new Promise((res, rej) => {
      this.http.put<EquipmentAmount>(this.base_path+'update/status_success/'+id, JSON.stringify(amount), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
 
  //Employment Detail
  async emdAll() {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'get/employment_detail')
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async emDetail(id: any) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'get/employment_detail/'+id)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async createEmDetail(data: any) {
    return new Promise((res, rej) => {
      this.http.post<EquipmentDetail>(this.base_path+'post/employment_detail', JSON.stringify(data), this.httpOptions)
      .subscribe((data: any) => {
        res(data)
      }, (err: any) => {
        rej(err)
      });
    });
  }
  async getEmDetail(id: number) {
    return new Promise((res, rej) => {
      this.http.get(this.base_path+'jobid/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async deleteEmployment(id: any) {
    return new Promise((res, rej) => {
      this.http.delete<EmploymentDetail>(this.base_path+'del/employment_detail/'+id)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
  async updateEmd(id: number, item: any) {
    return new Promise((res, rej) => {
      this.http.put<EmploymentDetailEdit>(this.base_path+'update/employment_detail/'+ id, JSON.stringify(item), this.httpOptions)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
}
