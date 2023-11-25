import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recuperar-exitoso',
  templateUrl: './recuperar-exitoso.page.html',
  styleUrls: ['./recuperar-exitoso.page.scss'],
})
export class RecuperarExitosoPage implements OnInit {

  public usuario: Usuario;

  constructor(private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) {
    this.usuario = history.state['usuario'];
  }

  ngOnInit(): void {

  }
  public volver() {
    this.router.navigate(['/login']);
  }

  volverLogin() {
    this.router.navigate(['/login'])
  }

}
