import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationRequiredComponent } from './authorization-required.component';

describe('AuthorizationRequiredComponent', () => {
  let component: AuthorizationRequiredComponent;
  let fixture: ComponentFixture<AuthorizationRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
