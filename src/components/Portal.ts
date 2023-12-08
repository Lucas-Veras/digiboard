import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const Portal = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [portal, setPortal] = useState<HTMLElement>();

  useEffect(() => {
    const node = document.getElementById("portal");
    if (node) setPortal(node);
  }, []);

  if (!portal) return null;

  return createPortal(children, portal);
};

export default Portal;
