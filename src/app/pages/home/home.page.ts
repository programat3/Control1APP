import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/mis-datos/mis-datos.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent, AdminComponent]
})

export class HomePage implements OnInit, AfterViewInit {
  selectTabs = 'qr';
  constructor(private auth: AuthService, private animationController: AnimationController) {
  }
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6500)
        .fromTo('transform', 'translate(-300px)', "translate(400px)")
        .fromTo('opacity', 1, 0.2);

      animation.play();
    }

  }

  async cerrarSesion() {
    this.auth.logout();
  }

  public irMiClase() {
    this.selectTabs = 'miClase';

  }

}
