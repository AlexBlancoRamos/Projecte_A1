import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuari: string='';
  passLog: string='';


  constructor(private router: Router, private http: HttpClient) {
  }

  login($myParam: string = ''): void {
    const nav: string[] = ['']
    if ($myParam.length) {
      nav.push($myParam);
    }
    this.router.navigate(nav);

    console.log("login")

    const datos = {
      email: this.usuari,
      passw: this.passLog
    };

    console.log({datos})


    this.http.post<any>('http://localhost:3000/login', datos).subscribe(
      response => {
        if (response.success) {
          alert("Inicio de sesión exitoso");
          localStorage.setItem('email', this.usuari);
          this.router.navigate(['/inici']);
        } else {
          alert("Usuario y/o contraseña incorrectos");
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

}


