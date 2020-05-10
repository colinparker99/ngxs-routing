import { Injectable } from '@angular/core';
import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { CoreState } from 'src/app/core/state/core.state';
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
export class DetailsState {
  constructor(store: Store) {
      store.select(state => state.core.customerId).pipe(
          tap(customerId => store.dispatch(new Details.InitializeDetailsData(customerId)))
      ).subscribe();
  }

  @Selector()
  static customerId(state: DetailsStateModel) {
    return state.customerId;
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
