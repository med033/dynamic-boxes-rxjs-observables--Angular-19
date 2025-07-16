import {
  Component,
  Input,
  inject,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { Option } from "../../models/option.model";
import { OptionsService } from "../options.service";
import { BoxesService } from "../../boxes-container/boxes.service";

@Component({
  selector: "app-box-option",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./box-option.component.html",
  styleUrls: ["./box-option.component.css"],
  animations: [
    // Animation for selection changes
    trigger("selectionAnimation", [
      transition(":enter", [
        style({ transform: "scale(0.95)", opacity: 0 }),
        animate("300ms ease", style({ transform: "scale(1)", opacity: 1 })),
      ]),
      transition("* => *", [
        animate("300ms ease", style({ transform: "scale(1.05)" })),
        animate("150ms ease", style({ transform: "scale(1)" })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnDestroy {
  // The option to display in this component
  @Input() option!: Option;

  // Index of the currently selected box
  selectedBoxIndex: number = -1;

  // Subscription to the selected box index observable
  private selectedBoxIndexSub = this.boxesService.selectedBoxIndex$.subscribe(
    (index) => {
      this.selectedBoxIndex = index;
      this.cdr.markForCheck(); // Trigger change detection when index changes
    }
  );

  // Observable for the currently selected option ID
  optionId$ = this.optionsService.optionId$;

  constructor(
    private optionsService: OptionsService, 
    private cdr: ChangeDetectorRef,         
    private boxesService: BoxesService      
  ) {}

  // Unsubscribe from observables when component is destroyed
  ngOnDestroy(): void {
    this.selectedBoxIndexSub.unsubscribe();
  }

  // Called when this option is clicked; fills the selected box with this option
  selectOption(): void {
    this.boxesService.fillBoxWithOption(this.option.id);
  }
}
