import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './sharedComponent/game/game.component';


const routes: Routes = [
  { path: 'Game', component: GameComponent },
  { path: '', redirectTo: '/Game', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/Game', pathMatch: 'full' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
