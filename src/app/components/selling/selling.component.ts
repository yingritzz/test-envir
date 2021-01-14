import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.css']
})
export class SellingComponent implements OnInit {

  jobSelling: any;
  sell: any;
  id!: number;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobSelling = [];
  }

  ngOnInit(): void {
    this.getJobSelling();
  }

  getJobSelling() {
    this.apiService.getEmployment("selling").then((res: any) => {
      console.log(res);
      this.jobSelling = res;
    });
  }

  delete(id: number) {
    //Delete item in Student data
    this.apiService.deleteEmployment(id).then((res: any) => {
      console.log('deleted '+ this.id);
      this.getJobSelling();
    });
  }

}
