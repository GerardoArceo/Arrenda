import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidaSesionService } from '../login/validaSesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private sesion: ValidaSesionService) {    
    this.sesion.validaSesion();
  }

}
