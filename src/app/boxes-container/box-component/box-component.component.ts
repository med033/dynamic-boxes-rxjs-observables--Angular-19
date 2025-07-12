import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Box } from "../../models/box.model";
import { LocalStorageService } from "../../services/local-storage.service";
import { getOptionValue } from "../../helpers/calculValueOfSelectBox";
import { BoxesService } from "../boxes.service";
import { OptionsService } from "../../options/options.service";

@Component({
  selector: "app-box-component",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./box-component.component.html",
  styleUrls: ["./box-component.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  // Observable for the currently selected box index
  selectedBoxIndex$ = this.boxesService.selectedBoxIndex$;
  
  // All available options loaded from localStorage (or empty array if not found)
  options = this.localStorage.loadOptions() ?? [];

  // The box to display (passed from parent)
  @Input() box!: Box;
  // The index of this box in the list (passed from parent)
  @Input() index: number = 0;

  // Utility function to get the value of an option
  getOptionValue = getOptionValue;

  constructor(
    private boxesService: BoxesService,
    private localStorage: LocalStorageService,
    private optionsService: OptionsService
  ) {}

  // Called when a box is selected in the UI
  selectBox = (index: number): void => {
    this.boxesService.selectBox(index);
    this.optionsService.saveSelectedOptionId(this.box.optionid);
  };
  
}
