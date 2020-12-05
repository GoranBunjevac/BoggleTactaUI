import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadChildren: () => import('./features/splash/splash.module').then((m) => m.SplashModule),
  },
  {
    path: 'single-player',
    loadChildren: () =>
      import('./features/single-player/single-player.module').then(
        (m) => m.SinglePlayerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
