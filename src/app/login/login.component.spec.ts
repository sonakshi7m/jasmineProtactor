import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LoginComponent } from './login.component';
import { MockAuthenticationService } from '../mock/authentication.service.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('.btn-login'));
  });

  afterEach(() => {
    component = null;
    el = null;
  });

  it('should create loginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should not show loader on component init', () => {
    expect(component.loading).toBe(false);
  })

  it('should contain a default value for the login form', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  })

  it('login button should have label Login ', () => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toBe('');
    expect(el.nativeElement.textContent.trim()).toBe('Login');
  })

  it('should set values when component is initialized', () => {

    //action
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(component.submitted).toBe(false);
    expect(component.loginForm.value).toEqual({ username: '', password: '' });

  });

  it('should check if form is valid and login user and navigate to dashboard ', () => {
    component.loginForm.setValue({ username: 'test', password: 'test@123' });
    spyOn(component.router, 'navigate');

    component.onSubmit();
    component.router.navigate(['dashboard']);
    expect(component.loading).toBe(false);
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(jasmine.any(Array));
    expect(component.router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining(['dashboard']))
  })

  it('should not call login if form is not valid ', () => {
    component.loginForm.setValue({ username: 'test', password: 'test123' });
    spyOn(component.router, 'navigate');

    component.onSubmit();
    expect(component.router.navigate).not.toHaveBeenCalled();
  })

  it('should call onLoginFailure when server returns error ', () => {
    component.loginForm.setValue({ username: 'sendError', password: 'test123' });
    spyOn(component.router, 'navigate');
    spyOn(component, 'onLoginFailure');
    spyOn(component.loginForm, 'reset');

    component.onSubmit();
    expect(component.router.navigate).not.toHaveBeenCalled();
    expect(component.onLoginFailure).toHaveBeenCalled();
    expect(component.loginForm.reset).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  })

});
