import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { State, Actions, ofActionSuccessful, NgxsOnInit, StateContext, Selector, Action } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Core } from './core.actions';
import { RouterNavigation } from '@ngxs/router-plugin';

export interface CoreStateModel {
  customerId: number;
}

@State<CoreStateModel>({
  name: 'core',
  defaults: {
    customerId: null
  }
})
@Injectable()
export class CoreState implements NgxsOnInit {
  constructor(private actions$: Actions) {
  }

  @Selector()
  static customerId(state: CoreStateModel) {
    return state.customerId;
  }

  ngxsOnInit(context: StateContext<CoreStateModel>): void {
    this.actions$.pipe(
      ofActionSuccessful(RouterNavigation),
      tap(action => {
        const customerId = +action.routerState.root.firstChild.params['id'];
        if (customerId && customerId !== context.getState().customerId) {
          // I am dispatching here so the Initialize action is part of the action history.
          // Should other state's listen via action handlers or the selector? What's the preferred approach?
          context.dispatch(new Core.InitializeCoreData(customerId));
        }
      })
    ).subscribe();
  }

  @Action(Core.InitializeCoreData)
  initialize(context: StateContext<CoreStateModel>, action: Core.InitializeCoreData) {
    console.log('Core: Initializing');
    context.setState(
      patch({
        customerId: action.customerId
      })
    );
  }
}
