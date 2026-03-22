import clsx from 'clsx';
import { merge } from 'tailwind-merge';

/**
 * Utility function to combine classes using clsx and tailwind-merge.
 * @param {...(string|undefined)} classes - The class names to combine.
 * @returns {string} - The combined class names.
 */
export const cn = (...classes) => {
    return merge(clsx(...classes));
};
