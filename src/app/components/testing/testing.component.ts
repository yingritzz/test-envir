import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

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
    this.jobTesting = [];
  }

  ngOnInit(): void {
    this.getJobTesting();
  }

  getJobTesting() {
    this.apiService.getEmployment("testing").then((res: any) => {
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
    this.jobTesting = data;
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
    this.getJobTesting();
  } 
}
