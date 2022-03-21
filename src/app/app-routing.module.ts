import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MapComponent } from './components/map/map.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
// const routes: Routes = [
//   { path: 'heroes', component: HeroesComponent }
// ];
const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent}, 
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'add-post', component: AddPostComponent},
  { path: 'edit-user', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }