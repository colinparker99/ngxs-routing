import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { NgxsModule } from '@ngxs/store';
import { DetailsState } from './state/details.state';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    NgxsModule.forFeature([
      DetailsState
    ])
  ],
  exports: [
    DetailsComponent
  ],
  declarations: [
    DetailsComponent
  ]
})
export class DetailsModule { }
