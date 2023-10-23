import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/mis-datos/mis-datos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent]
})

export class HomePage implements OnInit, AfterViewInit { 
  selectTabs = 'qr';
  constructor() {
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    
  }


}
