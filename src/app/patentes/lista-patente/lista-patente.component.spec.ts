import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPatenteComponent } from './lista-patente.component';

describe('ListaPatenteComponent', () => {
  let component: ListaPatenteComponent;
  let fixture: ComponentFixture<ListaPatenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPatenteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPatenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
