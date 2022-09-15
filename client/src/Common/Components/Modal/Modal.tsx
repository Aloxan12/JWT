import React, { useState } from 'react';
import style from './Modal.module.css';

type ModalType = {
  active: boolean;
  setActive: (value: boolean) => void;
  title?: string;
};

export const Modal: React.FC<ModalType> = ({ active, setActive, children, title }) => {
  return (
    <div
      className={active ? `${style.modal} + '' + ${style.active}` : style.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${style.modalContent} + '' + ${style.active}` : style.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <React.Fragment>
            <div className={style.headerBlock}>{title}</div>
            <div className={style.contentBlock}>{children}</div>
          </React.Fragment>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};
export const ModalView: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setActive(true)}>+</button>
      <Modal active={active} setActive={setActive}>
        Модалка
      </Modal>
    </div>
  );
};
