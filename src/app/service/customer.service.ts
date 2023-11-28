import { Injectable, inject } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http = inject(HttpClient);

  apiUrl: string = environment.apiUrl + 'customers/';

  constructor() { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.apiUrl}${customer.id}`, customer);
  }

  remove(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}${customer.id}`);
  }

}
