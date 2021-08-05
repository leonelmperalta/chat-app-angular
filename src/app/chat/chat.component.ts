import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '../models/message';
import Utils from '../utils/Utils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  private client: Client;
  connected: boolean;
  message: Message = new Message();
  messages: Message[] = [];
  writing: string;
  clientId: string;
  getTheme() {
    return Utils.getThemeFromLocalStorage();
  }
  @ViewChild('scrollChat') scrollContainer: ElementRef;
  scrolltop: number | null = null;

  constructor() {
    this.clientId =
      'id-' +
      new Date().getUTCMilliseconds() +
      '-' +
      Math.random().toString(36).substr(2);
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    };
    this.client.onConnect = (frame) => {
      console.log('Connected: ' + this.client.connected + ' : ' + frame);
      this.client.subscribe('/chat/message', (update) => {
        let message: Message = JSON.parse(update.body) as Message;
        this.messages.push(message);
        if (
          !this.message.color &&
          message.type === 'NEW_USER' &&
          this.message.username === message.username
        ) {
          this.message.color = message.color;
        }
      });
      this.client.subscribe('/chat/writing', (update) => {
        this.writing = update.body;
        setTimeout(() => (this.writing = ''), 1800);
      });
      this.client.subscribe(`/chat/history/${this.clientId}`, (update) => {
        const history = JSON.parse(update.body) as Message[];
        this.messages = history
          .map((m) => {
            m.date = new Date(m.date);
            return m;
          })
          .reverse();
      });

      this.client.publish({
        destination: '/app/history',
        body: this.clientId,
      });

      this.message.type = 'NEW_USER';
      this.client.publish({
        destination: '/app/message',
        body: JSON.stringify(this.message),
      });
    };
    this.client.onDisconnect = (frame) => {
      console.log('Disconnected: ' + !this.client.connected + ' : ' + frame);
      this.message = new Message();
      this.messages = [];
    };
  }

  connect(): void {
    this.client.activate();
    this.connected = true;
  }

  disconnect(): void {
    this.client.deactivate();
    this.connected = false;
  }

  sendMessage(): void {
    this.message.type = 'NEW_MESSAGE';
    this.client.publish({
      destination: '/app/message',
      body: JSON.stringify(this.message),
    });
    this.message.text = '';
  }

  userWritingEvent(): void {
    this.message.type = 'USER_WRITING';
    this.client.publish({
      destination: '/app/writing',
      body: this.message.username,
    });
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
