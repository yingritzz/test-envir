import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  jobDetail: any;
  type: any;
  id: any;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
      this.jobDetail = [];
     }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params["type"];
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getJobDetail();
  }

  onClickBack() {
    this.location.back();
  }

  getJobDetail() {
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      // console.log(res);
      this.jobDetail = res;
    });
  }
  goBack() {
    window.history.back();
  }
}
