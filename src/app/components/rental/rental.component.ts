import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

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

  page = 1;
  count = 0;
  tableSize = 30;

  options: any = [];
  serach: any;

  selectedUser: any;
  filterdOptions: any = [];

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
    this.apiService.getEmployment(this.type).then((res: any) => {
      this.getData(res);
      for (let i =0;i < res.length; i++){
        this.options[i] = {
          value: res[i].cus_fullname,
          id: res[i].id,
          selected: false
        }
      }
      this.getSerach(this.options)
    });
  }

  getSerach(data: any){
    this.serach = data
  }

  getData(data: any) {
    this.jobRental = data;
  }

  filterUsers() {
    this.filterdOptions = this.serach.filter(
      ( item: { value: string; }) => item.value.toLowerCase().includes(this.selectedUser.toLowerCase())
    );
    this.serach.forEach((value: any) => {
      if (this.selectedUser == value.value+' ('+value.id+')'){
         this.router.navigate(['/job/edit/' + value.id]);
         console.log(value.id)
      }
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobRental();
  } 
}