import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from './../../environments/environment';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Tests for login', () => {
    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: 'fake token',
      };
      const email = 'fake@mail.com';
      const password = 'fake password';
      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
    });

    it('should call to saveToken', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: 'fake token',
      };
      const email = 'fake@mail.com';
      const password = 'fake password';
      spyOn(tokenService, 'saveToken').and.callThrough(); // to spy on the function but do not execute it, like calling a fake function
      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('fake token');
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
    });
  });
});
