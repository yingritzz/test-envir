import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-maintenanc',
  templateUrl: './maintenanc.component.html',
  styleUrls: ['./maintenanc.component.css']
})
export class MaintenancComponent implements OnInit {

  jobMaintenanc: any;
  sell: any;
  id!: number;
  type: string = "maintenanc";

  page = 1;
  count = 0;
  tableSize = 30;

  options: any = [];
  serach: any;

  selectedUser: any;
  filterdOptions: any = [];
  search: any;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobMaintenanc = [];
  }

  ngOnInit(): void {
    this.getJobMaintenanc();
  }

  getJobMaintenanc() {
    this.apiService.getEmployment(this.type).then((res: any) => {
      // console.log(res);
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
    this.jobMaintenanc = data;
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
      }
    });
  }
  onTableDataChange(event: any){
    this.page = event;
    this.getJobMaintenanc();
  } 
}

