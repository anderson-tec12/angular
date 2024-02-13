import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToobarNavigationComponent } from './toobar-navigation.component';

describe('ToobarNavigationComponent', () => {
  let component: ToobarNavigationComponent;
  let fixture: ComponentFixture<ToobarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToobarNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToobarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
