import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
 

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message',(msg) => {
      this.message$.next(msg);
    })

    return this.message$.asObservable();
  }
  
}


