import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsuccessComponent } from './ticketsuccess.component';

describe('TicketsuccessComponent', () => {
  let component: TicketsuccessComponent;
  let fixture: ComponentFixture<TicketsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
