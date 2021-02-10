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
      console.log(this.options)
      this.getSerach(this.options)
    });
  }

  getSerach(data: any){
    this.serach = data
  }

  filterUsers() {
    this.filterdOptions = this.serach.filter(
      ( item: { value: string; }) => item.value.toLowerCase().includes(this.selectedUser.toLowerCase())
    );
    console.log(this.filterdOptions);
    // console.log(this.selectedUser)
  }

  onClick(id: number) {
    this.router.navigate(['customer/profile/' + id]);
  }

  onSearch(idSearch: any) {
    // this.router.navigate(['customer/profile/' + idSearch]);
    console.log(idSearch)
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getAllCustomers();
  } 

}
