import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { environment } from './../../environments/environment';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productsService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return a list of products', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(8);
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
      req.flush(mockProducts);
      httpTestingController.verify();
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
      httpTestingController.verify();
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
      httpTestingController.verify();
    });
  });
});
