import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaboratoirePage } from './laboratoire.page';

describe('LaboratoirePage', () => {
  let component: LaboratoirePage;
  let fixture: ComponentFixture<LaboratoirePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoirePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaboratoirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
