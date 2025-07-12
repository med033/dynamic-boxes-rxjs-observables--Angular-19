import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Load boxes from localStorage
  loadBoxes(): Box[] | null {
    try {
      const savedBoxes = localStorage.getItem('selectedBoxes');
      if (savedBoxes) {
        const parsedBoxes = JSON.parse(savedBoxes);
        if (Array.isArray(parsedBoxes)) {
          return parsedBoxes;
        }
      }
      return null;
    } catch (error) {
      // If loading fails, clear the corrupted data
      console.warn('Failed to load from localStorage:', error);
      localStorage.removeItem('selectedBoxes');
      return null;
    }
  }

  // Save boxes to localStorage (only those with selected slots)
  saveBoxes(boxes: Box[]): void {
    try {
      localStorage.setItem('selectedBoxes', JSON.stringify(boxes));
    } catch (error) {
      // If saving fails, log a warning
      console.warn('Failed to save to localStorage:', error);
    }
  }

  // Load options from localStorage
  loadOptions(): Option[] | null {
    try {
      const savedOptions = localStorage.getItem('options');
      if (savedOptions) {
        const parsedOptions = JSON.parse(savedOptions);
        if (Array.isArray(parsedOptions)) {
          return parsedOptions;
        }
      }
      return null;
    } catch (error) {
      // If loading fails, clear the corrupted data
      console.warn('Failed to load options from localStorage:', error);
      localStorage.removeItem('options');
      return null;
    }
  }

  // Save options to localStorage
  saveOptions(options: Option[]): void {
    try {
      localStorage.setItem('options', JSON.stringify(options));
    } catch (error) {
      // If saving fails, log a warning
      console.warn('Failed to save options to localStorage:', error);
    }
  }
}
