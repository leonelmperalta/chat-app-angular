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
import Utils from '../utils/Utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  animations: [
    trigger('enterMessageTrigger', [
      transition(':enter', [
        animate(
          '0.8s cubic-bezier(.455,.030,.515,.955)',
          keyframes([
            style({
              transform: 'translateX(0px)',
              offset: 0,
            }),
            style({
              transform: 'translateX(-10px)',
              offset: 0.1,
            }),

            style({
              transform: 'translateX(10px)',
              offset: 0.2,
            }),
            style({
              transform: 'translateX(-10px)',
              offset: 0.3,
            }),

            style({
              transform: 'translateX(10px)',
              offset: 0.4,
            }),
            style({
              transform: 'translateX(-10px)',
              offset: 0.5,
            }),

            style({
              transform: 'translateX(10px)',
              offset: 0.6,
            }),

            style({
              transform: 'translateX(-10px)',
              offset: 0.7,
            }),
            style({
              transform: 'translateX(8px)',
              offset: 0.8,
            }),
            style({
              transform: 'translateX(-8px)',
              offset: 0.9,
            }),

            style({
              transform: 'translateX(0)',
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
  getTheme() {
    return Utils.getThemeFromLocalStorage();
  }
  constructor() {}

  ngOnInit(): void {}
}
