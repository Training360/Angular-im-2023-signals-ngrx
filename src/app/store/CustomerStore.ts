import { Injectable, inject } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { firstValueFrom } from 'rxjs';

type CustomerState = {
  list: Customer[];
  query: string;
  selected: Customer | null;
  error: string;
};

@Injectable()
export class CustomerStore {

  customerService = inject(CustomerService);

  private state = signalState<CustomerState>({
    list: [],
    query: '',
    selected: null,
    error: '',
  });

  readonly list = this.state.list;

  readonly query = this.state.query;

  readonly selected = this.state.selected;

  readonly error = this.state.error;

  async updateItem(customer: Customer) {
    const updated = await firstValueFrom( this.customerService.update(customer) );
    const list = [...this.state.list()];
    const index = list.findIndex(item => item.id === updated.id);
    if (index > -1) {
      list.splice(index, 1, updated);
      patchState(this.state, { list });
    }
  }

  async load() {
    if (this.list().length > 0) return;

    let list: Customer[] = [];

    try {
      list = await firstValueFrom( this.customerService.getAll() );
    } catch (error) {
      patchState(this.state, { error: String(error) });
    }

    patchState(this.state, { list });
  }

  async selectItem(id: number) {
    if (!this.list().length) {
      await this.load();
    }

    const selected = this.list().find(item => item.id === id);

    if (selected) {
      patchState(this.state, { selected });
      return;
    }

    patchState(this.state, { error: `Customer ${id} not found` });
  }

  async removeItem(customer: Customer) {
    await firstValueFrom( this.customerService.remove(customer) );
    const list = [...this.state.list()];
    const index = list.findIndex(item => item.id === customer.id);
    if (index > -1) {
      list.splice(index, 1);
      patchState(this.state, { list });
    }
  }

}
