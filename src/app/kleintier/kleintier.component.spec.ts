import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KleintierComponent } from './kleintier.component';

describe('KleintierComponent', () => {
  let component: KleintierComponent;
  let fixture: ComponentFixture<KleintierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KleintierComponent]
    });
    fixture = TestBed.createComponent(KleintierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
