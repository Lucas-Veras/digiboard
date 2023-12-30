import Portal from "@/components/Modal/Portal";

import modalAtom from "@/recoil/modal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bgAnimation, modalAnimation } from "./Modal.animations";

const ModalManager = () => {
  const [{ opened, modal }, setModal] = useRecoilState(modalAtom);

  const [portalNode, setPortalNode] = useState<HTMLElement>();

  useEffect(() => {
    if (!portalNode) {
      const node = document.getElementById("portal");
      if (node) setPortalNode(node);
      return;
    }

    if (opened) portalNode.style.pointerEvents = "all";
    else portalNode.style.pointerEvents = "none";
  }, [opened, portalNode]);

  return (
    <Portal>
      <motion.div
        className="z-40 flex min-h-full w-full items-center justify-center bg-black/80"
        onClick={() => setModal({ modal: <></>, opened: false })}
        variants={bgAnimation}
        initial="close"
        animate={opened ? "opened" : "closed"}
      >
        <AnimatePresence>
          {opened && (
            <motion.div
              variants={modalAnimation}
              initial="closed"
              animate="opened"
              exit="exited"
              onClick={(e) => e.stopPropagation()}
              className="p-6"
            >
              {modal}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};
export default ModalManager;
