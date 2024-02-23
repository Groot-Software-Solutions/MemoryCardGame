import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemoryCardGameService } from 'src/app/Services/memory-card-game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  playerJoinedSubscription!: Subscription;
  playerFindCard!: Subscription;
  playerCard!: Subscription;
  players: any[] = [];
  cards: any[] = [];
  boardPieces!: any[];
  gameStarted: boolean = false;

  constructor(private signalRService: MemoryCardGameService) { }

  ngOnInit(): void {
    // Fetch initial game data from API
    // this.signalRService.getInitialBoard().subscribe((data: any) => {
    //   this.boardPieces = data.Board.Pieces;
    // });

    // Start SignalR connection
    // this.signalRService.startConnection();


  }

  resetFlip(){
    this.signalRService.resetFlipCardSubscribe$.subscribe((data:any) =>{
      console.log(data)
    })
  }
  joinGame() {
    const username = (document.getElementById('usernameTb') as HTMLInputElement).value;
    this.signalRService.joinGame(username);
      this.playerJoinedSubscription = this.signalRService.playerJoined$.subscribe((player: any) => {
        this.players.push(player);

      this.gameStarted = true;
    });
    this.playerCard = this.signalRService.build$.subscribe((player: any) => {

      this.cards = player.board.pieces.map((card: any) => {
        return { ...card, image: `assets/${card.image}` };
      });

      // this.players.push(player);
      console.log(player);


      this.gameStarted = true;
    });

  }

  flipCard(event: any) {
    console.log(event, "event");
    let getCardClass = event.currentTarget.classList;
    let getCardIdName = event.currentTarget.id;
    let isCardMatchClassAvailable = getCardClass.contains("match");
    let isCardFlipClassAvailable = getCardClass.contains("flip");


    if (!(isCardMatchClassAvailable && isCardFlipClassAvailable)) {
      debugger
      console.log(this.players,"players");
      
      this.signalRService.Flip(getCardIdName,this.players[0].name);
       
    }
    this.signalRService.flipCardSubscribe$.subscribe((data:any)=>{
      debugger
      let containerReference = document.getElementById("card-" + data.id);
      containerReference?.classList.add("flip");
      containerReference?.classList.add("match");
        
      console.log(data,"data");
      console.log(containerReference,"contain");
      });

    this.signalRService.resetFlipCardSubscribe$.subscribe((data:any)=>{
      console.log("data",data);
      
      var cA =  document.getElementById("card-" + data.cardA.id);
      var cB =  document.getElementById("card-" + data.cardB.id);
     
      var delay = setTimeout(function () {
          cA?.classList.remove("flip");
          cB?.classList.remove("flip");
      }, 1500);
      });
  }

  checkCard(cardId: string) {
    //this.signalRService.checkCard(cardId);
  }

}
