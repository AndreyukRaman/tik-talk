import { Component, output, signal } from '@angular/core';
import { SvgIcon } from '../../../common-ui/svg-icon/svg-icon';
import { Dnd } from '../../../common-ui/directives/dnd';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIcon, Dnd],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  preview = signal<string>('/assets/imgs/avatar-placeholder.png');
  avatarSelected = output<File>();

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.processFile(file);
  }

  processFile(file: File) {
    if (!file.type.match('image')) return;

    this.avatarSelected.emit(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.preview.set(reader.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
  }
}
