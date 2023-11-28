import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../../pipe/filter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    RouterModule,
    FilterPipe,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductComponent implements OnInit {

  productService = inject(ProductService);

  list = signal<Product[]>([]);

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'manage'];

  // Signals
  filterText = signal<string>('');

  listQty = 0;

  sumPrice = computed(() => {
    return this.list().reduce(( sum, item ) => sum + item.price, 0 );
  });

  activeQty = computed(() => {
    return this.list().filter(item => item.active).length;
  });

  constructor() {
    effect(() => {
      this.listQty = this.list()?.length || 0;
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      list => this.list.set(list)
    );
  }

  onRemove(product: Product): void {
    this.productService.remove(product).subscribe(
      () => {
        this.list.update(list => list.filter(item => item.id !== product.id));
      }
    )
  }

}
