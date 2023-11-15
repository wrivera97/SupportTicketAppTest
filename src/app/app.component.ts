import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Example} from './models/example';
import { SystechService } from './shared/systech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  client:any;


  constructor(private systechService: SystechService) {
  }

   ngOnInit() {
   this.getData();
  }
  getData() {
    this.systechService.get('cliente').subscribe(
      (response) => {
        this.client = response;
      console.log(response);
      }
    
    );
  }

}
