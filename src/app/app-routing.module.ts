import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  {
    path: ':id',
    component: CustomerComponent,
    children: [
      { path: 'audits', loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule) },
      { path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
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
  ];
}
