import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'camara',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'general-data',
    loadChildren: () => import('./general-data/general-data.module').then( m => m.GeneralDataPageModule)
  },  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
