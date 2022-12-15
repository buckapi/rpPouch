import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreaComponent } from './rastrea.component';

describe('RastreaComponent', () => {
  let component: RastreaComponent;
  let fixture: ComponentFixture<RastreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RastreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
