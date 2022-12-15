import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutregisterComponent } from './outregister.component';

describe('OutregisterComponent', () => {
  let component: OutregisterComponent;
  let fixture: ComponentFixture<OutregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
