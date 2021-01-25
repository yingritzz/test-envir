import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  adminProfile: any = [];
  id: any;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
  }

  async onClickHome() {
    this.router.navigateByUrl('home')
    this.getprofile();
  }

  getprofile(){
    this.apiService.adminProfile(this.id).then((res: any) => {
      this.adminProfile = res;
    });
  }

}
