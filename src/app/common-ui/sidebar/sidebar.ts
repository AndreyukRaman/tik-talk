import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, RouterLink, RouterLinkActive, SubscriberCard],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems = [
    { label: 'Home', icon: 'home', link: '' },
    { label: 'Chats', icon: 'chats', link: 'chats' },
    { label: 'Search', icon: 'search', link: 'search' },
  ];
}
