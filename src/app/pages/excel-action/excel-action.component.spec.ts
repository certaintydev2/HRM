import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelActionComponent } from './excel-action.component';

describe('ExcelActionComponent', () => {
  let component: ExcelActionComponent;
  let fixture: ComponentFixture<ExcelActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
