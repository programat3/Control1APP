import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-fallido',
  templateUrl: './recuperar-fallido.page.html',
  styleUrls: ['./recuperar-fallido.page.scss'],
})
export class RecuperarFallidoPage implements OnInit {

  constructor(private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

  public volver() {
    this.router.navigate(['/login']);
  }

  volverLogin() {
    this.router.navigate(['/login'])
  }

}
