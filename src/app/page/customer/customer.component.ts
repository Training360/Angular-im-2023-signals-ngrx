import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerStore } from '../../store/CustomerStore';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [CustomerStore],
})
export class CustomerComponent implements OnInit {
  store = inject(CustomerStore);

  list = this.store.list;

  displayedColumns = ['id', 'name', 'email', 'address', 'ip_address', 'active', 'manage'];

  ngOnInit(): void {
    this.store.load();
  }

  onRemove(customer: Customer): void {
    this.store.removeItem(customer);
  }
}
