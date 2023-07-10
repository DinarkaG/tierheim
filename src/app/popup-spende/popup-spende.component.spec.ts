import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupSpendeComponent } from './popup-spende.component';

describe('PopupSpendeComponent', () => {
  let component: PopupSpendeComponent;
  let fixture: ComponentFixture<PopupSpendeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSpendeComponent]
    });
    fixture = TestBed.createComponent(PopupSpendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
