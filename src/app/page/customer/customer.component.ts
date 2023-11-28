import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerStore } from '../../store/CustomerStore';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [CustomerStore],
})
export class CustomerComponent implements OnInit {
  store = inject(CustomerStore);

  list = this.store.list;

  ngOnInit(): void {
    this.store.load();
  }
}
