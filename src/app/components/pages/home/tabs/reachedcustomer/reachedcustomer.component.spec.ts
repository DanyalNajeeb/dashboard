import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachedcustomerComponent } from './reachedcustomer.component';

describe('ReachedcustomerComponent', () => {
  let component: ReachedcustomerComponent;
  let fixture: ComponentFixture<ReachedcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReachedcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachedcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
