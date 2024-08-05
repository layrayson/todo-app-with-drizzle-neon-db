"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Toast from "@/lib/components/custom/Toast";
import {
  useFetchTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/lib/hooks";
import { UpdateTodoInput } from "@/lib/types";

export default function Home() {
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState<UpdateTodoInput | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: todos, isLoading, refetch } = useFetchTodos();
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo({
    onSuccess: () => {
      setToast({
        open: true,
        message: "Todo added successfully!",
        severity: "success",
      });
      refetch();
      setTask("");
    },
    onError: () => {
      setToast({
        open: true,
        message: "Failed to add todo.",
        severity: "error",
      });
    },
  });

  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo({
    onSuccess: () => {
      setToast({
        open: true,
        message: "Todo updated successfully!",
        severity: "success",
      });
      refetch();
      setEditTask(null);
    },
    onError: () => {
      setToast({
        open: true,
        message: "Failed to update todo.",
        severity: "error",
      });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo({
    onSuccess: () => {
      setToast({
        open: true,
        message: "Todo deleted successfully!",
        severity: "success",
      });
      refetch();
    },
    onError: () => {
      setToast({
        open: true,
        message: "Failed to delete todo.",
        severity: "error",
      });
    },
  });

  const handleCreateTodo = () => {
    createTodo({ task });
  };

  const handleUpdateTodo = () => {
    if (editTask) {
      updateTodo(editTask);
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <h1>Todo App</h1>
      <TextField
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button
        onClick={handleCreateTodo}
        variant="contained"
        color="primary"
        disabled={isCreating}
      >
        {isCreating ? <CircularProgress size={24} /> : "Add Todo"}
      </Button>
      <List>
        {todos?.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={todo.task}
              secondary={todo.completed ? "Completed" : "Pending"}
            />
            <Button
              onClick={() => setEditTask({ ...todo, task: "Updated Task" })}
              variant="outlined"
              color="secondary"
              disabled={isUpdating}
            >
              {isUpdating ? <CircularProgress size={24} /> : "Update"}
            </Button>
            <Button
              onClick={() => deleteTodo({ id: todo.id })}
              variant="outlined"
              color="error"
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={24} /> : "Delete"}
            </Button>
          </ListItem>
        ))}
      </List>
      {editTask && (
        <div>
          <TextField
            label="Edit Task"
            value={editTask.task}
            onChange={(e) => setEditTask({ ...editTask, task: e.target.value })}
            fullWidth
          />
          <Button
            onClick={handleUpdateTodo}
            variant="contained"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </div>
      )}
      <Toast
        open={toast.open}
        onClose={handleToastClose}
        message={toast.message}
        severity={toast.severity}
      />
    </Container>
  );
}
