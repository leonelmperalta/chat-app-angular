import { Component, OnInit } from '@angular/core';
import Utils from '../utils/Utils';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  handleSwitch() {
    let theme = Utils.getThemeFromLocalStorage();
    theme === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark');
  }
}
