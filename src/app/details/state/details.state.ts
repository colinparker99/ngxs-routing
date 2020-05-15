import { Injectable } from '@angular/core';
import { State, Store, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Details } from './details.actions';
import { tap } from 'rxjs/operators';

export interface DetailsStateModel {
  customerId: number;
}

@State<DetailsStateModel>({
  name: 'details',
  defaults: {
    customerId: null
  }
})
@Injectable()
export class DetailsState implements NgxsOnInit {
  constructor(private store: Store) {
    // Subscribe for updates
    store.select(state => state.core.customerId).pipe(
        tap(customerId => store.dispatch(new Details.InitializeDetailsData(customerId)))
    ).subscribe();
  }

  @Selector()
  static customerId(state: DetailsStateModel) {
    return state.customerId;
  }

  ngxsOnInit(context: StateContext<DetailsStateModel>) {
    // Since this module is lazy-loaded, it could have missed the initial core initialization, so get snapshot
    const snapshotCustomerId = this.store.selectSnapshot(state => state.core.customerId);
    this.store.dispatch(new Details.InitializeDetailsData(snapshotCustomerId));
  }

  @Action(Details.InitializeDetailsData)
  initialize(context: StateContext<DetailsStateModel>, action: Details.InitializeDetailsData) {
    console.log('Details: Initializing');
    context.setState(
      patch({
        customerId: action.customerId
      })
    );
  }
}
