import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css']
})
export class FootbarComponent implements OnInit {

  fecha = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}