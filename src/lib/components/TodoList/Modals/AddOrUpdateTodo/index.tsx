import Modal from "@/lib/components/custom/Modal";
import { TodoInterface } from "@/lib/types";
import { AddOrUpdateTodo } from "./Form";

type Props = {
  todo?: TodoInterface;
  open: boolean;
  handleClose: () => void;
};

export const AddOrUpdateModal = ({ open, handleClose, todo }: Props) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <AddOrUpdateTodo todo={todo} handleClose={handleClose} />
    </Modal>
  );
};
