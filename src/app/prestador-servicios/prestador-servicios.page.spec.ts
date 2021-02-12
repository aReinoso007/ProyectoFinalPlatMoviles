import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestadorServiciosPage } from './prestador-servicios.page';

describe('PrestadorServiciosPage', () => {
  let component: PrestadorServiciosPage;
  let fixture: ComponentFixture<PrestadorServiciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadorServiciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestadorServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
