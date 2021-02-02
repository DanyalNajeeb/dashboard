import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachedComponent } from './reached.component';

describe('ReachedComponent', () => {
  let component: ReachedComponent;
  let fixture: ComponentFixture<ReachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReachedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
