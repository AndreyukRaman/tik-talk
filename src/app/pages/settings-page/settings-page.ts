import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { AvatarUpload } from './avatar-upload/avatar-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  private fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  router = inject(Router)

  avatar: File | null = null;

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      const me = this.profileService.me();
      if (!me) return;

      this.form.patchValue({
        firstName: me.firstName,
        lastName: me.lastName,
        username: me.username,
        description: me.description,
        stack: me.stack?.join(', '),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { stack, ...rest } = this.form.value;

    this.profileService
      .patchProfile({
        ...rest,
        stack: stack ? stack.split(',').map((s) => s.trim()) : [],
      })
      .subscribe();

    if (this.avatar) {
      this.profileService.uploadImage(this.avatar).subscribe();
    }

    this.router.navigate(['/profile/me']);
  }

}
