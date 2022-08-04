import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaylistComponent } from './holidaylist.component';

describe('HolidaylistComponent', () => {
  let component: HolidaylistComponent;
  let fixture: ComponentFixture<HolidaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
