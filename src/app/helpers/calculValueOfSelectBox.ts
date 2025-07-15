// Helper function to get the value of an option by its ID from a list of options
import { Option } from "../models/option.model";

/**
 * Returns the value of the option with the given ID from the provided options array.
 * @param optionId - The ID of the option to look up (can be null)
 * @param options - The array of Option objects to search
 * @returns The value of the found option, or 0 if not found
 */
export const getOptionValue = (optionId: number | null, options: Option[] | []): number => {
  const foundOption = options.find(
    (option) => option.id === optionId
  );
  return foundOption ? foundOption.value : 0;
}