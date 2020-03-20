import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

}
