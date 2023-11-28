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

  updateItem(from: Customer, to: Customer): void {
    const list = [...this.state.list()];
    const index = list.indexOf(from);
    list.splice(index, 1, to);
    if (index > -1) {
      patchState(this.state, { list })
    }
  }

  async load() {
    if (!this.list()) return;

    const list = await firstValueFrom( this.customerService.getAll() );

    patchState(this.state, { list });
  }

}
