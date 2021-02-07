import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-line-home',
  templateUrl: './line-home.component.html',
  styleUrls: ['./line-home.component.css']
})
export class LineHomeComponent implements OnInit {

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

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getCountFix();
    this.getCountRental();
    this.getCountTest();
    this.getCountSell();
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
          if (value.status == 'สำเร็จ ') {
            this.countSell += 1;
          }
        });
        this.percenSell = (this.countSell / this.sell) * 100;
      }
    });
  }

}
