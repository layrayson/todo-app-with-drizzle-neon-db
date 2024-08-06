import { useCreateTodo, useUpdateTodo } from "@/lib/hooks";
import {
  FetchTodosResponse,
  TodoInterface,
  UpdateTodoInput,
} from "@/lib/types";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  todo?: TodoInterface;
  handleClose: () => void;
};
export const AddOrUpdateTodo = ({ todo, handleClose }: Props) => {
  const [task, setTask] = useState("");
  const [completed, setCompleted] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo({
    onSuccess: (data) => {
      toast.success("Todo added successfully!");

      queryClient.setQueryData<FetchTodosResponse>(["fetch-todos"], (todos) => {
        return todos ? [data!, ...todos] : todos;
      });
      setTask("");
      handleClose();
    },
    onError: () => {
      toast.error("Failed to add todo.");
    },
  });

  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo({
    onSuccess: (data) => {
      toast.success("Todo updated successfully!");

      queryClient.setQueryData<FetchTodosResponse>(["fetch-todos"], (todos) => {
        return todos
          ? todos.map((td) => (td.id === todo?.id ? data! : td))
          : todos;
      });
      handleClose();
    },
    onError: () => {
      toast.error("Failed to update todo.");
    },
  });

  const handleCreateTodo = () => {
    if (!task) return;
    createTodo({ task });
  };

  const handleUpdateTodo = () => {
    if (!todo) return;
    updateTodo({ task, completed, id: todo.id });
  };

  useEffect(() => {
    if (!todo) return;
    setTask(todo.task);
    setCompleted(todo.completed);
  }, [todo]);

  return (
    <Box py={8}>
      <Box mb={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {!todo ? "Add new todo" : "Update todo"}
        </Typography>
      </Box>
      <Box mb={2}>
        <Box mb={2}>
          <TextField
            id="mutate-todo"
            label="Todo"
            type="search"
            variant="filled"
            value={task}
            sx={{
              width: "100%",
            }}
            onChange={(e) => setTask(e.target.value)}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                {...{ inputProps: { "aria-label": "mutate-status" } }}
                value={completed}
                disabled={!todo}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            }
            label="Completed"
          />
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ width: "100%", height: "56px" }}
          onClick={!todo ? handleCreateTodo : handleUpdateTodo}
        >
          {(!todo ? isCreating : isUpdating) ? (
            <CircularProgress size={30} sx={{ color: "white" }} />
          ) : (
            <>{!todo ? "Create Todo" : "Update Todo"}</>
          )}
        </Button>
      </Box>
    </Box>
  );
};
