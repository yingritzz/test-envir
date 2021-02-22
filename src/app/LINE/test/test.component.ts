import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestsComponent implements OnInit {

  id_line: any;

  constructor() { }

  ngOnInit(): void {
    this.getLine();
  }

  async getLine() {
    document.getElementById('test')?.append('lala');
    await liff.init({ liffId: "1655682941-n3bkLoQv" })
      .then(async () => {
        document.getElementById('test')?.append(liff.getOS()!);
        document.getElementById('test')?.append(liff.getVersion());
        document.getElementById('test')?.append(liff.getLanguage()!);
        if (liff.isInClient()) {
          document.getElementById('test')?.append((await liff.getProfile()).userId);
        }else {
          liff.login();
        }

      });
  }

}
