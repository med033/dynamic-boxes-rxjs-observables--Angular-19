import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectionService } from '../services/selection.service';
import { FontSquareComponent } from '../font-square/font-square.component';
import { Font } from '../models/font.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FontSquareComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('gridAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate(
          '300ms ease',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnDestroy {
  private selectionService = inject(SelectionService);
  fonts$: Observable<Font[]> = this.selectionService.fonts$;
  selectedSlotIndex$: Observable<number> =
    this.selectionService.selectedSlotIndex$;
  // Show content when a slot is selected
  showContent$ = this.selectedSlotIndex$.pipe(
    map(slotIndex => slotIndex > -1)
  );
  constructor() {}

  ngOnDestroy(): void {}

  // Helper for template
  trackByFontId(index: number, font: Font): number {
    return font.id;
  }

  // Helper for columns in template
  distributeIntoColumns(fonts: Font[]): Font[][] {
    const columns: Font[][] = [[], [], []];
    fonts.forEach((font, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(font);
    });
    return columns;
  }
  getSelectedFonts(fonts: Font[]): (Font | null)[] {
    const slots: (Font | null)[] = Array(10).fill(null);
    fonts.forEach((font) => {
      if (font.selected && font.selectedSlots.length > 0) {
        font.selectedSlots.forEach(slotIndex => {
          if (slotIndex >= 0 && slotIndex < 10) {
            slots[slotIndex] = font;
          }
        });
      }
    });
    return slots;
  }
}
