import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './pages/nav/nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'nav',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule ),
        canActivate: [AuthGuard]
      },
      {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule ),
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule ),
        canActivate: [AuthGuard]
      }
    ]  
  },
  // { path: 'search/:paramSearched', component: SearchComponent },
  // { path: 'search', component: SearchComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }