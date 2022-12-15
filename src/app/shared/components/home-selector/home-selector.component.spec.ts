import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSelectorComponent } from './home-selector.component';

describe('HomeSelectorComponent', () => {
  let component: HomeSelectorComponent;
  let fixture: ComponentFixture<HomeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
