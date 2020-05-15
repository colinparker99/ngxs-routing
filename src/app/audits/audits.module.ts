import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditsRoutingModule } from './audits-routing.module';
import { NgxsModule } from '@ngxs/store';
import { AuditsState } from './state/audits.state';
import { AuditsComponent } from './audits.component';

@NgModule({
  imports: [
    CommonModule,
    AuditsRoutingModule,
    NgxsModule.forFeature([
      AuditsState
    ])
  ],
  exports: [
    AuditsComponent
  ],
  declarations: [
    AuditsComponent
  ]
})
export class AuditsModule { }
