import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabcelhomeComponent } from './labcelhome.component';

describe('LabcelhomeComponent', () => {
  let component: LabcelhomeComponent;
  let fixture: ComponentFixture<LabcelhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabcelhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabcelhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
