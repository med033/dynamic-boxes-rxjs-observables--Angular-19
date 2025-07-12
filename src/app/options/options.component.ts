import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { BoxComponent } from "./box-option/box-option.component";
import { Box } from "../models/box.model";
import { BehaviorSubject, Observable } from "rxjs";
import { combineLatest, map } from "rxjs";
import { inilializedOptions, Option } from "../models/option.model";
import { LocalStorageService } from "../services/local-storage.service";
import { OptionsService } from "./options.service";
import { BoxesService } from "../boxes-container/boxes.service";

@Component({
  selector: "app-options",
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.css"],
  animations: [
    trigger("gridAnimation", [
      transition(":enter", [
        style({ transform: "translateY(20px)", opacity: 0 }),
        animate(
          "300ms ease",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnDestroy {
  // Observable for currently boxes in the application.
  boxes$: Observable<Box[]> = this.boxesService.boxes$;
  /**
   * Observable emitting the index of the currently selected box.
   *
   * This observable is sourced from the `boxesService.selectedBoxIndex$` and emits a number
   * representing the index of the box that is currently selected by the user.
   * Components can subscribe to this observable to react to selection changes in real-time.
   */
  selectedBoxIndex$: Observable<number> = this.boxesService.selectedBoxIndex$;

  /**
   * Holds the current options loaded from local storage, or falls back to `inilializedOptions` if none are found.
   * 
   * @remarks
   * This property attempts to retrieve the user's saved options from local storage using the `loadOptions` method.
   * If no options are found (i.e., `loadOptions()` returns `null` or `undefined`), it initializes the options with the default `inilializedOptions`.
   * 
   * @see inilializedOptions
   */
  options = this.localStorage.loadOptions() ?? inilializedOptions;
  
  ngOnInit(): void {}
  constructor(
    private boxesService: BoxesService,
    private localStorage: LocalStorageService
  ) {}

  ngOnDestroy(): void {}

  // Helper for template
  trackByBoxId(index: number, box: Box): number {
    return box.id;
  }

  trackByColumn(column: Box[]): number {
    return column[0].id;
  }

  // Helper for columns in template
  distributeIntoColumns(options: Option[]): Option[][] {
    const columns: Option[][] = [[], [], []];
    options.forEach((option, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(option);
    });
    return columns;
  }
}
