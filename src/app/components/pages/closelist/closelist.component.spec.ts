import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloselistComponent } from './closelist.component';

describe('CloselistComponent', () => {
  let component: CloselistComponent;
  let fixture: ComponentFixture<CloselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
