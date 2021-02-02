import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fix: number = 0;
  rental: number = 0;
  test: number = 0;
  sell: number = 0;

  countFix: number = 0;
  countRental: number = 0;
  countTest: number = 0;
  countSell: number = 0;

  percenFix: any;
  percenRental: any;
  percenTest: any;
  percenSell: any;

  todaylist: any
  overdue: any
  lastinsert: any

  category: any;
  today!: boolean;
  todayShow!: boolean;
  over!: boolean;
  overShow!: boolean;
  emList: any = [];
  emData: any;


  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) {
    this.todaylist = [];
    this.overdue = [];
    this.lastinsert = [];
    this.emData = [];
  }

  ngOnInit(): void {
    this.getCountFix();
    this.getCountRental();
    this.getCountTest();
    this.getCountSell();
    this.getTodayList();
    this.getOverdue();
    this.getLastInsert();
  }

  todayNull(data: any) {
    if (data.length == 0) {
      this.today = true;
      this.todayShow = false;
    } else {
      this.today = false;
      this.todayShow = true;
    }
  }
  getTodayList() {
    this.apiService.getHome('todaylist').then((res: any) => {
      this.todaylist = res;
      this.todayNull(res);
    });
  }
  todayGoToDeatail(em_id: any, category: any) {
    if (category == 'เช่า-ยืม') {
      this.category = 'rental'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'จำหน่าย') {
      this.category = 'selling'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'ทดสอบ') {
      this.category = 'testing'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'ซ่อมบำรุง') {
      this.category = 'maintenanc'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }

  }

  overNull(data: any) {
    if (data.length == 0) {
      this.over = true;
      this.overShow = false;
    } else {
      this.over = false;
      this.overShow = true;
    }
  }
  getOverdue() {
    this.apiService.getHome('overdue').then((res: any) => {
      this.overdue = res;
      this.overNull(res);
    });
  }
  overDueGoToDeatail(em_id: any, category: any) {
    if (category == 'เช่า-ยืม') {
      this.category = 'rental'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'จำหน่าย') {
      this.category = 'selling'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'ทดสอบ') {
      this.category = 'testing'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
    else if (category == 'ซ่อมบำรุง') {
      this.category = 'maintenanc'
      console.log(this.category)
      this.router.navigate(['/job/detail/' + this.category + '/' + em_id]);
    }
  }

  getLastInsert() {
    this.apiService.getHome('lastinsert').then((res: any) => {
      this.lastinsert = res;
    });
  }
  splitEmD(data: any) {
    this.emData = [];
    this.emList = data.split('/')
    console.log(this.emList)
  }
  getEmData(emId: any) {
    this.emData = [];
    this.apiService.getEmploymentDetail(emId).then((res: any) => {
      res.forEach((response: any) => {
        this.emData.push(response);
        console.log(this.emData)
      });
    });
  }

  getCountFix() {
    this.apiService.getEmployment('maintenanc').then((res: any) => {
      if (res.length != 0) {
        this.fix = res.length;
        res.forEach((value: any) => {
          if (value.status == 'สำเร็จ') {
            this.countFix += 1;
          }
        });
        this.percenFix = (this.countFix / this.fix) * 100;
      }
    });
  }
  getCountRental() {
    this.apiService.getEmployment('rental').then((res: any) => {
      if (res.length != 0) {
        this.rental = res.length;
        res.forEach((value: any) => {
          if (value.status == 'สำเร็จ') {
            this.countRental += 1;
          }
        });
        this.percenRental = (this.countRental / this.rental) * 100;
      }
    });
  }
  getCountTest() {
    this.apiService.getEmployment('testing').then((res: any) => {
      if (res.length != 0) {
        this.test = res.length;
        res.forEach((value: any) => {
          if (value.status == 'สำเร็จ') {
            this.countTest += 1;
          }
        });
        this.percenTest = (this.countTest / this.test) * 100;
      }
    });
  }
  getCountSell() {
    this.apiService.getEmployment('selling').then((res: any) => {
      if (res.length != 0) {
        this.sell = res.length;
        res.forEach((value: any) => {
          if (value.status == 'สำเร็จ') {
            this.countSell += 1;
          }
        });
        this.percenSell = (this.countSell / this.sell) * 100;
      }
    });
  }
}
