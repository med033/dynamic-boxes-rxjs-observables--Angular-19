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
  @Input() option!: Option;
  selectedBoxIndex: number = -1;

  private selectedBoxIndexSub = this.boxesService.selectedBoxIndex$.subscribe(
    (index) => {
      this.selectedBoxIndex = index;
      this.cdr.markForCheck();
    }
  );
  optionId$ = this.optionsService.optionId$;

  constructor(
    private optionsService: OptionsService,
    private cdr: ChangeDetectorRef,
    private boxesService: BoxesService
  ) {}
  ngOnDestroy(): void {
    this.selectedBoxIndexSub.unsubscribe();
  }

  selectOption(): void {
    this.boxesService.fillBoxWithOption(this.option.id);
  }
}
