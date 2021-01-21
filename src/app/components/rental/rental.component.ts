import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  jobRental: any;
  sell: any;
  id!: number;
  type: string = "rental";

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobRental = [];
  }

  ngOnInit(): void {
    this.getJobRental();
  }

  getJobRental() {
    this.apiService.getEmployment("rental").then((res: any) => {
      console.log(res);
      this.jobRental = res;
    });
  }

  delete(category:string,id: number) {
    //Delete item in Student data
    this.apiService.deleteEmployment(category,id).then((res: any) => {
      console.log('deleted '+ this.id);
      this.getJobRental();
    });
  }

}