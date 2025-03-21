import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";
import AddUserDialog from "../../components/users/AddUserDialog";

const UsersPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [userRole, setUserRole] = useState(""); // To track if user is admin or not
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Destiny Gray",
      email: "johndoe@example.com",
      status: "Active",
      role: "Admin",
    },
    {
      id: 2,
      name: "Michael",
      email: "janesmith@example.com",
      status: "Suspended",
      role: "User",
    },
    {
      id: 3,
      name: "Trevor",
      email: "alicej@example.com",
      status: "Suspended",
      role: "User",
    },
    {
      id: 4,
      name: "Franklin",
      email: "alicej@example.com",
      status: "Active",
      role: "User",
    },
  ]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "name", // Default sort key
    direction: "asc", // Default sort direction
  });

  const handleRemove = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleAddAdminClicked = () => {
    setUserRole("Admin");
    setOpenDialog(true);
  };

  const handleAddUserClicked = () => {
    setUserRole("User");
    setOpenDialog(true);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: `new-${Date.now()}`,
        status: "Active",
        role: userRole,
        ...newUser,
      },
    ]);
    setOpenDialog(false);
  };

  const handleSort = (column) => {
    const isAscending =
      sortConfig.key === column && sortConfig.direction === "asc";
    const newDirection = isAscending ? "desc" : "asc";

    setSortConfig({
      key: column,
      direction: newDirection,
    });

    // Sort users based on the column and direction
    const sortedUsers = [...users].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  return (
    <Box
      sx={{
        pt: "60px",
        pl: 5,
        pr: 10,
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 5 }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "28px",
            color: darkMode
              ? getColors.drawerTextDark
              : getColors.thumbnailTextLight,
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          Administration
        </Typography>
        <Box display={"flex"} gap={5}>
          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 500,
              px: "15px",
              py: 2,
              background: darkMode ? "#2D2E30" : "#E6E6E6",
              color: darkMode
                ? getColors.primaryTextDark
                : getColors.secondaryTextLight,
              "&:hover": {
                color: getColors.primaryTextDark,
              },
            }}
            onClick={handleAddAdminClicked}
          >
            Add Administrator
          </Button>
          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 500,
              px: "15px",
              py: 2,
              background: darkMode ? "#2D2E30" : "#E6E6E6",
              color: darkMode
                ? getColors.primaryTextDark
                : getColors.secondaryTextLight,
              "&:hover": {
                color: getColors.primaryTextDark,
              },
            }}
            onClick={handleAddUserClicked}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              background: darkMode ? "#1C1D21" : "#E6E6E6",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: darkMode
                ? getColors.appBarBorderDark
                : getColors.thumbnailBorderLight,
            }}
          >
            <TableRow sx={{ height: "60px" }}>
              {["name", "email", "status", "role"].map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "20px",
                    color: darkMode
                      ? getColors.listItemTextDark
                      : getColors.thumbnailTextLight,
                    ...(header === "name" || header === "email"
                      ? {
                          px: "20px",
                        }
                      : { textAlign: "center" }),
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort(header)}
                >
                  {header.toUpperCase()}
                  {sortConfig.key === header && (
                    <>
                      {sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </>
                  )}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "20px",
                  color: darkMode
                    ? getColors.listItemTextDark
                    : getColors.thumbnailTextLight,
                  textAlign: "center",
                  borderColor: darkMode
                    ? getColors.appBarBorderDark
                    : getColors.thumbnailBorderLight,
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  height: "60px",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darkMode
                    ? getColors.appBarBorderDark
                    : getColors.thumbnailBorderLight,
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "20px",
                    color: darkMode
                      ? getColors.listItemTextDark
                      : getColors.thumbnailTextLight,
                    px: "20px",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                  }}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: darkMode
                      ? getColors.listItemTextDark
                      : getColors.thumbnailTextLight,
                    px: "20px",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: user.status === "Active" ? "#005F4E" : "#FF0000",
                    textAlign: "center",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                  }}
                >
                  {user.status}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: user.role === "Admin" ? "#FF0000" : "#0A7CD9",
                    textAlign: "center",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                  }}
                >
                  {user.role}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    borderColor: darkMode
                      ? getColors.appBarBorderDark
                      : getColors.thumbnailBorderLight,
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRemove(user.id)}
                  >
                    <DeleteOutlinedIcon
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "25px",
                        color: "#FF3D3D",
                        mr: "10px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "18px",
                        color: "#FF3D3D",
                      }}
                    >
                      Remove
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding User/Admin */}
      <AddUserDialog
        open={openDialog}
        setOpen={setOpenDialog}
        role={userRole}
        onAddUser={handleAddUser}
      />
    </Box>
  );
};

export default UsersPage;
