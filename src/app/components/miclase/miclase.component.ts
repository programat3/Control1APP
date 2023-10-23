import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Asistencia } from 'src/app/model/asistencia';
import { DataBaseService } from 'src/app/services/data-base.service';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MiclaseComponent  implements OnInit {

  @ViewChild('titulo', { read: ElementRef, static: true }) titulo!: ElementRef;

  asistencia= new Asistencia();

  constructor(private bd: DataBaseService) { }

  ngOnInit() {
    this.bd.datosQR.subscribe((datosQR) => {
      this.asistencia = new Asistencia().obtenerAsistenciaDesdeQR(datosQR);
    });
  }

}
