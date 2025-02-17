import { createContext, ReactNode, useState } from 'react';

import styles from './ModalContext.module.scss';


/**
 * Context for the modal component.
 */
const ModalContext = createContext<{
  modal: ReactNode,
  setModal: React.Dispatch<React.SetStateAction<ReactNode>>,
  clearModal: () => void,
  closable: boolean,
  setClosable: React.Dispatch<React.SetStateAction<boolean>>,
}>({
  modal: null,
  setModal: () => { null; },
  clearModal: () => { null; },
  closable: true,
  setClosable: () => { null; },
});

export default ModalContext;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Context provider for the modal component.
 * @returns The modal provider.
 */
export const ModalProvider = (props: React.PropsWithChildren): React.ReactElement => {
  const [modal, setModal] = useState<ReactNode>(null);
  const [closable, setClosable] = useState<boolean>(true);

  /**
   * Clears all states to their original values.
   */
  function clearModal() { setModal(null); }


  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        clearModal,
        closable,
        setClosable,
      }}
    >
      { (modal !== null) && (
        <div className={styles.Modal}>
          {(closable) && <button onClick={() => clearModal()} title="Close">X</button>}

          <div className={styles.Info}>
            {modal}
          </div>
        </div>
      )}

      {props.children}
    </ModalContext.Provider>
  );
};
