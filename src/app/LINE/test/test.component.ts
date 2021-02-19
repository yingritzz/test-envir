import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getLine();
  }

  async getLine() {
    await liff.init({ liffId: "1655682941-n3bkLoQv" })
    if (liff.isInClient()) {
      this.getUserProfile()
    } else {
      if (liff.isLoggedIn()) {
        this.getUserProfile()
      } else {
      }
    }
    // await liff.init({ liffId: "1655682941-n3bkLoQv" })
    //   .then(async () => {
    //     if (liff.isLoggedIn()) {
    //       document.getElementById('test')?.append("liff.getOS()!");
    //     } else {
    //       liff.login({ redirectUri: 'https://bit.ly/3aA47hC' });
    //     }
    //   });
  }
  async getUserProfile() {
    const profile = await liff.getProfile()
    document.getElementById("test")!.style.display = "block"
    document.getElementById("test")!.append = liff.getOS
  }

}
