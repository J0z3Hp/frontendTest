import { Component } from '@angular/core';
import { PageMujerComponent } from '../../../components/page-mujer/page-mujer.component';
import { NavBarComponent } from "../../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../../components/footer/footer.component";


@Component({
  selector: 'app-hombre',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, PageMujerComponent],
  templateUrl: './hombre.component.html',
  styleUrl: './hombre.component.css'
})
export class HombreComponent {

}
