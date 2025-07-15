import { Injectable } from "@angular/core";
import { Box, inilializedBoxes } from "../models/box.model";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class BoxesService {
  // Holds the current state of all boxes, loaded from localStorage or initialized
  private boxes = this.localStorage.loadBoxes() || inilializedBoxes;

  // Index of the currently selected box (-1 means none selected)
  private selectedBoxIndex = -1;
  // Subject to emit changes to the selected box index
  private selectedBoxIndexSubject = new BehaviorSubject<number>(-1);
  // Observable for components to subscribe to selected box index changes
  selectedBoxIndex$ = this.selectedBoxIndexSubject.asObservable();

  // Subject to emit changes to the boxes array
  private boxesSubject = new BehaviorSubject<Box[]>(this.boxes);
  // Observable for components to subscribe to boxes changes
  boxes$ = this.boxesSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {}

  // Save the current boxes state to localStorage
  private saveToLocalStorage(): void {
    this.localStorage.saveBoxes(this.boxes);
  }

  // --- Box selection ---

  /**
   * Selects a box at the given index and updates the observable.
   * Also saves the selection to localStorage.
   * @param index - The index of the box to select
   */
  selectBox(index: number): void {
    this.selectedBoxIndex = index;
    this.selectedBoxIndexSubject.next(index);
    this.saveToLocalStorage();
  }

  /**
   * Fills the currently selected box with the given option ID.
   * Updates the box state, emits the new boxes array, saves to localStorage,
   * and auto-selects the next Box if available.
   * @param optionId - The ID of the option to assign to the selected box
   */
  fillBoxWithOption(optionId: number): void {
    this.boxes = this.boxes.map((box, index) => {
      if (this.selectedBoxIndex === index) {
        return {
          ...box,
          selected: true,
          optionid: optionId, // Assign the option ID from the options array
        };
      }
      return box;
    });

    this.boxesSubject.next(this.boxes);
    this.saveToLocalStorage();

    // Auto-select the next Box
    const nextSlotIndex = this.selectedBoxIndex + 1;
    if (nextSlotIndex < 10) {
      this.selectBox(nextSlotIndex);
    }
  }

  /**
   * Clears all box selections, resets to initial state,
   * emits the new boxes array, and removes from localStorage.
   */
  clearAllSelections(): void {
    this.boxes = inilializedBoxes;
    this.boxesSubject.next(this.boxes);
    localStorage.removeItem("selectedBoxes");
  }
}
