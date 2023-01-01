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
      ];
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockProducts.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockProducts);
      httpTestingController.verify();
    });
  });
});
