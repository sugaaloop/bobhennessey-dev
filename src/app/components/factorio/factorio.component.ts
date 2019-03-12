import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factorio',
  templateUrl: './factorio.component.html',
  styleUrls: ['./factorio.component.scss']
})
export class FactorioComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  startFactorio() {
    this.http.get('https://us-east1-vidja-games.cloudfunctions.net/start-factorio')
      .subscribe((message) => {
        alert(message);
      }, (err) => {
        alert('I think it worked');
      });
  }

  stopFactorio() {
    this.http.get('https://us-east1-vidja-games.cloudfunctions.net/stop-factorio')
    .subscribe((message) => {
      alert(message);
    }, (err) => {
      alert('I think it worked');
    });
  }
}
