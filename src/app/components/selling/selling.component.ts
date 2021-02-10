import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.css']
})
export class SellingComponent implements OnInit {

  jobSelling: any;
  sell: any;
  id!: number;
  type: string = "selling";

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
    this.jobSelling = [];
  }

  ngOnInit(): void {
    this.getJobSelling();
  }

  getJobSelling() {
    this.apiService.getEmployment("selling").then((res: any) => {
      console.log(res);
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

  getData(data: any) {
    this.jobSelling = data;
  }
  getSerach(data: any){
    this.serach = data
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
    this.getJobSelling();
  } 
}
