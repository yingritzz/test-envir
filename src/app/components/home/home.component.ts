import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countFix:any 
  countRental:any 
  countTest:any
  countSell:any 

  percenFix: any
  percenRental: any
  percenTest: any
  percenSell: any

  todaylist: any
  overdue: any
  lastinsert: any


  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) { 
    this.todaylist = [];
    this.overdue = [];
    this.lastinsert = [];
    this.countFix = [];
    this.countRental = [];
    this.countTest = [];
    this.countSell = [];
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

  
  getTodayList() {
    this.apiService.getHome('todaylist').then((res: any) => {
      console.log(res);
      this.todaylist = res;
    });
  }
  getOverdue() {
    this.apiService.getHome('overdue').then((res: any) => {
      console.log(res);
      this.overdue = res;
    });
  }
  getLastInsert() {
    this.apiService.getHome('lastinsert').then((res: any) => {
      console.log(res);
      this.lastinsert = res;
    });
  }
  getCountFix() {
    this.apiService.getHome('count_maintenanc').then((res: any) => {
      console.log(res[0].count);
      this.countFix = res[0].count; 

      this.apiService.getHome('count_all').then((res: any) => {
        this.percenFix = (this.countFix/res[0].count)*100
        console.log('fix'+this.percenFix.toFixed(0));
      });
    });
   
  }
  getCountRental() {
    this.apiService.getHome('count_rental').then((res: any) => {
      console.log(res[0].count);
      this.countRental = res[0].count; 

      this.apiService.getHome('count_all').then((res: any) => {
        this.percenRental = (this.countRental/res[0].count)*100
        console.log('rental'+this.percenRental.toFixed(0));
      });
    });
  }
  getCountTest() {
    this.apiService.getHome('count_testing').then((res: any) => {
      console.log(res[0].count);
      this.countTest = res[0].count; 

      this.apiService.getHome('count_all').then((res: any) => {
        this.percenTest = (this.countTest/res[0].count)*100
        console.log('test'+this.percenTest.toFixed(0));
      });
    });
    
  }
  getCountSell() {
    this.apiService.getHome('count_selling').then((res: any) => {
      console.log(res[0].count);
      this.countSell = res[0].count; 

      this.apiService.getHome('count_all').then((res: any) => {
        this.percenSell = (this.countSell/res[0].count)*100
        console.log('sell'+this.percenSell.toFixed(0));
      });
    });
    
  }
}
