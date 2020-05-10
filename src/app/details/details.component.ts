import { Component, OnInit } from '@angular/core';
import { DetailsState } from './state/details.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CoreState } from '../core/state/core.state';

@Component({
  templateUrl: './details.component.html',
  styleUrls: []
})
export class DetailsComponent implements OnInit {
  @Select(DetailsState.customerId) detailsCustomerId$: Observable<number>;
  @Select(CoreState.customerId) coreCustomerId$: Observable<number>;

  constructor() { }

  ngOnInit() {
  }
}
