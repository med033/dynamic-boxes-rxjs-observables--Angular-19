import { Injectable } from "@angular/core";
import { Box, inilializedBoxes } from "../models/box.model";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class BoxesService {
  private boxes = this.localStorage.loadBoxes() || inilializedBoxes;

  private selectedBoxIndex = -1;
  private selectedBoxIndexSubject = new BehaviorSubject<number>(-1);
  selectedBoxIndex$ = this.selectedBoxIndexSubject.asObservable();

  private boxesSubject = new BehaviorSubject<Box[]>(this.boxes);
  boxes$ = this.boxesSubject.asObservable();

  constructor(private localStorage: LocalStorageService
  ) {
  }
  private saveToLocalStorage(): void {
    this.localStorage.saveBoxes(this.boxes);
  }

  // --- Slot selection ---
  selectBox(index: number): void {
    this.selectedBoxIndex = index;
    this.selectedBoxIndexSubject.next(index);
    this.saveToLocalStorage();
  }

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

    // Auto-select the next slot
    const nextSlotIndex = this.selectedBoxIndex + 1;
    if (nextSlotIndex < 10) {
      this.selectBox(nextSlotIndex);
    }
  }
  clearAllSelections(): void {
    this.boxes = inilializedBoxes;
    this.boxesSubject.next(this.boxes);
    localStorage.removeItem("selectedBoxes");
  }
}
