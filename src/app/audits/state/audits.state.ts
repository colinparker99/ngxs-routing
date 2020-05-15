import { Injectable } from '@angular/core';
import { State, Store, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Audits } from './Audits.actions';
import { tap } from 'rxjs/operators';

export interface AuditsStateModel {
  customerId: number;
}

@State<AuditsStateModel>({
  name: 'audits',
  defaults: {
    customerId: null
  }
})
@Injectable()
export class AuditsState implements NgxsOnInit {
  constructor(private store: Store) {
    // Subscribe for updates
    store.select(state => state.core.customerId).pipe(
        tap(customerId => store.dispatch(new Audits.InitializeAuditsData(customerId)))
    ).subscribe();
  }

  @Selector()
  static customerId(state: AuditsStateModel) {
    return state.customerId;
  }

  ngxsOnInit(context: StateContext<AuditsStateModel>) {
    // Since this module is lazy-loaded, it could have missed the initial core initialization, so get snapshot
    const snapshotCustomerId = this.store.selectSnapshot(state => state.core.customerId);
    this.store.dispatch(new Audits.InitializeAuditsData(snapshotCustomerId));
  }

  @Action(Audits.InitializeAuditsData)
  initialize(context: StateContext<AuditsStateModel>, action: Audits.InitializeAuditsData) {
    console.log('Audits: Initializing');
    context.setState(
      patch({
        customerId: action.customerId
      })
    );
  }
}
