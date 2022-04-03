import { useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    // function that calls the handler when clicked outside of element
    const listener = (event: any) => {
      // check if clicked element is target itself
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // execute handler when clicked outside of element
      handler(event);
    };

    // add mouse event listener
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // cleanup function
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
