import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { environment } from './../../environments/environment';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    productsService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return a list of products', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(8);
      spyOn(tokenService, 'getToken').and.returnValue('fake token');
      // Act
      productsService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockProducts.length);
        expect(data).toEqual(mockProducts);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer fake token');
      req.flush(mockProducts);
    });
  });

  describe('Tests for getAll', () => {
    it('should return a list of products', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(3);
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockProducts.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockProducts);
    });

    it('should return product list with taxes', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * 0.19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * 0.19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * 0.19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        },
      ];
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockProducts.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockProducts);
      httpTestingController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      // Act
      productsService.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockProducts.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockProducts);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('Tests for create', () => {
    it('should create a new product with post', (doneFn) => {
      // Arrange
      const mockProduct = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'description',
        categoryId: 1,
      };
      // Act
      productsService.create({ ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockProduct);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockProduct);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Tests for update', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const mockProduct = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new Product',
      };
      const productId = '1';
      // Act
      productsService.update(productId, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockProduct);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockProduct);
    });
  });

  describe('Tests for delete', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const mockData = true;
      const productId = '1';
      // Act
      productsService.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });

  describe('Tests for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockProduct = generateOneProduct();
      const productId = '1';
      // Act
      productsService.getOne(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockProduct);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockProduct);
    });

    it('should return right msg when the status code is 404', (doneFn) => {
      // Arrange
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      // Act
      productsService.getOne(productId).subscribe({
        error: (err) => {
          // Assert
          expect(err).toEqual('El producto no existe');
          doneFn();
        },
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });
  });
});
