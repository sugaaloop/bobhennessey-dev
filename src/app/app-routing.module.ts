import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FactorioComponent } from './components/factorio/factorio.component';
import { KittensComponent } from './components/kittens/kittens.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kittens', component: KittensComponent, data: { smallHeader: true } },
  { path: 'factorio', component: FactorioComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
