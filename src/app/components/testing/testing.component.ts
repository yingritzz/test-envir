import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  jobTesting: any;
  sell: any;
  id!: number;
  type: string = "testing";

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobTesting = [];
  }

  ngOnInit(): void {
    this.getJobTesting();
  }

  getJobTesting() {
    this.apiService.getEmployment("testing").then((res: any) => {
      console.log(res);
      this.jobTesting = res;
    });
  }

  delete(category:string,id: number) {
    //Delete item in Student data
    this.apiService.deleteEmployment(category,id).then((res: any) => {
      console.log('deleted '+ this.id);
      this.getJobTesting();
    });
  }

}
