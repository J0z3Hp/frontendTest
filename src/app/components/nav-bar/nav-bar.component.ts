import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { CredencialesAdminService } from '../../services/login.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule], 
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  _cierreDeSesion = inject(CredencialesAdminService);

  isLog : boolean = false;

  handlevisibility(){

    this.isLog = this._cierreDeSesion.estaLogueado();

  
  }

  cierreSesion(){

    this._cierreDeSesion.cierreSesion();

  }

  ngOnInit(){
    this.handlevisibility();
  }

}
