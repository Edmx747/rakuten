import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatFormFieldModule,  } from '@angular/material/form-field';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports:
  [
    RouterModule.forChild(routes),
    MatFormFieldModule,
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
