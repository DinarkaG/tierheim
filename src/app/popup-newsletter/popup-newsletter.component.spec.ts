import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewsletterComponent } from './popup-newsletter.component';

describe('PopupNewsletterComponent', () => {
  let component: PopupNewsletterComponent;
  let fixture: ComponentFixture<PopupNewsletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupNewsletterComponent]
    });
    fixture = TestBed.createComponent(PopupNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
