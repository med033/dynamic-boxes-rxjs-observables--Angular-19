
/**
 * Represents a box entity with selection state and an optional option identifier.
 *
 * @property {number} id - Unique identifier for the box.
 * @property {boolean} selected - Indicates whether the box is currently selected.
 * @property {number | null} optionid - Identifier for an associated option, or null if none is assigned.
 */
export interface Box {
  id: number;
  selected: boolean;
  optionid: number | null; 
}

  
  /**
   * An array of 10 initialized `Box` objects.
   *
   * Each box is assigned a unique `id` (from 1 to 10), with `selected` set to `false`
   * and `optionid` set to `null` to indicate that no option is selected initially.
   *
   * This constant is typically used to provide a default state for a collection of boxes,
   * such as in a UI where users can select or assign options to individual boxes.
   */
  export const inilializedBoxes: Box[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    selected: false,
    optionid: null, // Initially no option is selected
  }));