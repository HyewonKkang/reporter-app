import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  const onClickInside = (event: MouseEvent) => {
    const el = ref?.current;
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener(mouseEvent, onClickInside);

    return () => {
      document.removeEventListener(mouseEvent, onClickInside);
    };
  }, []);
}

export default useOnClickOutside;
