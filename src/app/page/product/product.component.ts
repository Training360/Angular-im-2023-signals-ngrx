import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableSettingsComponent } from '../../common/table-settings/table-settings.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    CommonModule,
    TableSettingsComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    CdkDropList,
  ],
  providers: [
    ProductService
  ],
})
export class ProductComponent {

  productService = inject(ProductService);

  list$ = this.productService.getAll();

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'manage'];

  onRemove(product: Product): void {
    this.productService.remove(product);
  }

}
