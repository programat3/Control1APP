import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent  implements OnInit {



  @ViewChild('titulo', { read: ElementRef, static: true }) titulo!: ElementRef;
  @ViewChild('nombre', { read: ElementRef, static: true }) nombre!: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput!: ElementRef;
  @ViewChild('video', { static: false }) video !: ElementRef;
  @ViewChild('canvas', { static: false }) canvas !: ElementRef;

  public usuario: Usuario;
  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement | null = null;

  public sede: number = 0;
  public idAsignatura: number = 0;
  public seccion: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public dia: string = '';
  public bloqueInicio: string = '';
  public bloqueTermino: string = '';
  public horaInicio: string = '';
  public horaFin: string = '';

  constructor(private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController) {
    this.usuario = history.state['usuario'];
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-100%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
    animation.play()
    const animationNombre = this.animationController
      .create()
      .addElement(this.nombre.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translatey(-15px)', 'translatey(15px)');
    animationNombre.play();
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWitdth;
      this.canvas.nativeElement.width = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);

    const img: ImageData = context.getImageData(0, 0, w, h);

    const qrCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });

    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQRLista(this.datosQR);
    }

    return (this.datosQR !== '');
  }

  public mostrarDatosQRLista(datosQR: string): void {

    const objetoDatosQR = JSON.parse(datosQR);
    const navigationExtras: NavigationExtras = {
      state: {
        datos: objetoDatosQR
      }
    };
    this.detenerEscaneoQR();
    this.router.navigate(['/datos'], navigationExtras);
  }

  public verificarArchivoConQR(event: Event) {
    try {
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if (fileList) {
        const file = fileList.item(0)
        const img = new Image();
        img.onload = () => {
          this.obtenerDatosQR(img);
        }
        if (file) {
          img.src = URL.createObjectURL(file);
        }
      }

    } catch { }
  }
  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'enviroment'
      }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();

    requestAnimationFrame(this.verificarVideo.bind(this));
    this.escaneando = true;
  }
  public detenerEscaneoQR(): void {
    this.escaneando = false;

  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = new HTMLIonLoadingElement;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log('datos obtenidos!');
      } else {
        if (this.escaneando) {
          console.log('escaneando...')
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
        else{
          
        }
      }
    } else {
      console.log('video aún no tiene datos');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public limpiarDatos() {
    this.sede = 0;
    this.idAsignatura = 0;
    this.seccion = '';
    this.nombreAsignatura = '';
    this.nombreProfesor = '';
    this.dia = '';
    this.bloqueInicio = '';
    this.bloqueTermino = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

}
