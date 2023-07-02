import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VermittlungComponent } from './vermittlung.component';

describe('VermittlungComponent', () => {
  let component: VermittlungComponent;
  let fixture: ComponentFixture<VermittlungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VermittlungComponent]
    });
    fixture = TestBed.createComponent(VermittlungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
