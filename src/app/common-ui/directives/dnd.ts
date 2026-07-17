import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[dnd]',
})
export class Dnd {
  fileDropped = output<File>();

  @HostBinding('class.active') isActive = false;

  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.isActive = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.isActive = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.isActive = false;

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      this.fileDropped.emit(file);
    }
  }
}
