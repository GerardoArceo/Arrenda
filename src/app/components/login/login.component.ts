import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { ValidaSesionService } from '../login/validaSesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  FormLogin: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private sesion: ValidaSesionService
  ) {
    let barras = document.getElementById('barraepicas');
    if (barras != null){
      barras.style.visibility = "hidden";
    }
    if (this.sesion.validaSesion()) {
      this.router.navigate(['arrendadora']);
    }
  }

  ngOnInit(): void {
    this.FormLogin = this._formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  validaUser() {
    if (this.FormLogin.get('user').value == "maker" || this.FormLogin.get('user').value == "checker") {
      let formValue = this.FormLogin.value;
      if (formValue.user == 'checker') {
        formValue.idUser = 4114272;
      } else {
        formValue.idUser = 1516809;
      }
      localStorage.setItem('sesion', JSON.stringify(formValue));
      this.router.navigate(['arrendadora']);
      let barras = document.getElementById('barraepicas');
      if (barras != null) {
        barras.style.visibility = "visible";
      }
      document.getElementById('lblUserRol').textContent = "Hola Karina de la Cruz : " + this.FormLogin.get('user').value;
    } else {
      const modal = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { title: "Accesso Denegado", text: "Las credenciales son invalidas", btnAcept: true, btnCancel: false },
      });
    }

  }

}