// Option model represents a selectable option for a box
export interface Option {
  id: number;
  value: any;
  selected?: boolean;
}


  /**
   * Generates an array of 30 `Option` objects with unique IDs starting from 100.
   * Each option is initialized as not selected and assigned a random value between 0 and 100 (rounded to two decimal places).
   * 
   * @remarks
   * The IDs start from 100 to avoid conflicts with Box IDs.
   */
  export const inilializedOptions: Option[] = Array.from({ length: 30 }, (_, index) => ({
    id: index + 100, // Start IDs from 100 to avoid conflict with Box IDs
    selected: false,
    value: Number((Math.random() * 100).toFixed(2)),
  }));