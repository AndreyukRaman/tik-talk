import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: `
    :host {
      display: inline-block;
      width: var(--size, 24px);
      height: var(--size, 24px);
    }
  `,
})
export class SvgIcon {
  @Input() icon = '';

  get href(): string {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
