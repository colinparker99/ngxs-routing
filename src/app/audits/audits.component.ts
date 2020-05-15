import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CoreState } from '../core/state/core.state';
import { AuditsState } from './state/audits.state';

@Component({
    templateUrl: 'audits.component.html'
})
export class AuditsComponent {
    @Select(AuditsState.customerId) auditsCustomerId$: Observable<number>;
    @Select(CoreState.customerId) coreCustomerId$: Observable<number>;

    constructor() { }
}
