import { Component } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { PageMujerComponent } from '../../../components/page-mujer/page-mujer.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-mujer',
  standalone: true,
  imports: [NavBarComponent, PageMujerComponent, FooterComponent], 
  templateUrl: './mujer.component.html',
  styleUrl: './mujer.component.css'
})
export class MujerComponent {

}
