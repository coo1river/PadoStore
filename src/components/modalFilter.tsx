import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  onClose: () => void;
  children: any;
}

const ModalFilter: React.FC<Props> = ({ children, onClose }) => {
  const outside = useRef<HTMLDivElement>(null);
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outside.current || outside.current.contains(e.target as Node)) {
      setIsOutsideClick(true);
      onClose();
    }
  };

  useEffect(() => {
    if (isOutsideClick) {
      setIsOutsideClick(false);
    }
  }, [isOutsideClick]);

  return (
    <>
      <BlackOut ref={outside} onClick={handleOutsideClick} />
      {children}
    </>
  );
};

const BlackOut = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.35);
`;

export default ModalFilter;
