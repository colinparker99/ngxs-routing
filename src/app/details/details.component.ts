import { Component, OnInit } from '@angular/core';
import { DetailsState } from './state/details.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CoreState } from '../core/state/core.state';

@Component({
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  @Select(DetailsState.customerId) detailsCustomerId$: Observable<number>;
  @Select(CoreState.customerId) coreCustomerId$: Observable<number>;

  constructor() { }
}
