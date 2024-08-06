import React, { useState } from "react";
import { TodoInterface } from "@/lib/types";
import { Box, Divider, Typography, IconButton, Button } from "@mui/material";
import StatusPill from "../StatusPill";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@mui/icons-material";
import { AddOrUpdateModal } from "../Modals/AddOrUpdateTodo";
import { DeleteConfirmationModal } from "../Modals/DeleteConfirmation";

type Props = {
  todo: TodoInterface;
};

export const TodoTile = ({ todo }: Props) => {
  const [openUpdateTodo, setOpenUpdateTodo] = useState(false);
  const [openDeleteTodo, setOpenDeleteTodo] = useState(false);

  return (
    <>
      {openUpdateTodo && (
        <AddOrUpdateModal
          open={openUpdateTodo}
          handleClose={() => setOpenUpdateTodo(false)}
          todo={todo}
        />
      )}
      {openDeleteTodo && (
        <DeleteConfirmationModal
          open={openDeleteTodo}
          handleClose={() => setOpenDeleteTodo(false)}
          todo={todo}
        />
      )}

      <Box
        display="flex"
        py={3}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        sx={{
          "&:hover .overlay": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <Box>
          <Typography variant="h5">{todo.task}</Typography>
        </Box>
        {todo.completed && <StatusPill />}

        <Box
          className="overlay"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          gap={1}
          bgcolor="rgba(0, 0, 0, 0.4)"
          color="white"
          p={1}
          borderRadius={1}
          sx={{
            opacity: 0,
            width: "100%",
            visibility: "hidden",
            transition: "opacity 0.3s, visibility 0.3s",
          }}
        >
          <Box display={"flex"} justifyContent={"center"} gap={2} flex={1}>
            <Button variant="contained" onClick={() => setOpenUpdateTodo(true)}>
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDeleteTodo(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};
