import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;
  @ViewChild('nombre', { read: ElementRef, static: true}) nombre!: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput!: ElementRef;
  @ViewChild('video',{static: false}) video !: ElementRef;
  @ViewChild('canvas',{static: false}) canvas !: ElementRef;

  public usuario: Usuario;
  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = new HTMLIonLoadingElement();
  
  constructor(private loadingController : LoadingController,
    private route: ActivatedRoute,
      private router: Router,
      private animationController: AnimationController)
      {
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
      animation.play();
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean{
    let w = 0;
    let h = 0;
    if(!source){
      this.canvas.nativeElement.width = this.video.nativeElement.videoWitdth;
      this.canvas.nativeElement.width = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source? source : this.video.nativeElement, 0 , 0 , w, h);

    const img: ImageData = context.getImageData(0,0,w,h);

    const qrCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert'});

    if(qrCode){
      this.escaneando = false;
      this.datosQR = qrCode.data;
    }

    return(this.datosQR !== '');

  }

  public verificarArchivoConQR(event : Event){
    try {
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if(fileList){
        const file = fileList.item(0)
        const img = new Image();
        img.onload = () => {
        this.obtenerDatosQR(img);
      }
      if(file){
        img.src = URL.createObjectURL(file);
      }
      }
      
    } catch{}
  }
  public cargarImagenDesdeArchivo() :void{
    //this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public async comenzarEscaneoQR(){
    //this.limpiarDatos();
    const mediaProvider : MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'enviroment'
      }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();

    requestAnimationFrame(this.verificarVideo.bind(this));
  }
  public detenerEscaneoQR() : void{
    this.escaneando = false;
  }  

  async verificarVideo(){
    if(this.video.nativeElement.readyState ===  this.video.nativeElement.HAVE_ENOUGH_DATA){
      if (this.loading){
        await this.loading.dismiss();
        this.loading = new HTMLIonLoadingElement;
        this.escaneando = true;
      }
      if(this.obtenerDatosQR()){
        console.log('datos obtenidos!');
      }else{
        if(this.escaneando){
          console.log('escaneando...')
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else{
      console.log('video aún no tiene datos');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public limpiarDatos(){
    this.escaneando = false;
    this.datosQR = '';
    this.loading = new HTMLIonLoadingElement();
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

}
