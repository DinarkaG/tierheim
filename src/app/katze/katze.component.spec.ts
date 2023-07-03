import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatzeComponent } from './katze.component';

describe('KatzeComponent', () => {
  let component: KatzeComponent;
  let fixture: ComponentFixture<KatzeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KatzeComponent]
    });
    fixture = TestBed.createComponent(KatzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
