import { computed, inject } from '@angular/core';
import { signalStore, type, withComputed, withMethods, patchState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { firstValueFrom } from 'rxjs';

const CustomerEntityStore = signalStore(

  // Defining an Entity
  withEntities({ entity: type<Customer>(), collection: 'customers' }),

  withMethods((state) => {
    const customerService = inject(CustomerService);

    return {
      load: async () => {
        const customers = await firstValueFrom( customerService.getAll() );
        patchState(state, setAllEntities(customers, { collection: 'customers' }));
      },
    }
  })

  // withEntities created a customersEntities signal for us:
  // withComputed(({ customersEntities, basket, from, to }) => ({
  //   selected: computed(() => customersEntities().filter((c) => basket()[c.id])),
  //   criteria: computed(() => ({ from: from(), to: to() })),
  // })),

  // withMethods((state) => {
  //   const { basket, customersEntities, from, to, initialized } = state;
  //   const flightService = inject(FlightService);

  //   return {
  //     [...],

  //     load: async () => {
  //       if (!from() || !to()) return;
  //       patchState(state, setLoading());

  //       const flights = await flightService.findPromise(from(), to());

  //       // Updating entities with out-of-the-box setAllEntities Updater
  //       patchState(state, setAllEntities(flights, { collection: 'flight' }));
  //       patchState(state, setLoaded());
  //     },

  //     [...],
  //   };
  // }),
);
