import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasegnaResultadoPage } from './recuperar-contrasegna-resultado.page';

describe('RecuperarContrasegnaResultadoPage', () => {
  let component: RecuperarContrasegnaResultadoPage;
  let fixture: ComponentFixture<RecuperarContrasegnaResultadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperarContrasegnaResultadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
