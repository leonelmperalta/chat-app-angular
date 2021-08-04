import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  animations: [
    trigger('enterMessageTrigger', [
      transition(':enter', [
        animate(
          '1.1s',
          keyframes([
            style({
              transform: 'translateX(600px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(0)',
              opacity: 1,
              offset: 0.38,
            }),
            style({
              transform: 'translateX(68px)',
              offset: 0.55,
            }),
            style({
              transform: 'translateX(0)',
              offset: 0.72,
            }),
            style({
              transform: 'translateX(32px)',
              offset: 0.81,
            }),
            style({
              transform: 'translateX(0)',
              offset: 0.9,
            }),
            style({
              transform: 'translateX(8px)',
              offset: 0.95,
            }),
            style({
              transform: 'translateX(0px)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MessageComponent implements OnInit {
  @Input() messages: Message[];
  constructor() {}

  ngOnInit(): void {}
}
