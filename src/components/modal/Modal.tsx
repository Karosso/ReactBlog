import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Close } from "@material-ui/icons";
import React from "react";
import styles from "./Modal.module.scss";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IModalProps {
  open: boolean;
  toggleModal: () => void;
  onConfirm: () => void;
  title: string;
  cancelTitle?: string;
  confirmTitle?: string;
}

export const Modal: React.FC<IModalProps> = ({
  title,
  open,
  toggleModal,
  onConfirm,
  cancelTitle = "Cancelar",
  confirmTitle = "Confirmar",
  children,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggleModal}
      classes={{
        paper: styles.paper,
      }}
    >
      <div id={styles.ModalContainer}>
        <IconButton onClick={toggleModal}>
          <Close />
        </IconButton>
        <header>
          <h1>{title}</h1>
        </header>
        <DialogContent className={styles.modalContent}>
          {children}
        </DialogContent>
        <DialogActions className={styles.modalActions}>
          <Button fullWidth={false} onClick={toggleModal} variant="outlined">
            {cancelTitle}
          </Button>
          <Button fullWidth={false} onClick={onConfirm} variant="outlined">
            {confirmTitle}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
