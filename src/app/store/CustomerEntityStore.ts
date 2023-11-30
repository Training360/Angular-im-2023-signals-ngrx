import { Type, computed, effect, inject } from '@angular/core';
import {
  signalStore,
  type,
  withComputed,
  withMethods,
  patchState,
  withState,
  withHooks,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { firstValueFrom } from 'rxjs';

export const CustomerEntityStore = signalStore(
  { providedIn: 'root' },
  withState({
    selectID: 0,
    initialized: false,
    loading: false,
  }),

  // Defining an Entity
  withEntities({
    entity: type<Customer>(),
    collection: 'customers',
  }),

  withMethods((state) => {
    const customerService = inject(CustomerService);

    return {
      load: async () => {
        const customers = await firstValueFrom(customerService.getAll());
        patchState(
          state,
          setAllEntities(customers, { collection: 'customers' })
        );
      },
    };
  }),

  // withEntities created a customersEntities signal for us:
  withComputed(({ customersEntities, selectID }) => ({
    selected: computed(() => customersEntities().filter((c) => c.id === selectID())),
  })),

  withMethods((state) => {
    const { customersEntities, selectID, initialized } = state;
    const customerService = inject(CustomerService);

    return {
      updateSelectID: (selectID: number) => {
        patchState(state, { selectID });
      },
    };
  }),

  withHooks({
    onInit(store: any) {

      effect(() => {
        console.log('customerEntityMap', store.customerEntityMap())
        // console.log('flightIds', store.flightIds())
        // console.log('flightEntities', store.flightEntities())
      });

    },
    onDestroy() {
      console.log('flights are destroyed');
    },
  }),

);
