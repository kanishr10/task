import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-user', pathMatch: 'full' },
  {path:'add-user', component: AddUserComponent},
  {path:'user-list', component: UserlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
