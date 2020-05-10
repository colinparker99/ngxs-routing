import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { State, Actions, ofActionSuccessful, NgxsOnInit, StateContext } from '@ngxs/store';
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

  ngxsOnInit(context: StateContext<CoreStateModel>): void {
    this.actions$.pipe(
      ofActionSuccessful(RouterNavigation),
      tap(action => {
        const customerId = +action.routerState.root.firstChild.params['id'];
        if (customerId && customerId !== context.getState().customerId) {
          // I am dispatching here so other states can listen via action handlers and so the Initialize action is part of the action history. Would selectors and perhaps no action be a preferred approach?
          context.dispatch(new Core.InitializeCoreData(customerId));
        }
      })
    ).subscribe();
  }
}