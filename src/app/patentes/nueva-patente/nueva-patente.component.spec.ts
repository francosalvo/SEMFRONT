import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPatenteComponent } from './nueva-patente.component';

describe('NuevaPatenteComponent', () => {
  let component: NuevaPatenteComponent;
  let fixture: ComponentFixture<NuevaPatenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPatenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPatenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
