import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  {
    path: ':id',
    component: CustomerComponent,
    children: [
      { path: 'audits', component: CustomerComponent },
      { path: 'details', component: CustomerComponent },
      { path: '', redirectTo: 'details', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [
    CustomerComponent
  ]
}
