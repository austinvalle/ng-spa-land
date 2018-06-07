import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spa-element-button',
  template: `
    <button (click)="handleClick()">{{label}}</button>
  `,
  styles: [`
    button {
      border: solid 3px;
      padding: 8px 10px;
      background: #00FF00;
      font-size: 20px;
    }
  `],
  encapsulation: ViewEncapsulation.Native
})
export class SpaElementButtonComponent {
  @Input() label = 'default label';
  @Output() action = new EventEmitter<number>();
  private clicksCt = 0;

  handleClick() {
    this.clicksCt++;
    this.action.emit(this.clicksCt);
  }

}
