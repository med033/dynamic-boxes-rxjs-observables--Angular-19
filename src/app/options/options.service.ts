import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { inilializedOptions, Option } from "../models/option.model";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class OptionsService {
  // Subject to hold the currently selected option ID
  private optionIdSubject = new BehaviorSubject<number | null>(-1);
  // Observable for components to subscribe to selected option changes
  optionId$ = this.optionIdSubject.asObservable();

  // Array to hold all available options
  options: Option[] = [];

  constructor(
    private localStorage: LocalStorageService
  ) {
    // Initialize options from localStorage or set to default
    const loadedOptions = this.localStorage.loadOptions();
    if (loadedOptions) {
      // Use options loaded from localStorage if available
      this.options = loadedOptions;
    } else {
      // Otherwise, use default initialized options and save to localStorage
      this.options = inilializedOptions;
      this.localStorage.saveOptions(this.options);
    }
  }

  // Method to notify subscribers of a new selected option ID
  saveSelectedOptionId(optionId: number | null): void {
    this.optionIdSubject.next(optionId);
  }
  
  // Clear the currently selected option ID
  clearOptionSelection(): void {
    this.optionIdSubject.next(-1);
  }

}
