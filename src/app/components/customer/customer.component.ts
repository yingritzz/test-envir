import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerDataList: any;

  page = 1;
  count = 0;
  tableSize = 15;

  options: any = [];
  serach: any;

  selectedUser: any;
  filterdOptions: any = [];

  data:any = [];

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.customerDataList = [];
    this.serach = [];
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      // console.log(res);
      this.customerDataList = res;
      for (let i =0;i < res.length; i++){
        this.options[i] = {
          value: res[i].cus_fullname,
          id: res[i].id,
          selected: false
        }
      }
      // console.log(this.options)
      this.getSerach(this.options)
      this.getData(res);
    });
  }

  getSerach(data: any){
    this.serach = data
  }

  getData(data:any){
    this.data = data
  }

  filterUsers() {
    this.filterdOptions = this.serach.filter(
      ( item: { value: string; }) => item.value.toLowerCase().includes(this.selectedUser.toLowerCase())
    );
    this.data.forEach((value: any) => {
      if (this.selectedUser == value.cus_fullname){
         this.router.navigate(['customer/profile/' + value.id]);
      }
    });
    console.log(this.selectedUser)
  }

  onClick(id: number) {
    this.router.navigate(['customer/profile/' + id]);
  }


  onTableDataChange(event: any){
    this.page = event;
    this.getAllCustomers();
  } 

}
