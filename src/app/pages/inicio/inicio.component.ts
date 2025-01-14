import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { PageMujerComponent } from "../../components/page-mujer/page-mujer.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterLink, PageMujerComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
