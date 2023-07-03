import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HundComponent } from './hund.component';

describe('HundComponent', () => {
  let component: HundComponent;
  let fixture: ComponentFixture<HundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HundComponent]
    });
    fixture = TestBed.createComponent(HundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
