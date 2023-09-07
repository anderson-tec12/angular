import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToobarNavigationComponent } from './toobar-navigation.component';

describe('ToobarNavigationComponent', () => {
  let component: ToobarNavigationComponent;
  let fixture: ComponentFixture<ToobarNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToobarNavigationComponent]
    });
    fixture = TestBed.createComponent(ToobarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
