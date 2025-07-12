import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { Box } from "../../models/box.model";
import { Observable, map } from "rxjs";
import { BoxComponent } from "../box-component/box-component.component";
import { getOptionValue } from "../../helpers/calculValueOfSelectBox";
import { LocalStorageService } from "../../services/local-storage.service";
import { BoxesService } from "../boxes.service";
import { OptionsService } from "../../options/options.service";

@Component({
  selector: "app-box-container",
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: "./box-container.component.html",
  styleUrls: ["./box-container.component.css"],
  animations: [
    trigger("selectionAnimation", [
      transition(":enter", [
        style({ transform: "scale(0.95)", opacity: 0 }),
        animate("300ms ease", style({ transform: "scale(1)", opacity: 1 })),
      ]),
      transition(":leave", [
        animate("300ms ease", style({ transform: "scale(0.95)", opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxContainerComponent {
  boxes$ = this.boxesService.boxes$;

  options = this.localStorage.loadOptions() ?? [];
  constructor(
    private boxesService: BoxesService,
    private localStorage: LocalStorageService,
    private optionsService: OptionsService
  ) {}
  /**
   * Observable that emits the total sum of the selected boxes' option values.
   *
   * This observable listens to changes in the `boxes$` stream, filters for boxes that are marked as selected,
   * retrieves the value for each selected box using `getOptionValue` (rounded to two decimal places),
   * and accumulates the sum of these values. If a box's option value is not found or invalid, it defaults to 0.
   *
   * @remarks
   * - The calculation is reactive and updates whenever the `boxes$` observable emits a new value.
   * - The sum is rounded to two decimal places for each box before accumulation.
   *
   * @see getOptionValue
   * @see boxes$
   */
  selectedCount$ = this.boxes$.pipe(
    map((boxes) =>
      boxes
        .filter((box) => box.selected)
        .reduce(
          (sum, box) =>
            sum +
            (getOptionValue(box.optionid, this.options) || 0),
          0
        ).toFixed(2)
    )
  );

  /**
   * Clears all current selections in the box container.
   * 
   * Invokes the `clearAllSelections` method on the `boxesService` to remove all box selections,
   * and calls `clearOptionSelection` on the `optionsService` to reset any selected options.
   */
  clearAllSelections(): void {
    this.boxesService.clearAllSelections();
    this.optionsService.clearOptionSelection();
  }

  /**
   * trackBy function for Angular's *ngFor directive to optimize rendering of box items.
   * Returns a unique identifier for each box, using the box's `id` property if available,
   * or the current index as a fallback.
   *
   * @param index - The index of the current item in the iteration.
   * @param box - The current `Box` object or `null`.
   * @returns The unique identifier for the box, either its `id` or the index.
   */
  trackByBoxId(index: number, box: Box | null): number {
    return box?.id ?? index;
  }
}
