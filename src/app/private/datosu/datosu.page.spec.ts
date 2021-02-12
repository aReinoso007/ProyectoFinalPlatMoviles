import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosuPage } from './datosu.page';

describe('DatosuPage', () => {
  let component: DatosuPage;
  let fixture: ComponentFixture<DatosuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
