import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { CredencialesAdminService } from '../../services/login.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,  
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

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
