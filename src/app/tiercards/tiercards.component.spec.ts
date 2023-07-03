import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiercardsComponent } from './tiercards.component';

describe('TiercardsComponent', () => {
  let component: TiercardsComponent;
  let fixture: ComponentFixture<TiercardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiercardsComponent]
    });
    fixture = TestBed.createComponent(TiercardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
