# Customer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

# Summary
The purpose of this project is to demonstrate several NGXS state management scenarios and to better understand what the preferred ways to handle them are.

# Scenarios

## Initialize State from a Route Parameter
I could have the main app's component read the ID from the route and dispatch an initialize action to `Core`, but I tend to use the following in the `NgxsOnInit` lifecycle hook:
``` javascript
this.actions$.pipe(
      ofActionSuccessful(RouterNavigation),
      tap(action => {
        // Initialize
      })
    ).subscribe();
```

The thought there is that the state is capable of self-initializing, so keep the logic as close to the state as possible.

## Access Centralized State
This project contains several lazy-loaded feature modules, each with their own state, that get data from the app's cross-cutting state (`Core`) that is also in a module. I put the `Core` state in a module rather than leave it in the main app because it is referenced from other modules and didn't want to create circular dependencies between modules consumed by App and App itself.

Generally I have `Core` contain things like the main entity's ID, read from the route, and any sort of counts that are displayed on tabs. For example, audit counts.

## Initialize Lazy-Loaded Module State
In this example project I do one of the following to initialize state in the lazy-laoded feature modules that depends on a value, `customerId`, from `Core` state:
- Subscribe to the `Core` `customerId` and handle initialization when it is updated:
    ``` javascript
    constructor(private store: Store) {
        store.select(state => state.core.customerId).pipe(
            tap(customerId => store.dispatch(new Audits.InitializeAuditsData(customerId)))
        ).subscribe();
    }
    ```
- Get a snapshot of the `Core` state when the state loads. This would be when a lazy-loaded module is loaded after `Core` has initialized:
    ``` javascript
    ngxsOnInit(context: StateContext<AuditsStateModel>) {
        const snapshotCustomerId = this.store.selectSnapshot(state => state.core.customerId);
        this.store.dispatch(new Audits.InitializeAuditsData(snapshotCustomerId));
    }
    ```
