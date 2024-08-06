import Modal from "@/lib/components/custom/Modal";
import { useDeleteTodo } from "@/lib/hooks";
import {
  FetchTodosResponse,
  TodoInterface,
  UpdateTodoInput,
} from "@/lib/types";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  handleClose: () => void;
  todo: TodoInterface;
};
export const DeleteConfirmationModal = ({
  todo: { task, completed, id },
  open,
  handleClose,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo({
    onSuccess: () => {
      queryClient.setQueryData<FetchTodosResponse>(["fetch-todos"], (todos) => {
        return todos ? todos.filter((td) => td.id !== id) : todos;
      });

      toast.success("Todo deleted successfully!");

      handleClose();
    },
    onError: () => {
      toast.error("Failed to delete todo.");
    },
  });

  const handleDelete = () => {
    deleteTodo({ id });
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <Box py={8}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box>
            <Typography variant="body1">Delete this todo?</Typography>
          </Box>
          <Box my={"24px"}>
            <Typography variant="h5">{task}</Typography>
          </Box>

          <Box>
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              sx={{ width: "150px", height: "56px" }}
            >
              {isDeleting ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
