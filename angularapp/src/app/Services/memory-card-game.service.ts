import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardGameService {
  private hubConnection!: HubConnection;
  hubUrl: string;
  connection: any;
  public playerJoined$ = new Subject<any>();
  public FindCard$ = new Subject<any>();
  public build$ = new Subject<any>();
 public cardFlipSubscribe$ = new Subject<any>();
 public flipCardSubscribe$ = new Subject<any>();
 public resetFlipCardSubscribe$ = new Subject<any>();

  constructor(private http: HttpClient) {
    this.hubUrl = 'https://localhost:7176/gameshub';
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start({ withCredentials: false })
      this.connection.on('playerJoined', (data: any) => {

        this.playerJoined$.next(data)
      });
      this.connection.on('FindCard', (data: any) => {

        this.FindCard$.next(data)
      });
      this.connection.on('buildBoard', (data: any) => {

        this.build$.next(data)
      });
      this.connection.on('flipCard', (data: any) => {

        this.flipCardSubscribe$.next(data)
      });


      this.connection.on('resetFlip', (cardA: any, cardB:any) => {

        this.resetFlipCardSubscribe$.next({cardA,cardB})
      });


      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }
  Flip(idName: string , userName:string) {
    debugger

    this.cardFlipSubscribe$ = this.connection.invoke('flip', idName,userName)
      .then((result: boolean) => {
        if (result) {
          console.log("result",result);
          
          this.checkCard(idName,userName);
        }
      })
      .catch((err: any) => console.error('Error while invoking "flip" method: ', err));

    // this.cardFlipSubscribe$ = this.connection.invoke('Flip', idName,userName);

  }

  // checkCardMatch(idName: string) {
  //   debugger
  //   this.connection.invoke('checkCard', idName);
  // }

  getInitialBoard() {
    return this.http.get(this.hubUrl);
  }

  // joinGame(username: string): void {
  //   
  //      this.hubConnection.invoke('Join', username)
  //       .catch(err => console.error(err));
  //    }

  flipCard(cardName: string): void {
    this.hubConnection.invoke('Flip', cardName)
      .catch(err => console.error(err));
  }



  checkCard(cardName: string, username: string): void {
    this.connection.invoke('CheckCard', cardName, username)
      .catch((err:any) => console.error(err));
  }


  joinGame(username: string) {

    this.connection
      .invoke('Join', username)
  };
}


// joinGame(username: string): void {
//   this.hubConnection.invoke('Join', username)
//     .catch(err => console.error(err));
// }

// flipCard(cardName: string): void {
//   this.hubConnection.invoke('Flip', cardName)
//     .catch(err => console.error(err));
// }

// checkCard(cardName: string): void {
//   this.hubConnection.invoke('CheckCard', cardName)
//     .catch(err => console.error(err));
// }

