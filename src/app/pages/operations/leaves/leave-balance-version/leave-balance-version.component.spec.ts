import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceVersionComponent } from './leave-balance-version.component';

describe('LeaveBalanceVersionComponent', () => {
  let component: LeaveBalanceVersionComponent;
  let fixture: ComponentFixture<LeaveBalanceVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveBalanceVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
