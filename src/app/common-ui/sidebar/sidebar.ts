import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, RouterLink, RouterLinkActive, SubscriberCard, AsyncPipe, JsonPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();


  menuItems = [
    { label: 'Home', icon: 'home', link: '' },
    { label: 'Chats', icon: 'chats', link: 'chats' },
    { label: 'Search', icon: 'search', link: 'search' },
  ];
}
