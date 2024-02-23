import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MemoryCardGameService } from './Services/memory-card-game.service';
import { CardComponent } from './sharedComponent/card/card.component';
import { GameComponent } from './sharedComponent/game/game.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule 
  ],
  providers: [
    MemoryCardGameService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: MemoryCardGameService) => () => signalrService.initiateSignalrConnection(),
      deps: [MemoryCardGameService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
