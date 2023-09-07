import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;
  @ViewChild('nombre', { read: ElementRef, static: true}) nombre!: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput!: ElementRef;
  public usuario: Usuario;
  
  
  constructor(
    private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
    , private router: Router // Permite navegar entre páginas
    , private animationController: AnimationController) {

    this.usuario = new Usuario('', '', '', '', '');
    this.activeroute.queryParams.subscribe(params => { 

    const nav = this.router.getCurrentNavigation();
    if (nav) {
      return;
    }
    this.router.navigate(['/login']);

  });
}
  
  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
      const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
      animation.play();
  }

  public cargarImagenDesdeArchivo() :void{
    this.fileinput.nativeElement.click();
  }

}
