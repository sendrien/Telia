import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'preface', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'crud/:id',
    loadChildren: () => import('./pages/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'examen',
    loadChildren: () => import('./pages/examen/examen.module').then( m => m.ExamenPageModule)
  },
  {
    path: 'laboratoire',
    loadChildren: () => import('./pages/laboratoire/laboratoire.module').then( m => m.LaboratoirePageModule)
  },
  {
    path: 'preface',
    loadChildren: () => import('./pages/preface/preface.module').then( m => m.PrefacePageModule)
  },
  {
    path: 'info-produit',
    loadChildren: () => import('./pages/info-produit/info-produit.module').then( m => m.InfoProduitPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
