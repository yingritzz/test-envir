import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-job-all',
  templateUrl: './job-all.component.html',
  styleUrls: ['./job-all.component.css']
})
export class JobAllComponent implements OnInit {

  jobAll: any;
  id!: number;

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
  ) { }

  ngOnInit(): void {
    this.getJobAll();
  }

  getJobAll() {
    this.apiService.getEmAll().then((res: any) => {
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
    this.jobAll = data;
    console.log(this.jobAll)
  }

  filterUsers() {
    this.filterdOptions = this.serach.filter(
      ( item: { value: string; }) => item.value.toLowerCase().includes(this.selectedUser.toLowerCase())
    );
    this.serach.forEach((value: any) => {
      if (this.selectedUser == value.value+' ('+value.id+')'){
         this.router.navigate(['/job/edit/' + value.id]);
      }
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobAll();
  } 

}
