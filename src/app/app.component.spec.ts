import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'


describe('Probar el comienzo de la aplicacion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se deberia crear la aplicacion', () => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [RouterTestingModule]
      }
    });

    it('Probar que el titulo de la App sea "Asistencia Duoc UC"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('Asistencia Duoc UC');
    });
  });
});
