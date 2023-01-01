import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
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
    it('should return  an array of products', (doneFn) => {
      // Arrange
      const mockProducts: Product[] = [
        {
          id: '1',
          title: 'Product 1',
          price: 100,
          description: 'Product 1 description',
          category: {
            id: 1,
            name: 'Category 1',
          },
          images: ['img', 'img'],
        },
      ];
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
});
