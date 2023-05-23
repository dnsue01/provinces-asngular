import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalResutadosComponent } from './total-resutados.component';

describe('TotalResutadosComponent', () => {
  let component: TotalResutadosComponent;
  let fixture: ComponentFixture<TotalResutadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalResutadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalResutadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
