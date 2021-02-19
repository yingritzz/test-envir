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
      .then(async () => {
        document.getElementById('test')?.append('lala');
      });
  }

}
