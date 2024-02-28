import { useRef, useState } from 'react';
import useOnClickOutside from './useOnClickOutside';

interface useModalProps {
  initialMode?: boolean;
}

function useModal({ initialMode = false }: useModalProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialMode);

  const handleClickOutside = () => setIsOpen(false);

  const handleClickInside = () => setIsOpen(true);

  useOnClickOutside(ref, handleClickOutside);

  return { ref, isOpen, setIsOpen, handleClickOutside, handleClickInside };
}

export default useModal;
