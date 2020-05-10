import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule
  ],
  exports: [
    DetailsComponent
  ],
  declarations: [
    DetailsComponent
  ]
})
export class DetailsModule { }
