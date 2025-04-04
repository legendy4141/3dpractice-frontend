import React, { useState, useContext, useEffect } from "react";
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
  TablePagination,
  FormControl,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";
import AddUserDialog from "../../components/users/AddUserDialog";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

const UsersPage = () => {
  const { user, token } = useAuthContext();
  const isGlobalAdmin = user?.securityType === 1;
  const isUserAdmin = user?.securityType === 2;
  // const isUser = user?.securityType === 3;
  const { darkMode } = useContext(ThemeContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [userRole, setUserRole] = useState(""); // To track if user is admin or not
  const [users, setUsers] = useState([]); // State to store users fetched from backend
  const [page, setPage] = useState(0); // Pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Users per page
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for failed requests
  const { enqueueSnackbar } = useSnackbar();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // New state for confirmation dialog
  const [userToDelete, setUserToDelete] = useState(null); // New state for the user to be deleted

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "username", // Default sort key
    direction: "asc", // Default sort direction
  });

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        // Map the backend response to match your data structure
        const mappedUsers = data.users.map((user) => ({
          id: user.userid,
          username: user.username,
          email: user.email || "N/A",
          status: user.suspended, // 1 for Active, 0 for Suspended
          role: user.securitytype, // Assuming securitytype maps to the role
        }));

        setUsers(mappedUsers);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleStatusChange = async (event, userId) => {
    const newStatus = event.target.value;

    try {
      // Send a PUT request to the backend API to update the user status
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          suspended: newStatus, // Assuming 0 = Active, 1 = Suspended
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Successfully Changed!", { variant: "success" });
      // If successful, update the status of the user locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      setError("Failed to update status");
    }
  };

  const handleRoleChange = async (event, userId) => {
    const newRole = event.target.value;

    try {
      // Send a PUT request to the backend API to update the user role
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          securitytype: newRole, // Assuming 'securitytype' represents the role
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar("Successfully Changed!", { variant: "success" });
      // If successful, update the role of the user locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Error updating user role:", err);
      setError("Failed to update role");
    }
  };

  const handleRemove = (userId) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/${userToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Successfully Deleted!", { variant: "success" });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete)
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to remove user");
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const roleColors = {
    1: "#FF0000", // Admin
    2: "#00AF4E", // Global User
    3: "#0A7CD9", // User
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
          {isGlobalAdmin && "Global User Administration"}
          {isUserAdmin && "User Administration"}
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
            {isGlobalAdmin && "Add Global Administrator"}
            {isUserAdmin && "Add Administrator"}
          </Button>
          {isUserAdmin && (
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
          )}
        </Box>
      </Box>

      {/* Loading State */}
      {loading && <Typography>Loading users...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <TableContainer component={Paper} sx={{ mb: 1 }}>
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
                  {["username", "email", "status", "role"].map(
                    (header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          borderColor: darkMode
                            ? getColors.appBarBorderDark
                            : getColors.thumbnailBorderLight,
                          px: 0,
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort(header)}
                      >
                        <Box
                          display="flex"
                          sx={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: "20px",
                            color: darkMode
                              ? getColors.listItemTextDark
                              : getColors.thumbnailTextLight,
                            ...(header === "username" || header === "email"
                              ? {
                                  px: "20px",
                                }
                              : { justifyContent: "center" }),
                          }}
                        >
                          {header.toUpperCase()}
                          {sortConfig.key === header && (
                            <>
                              {sortConfig.direction === "asc" ? (
                                <ArrowDownwardIcon sx={{ ml: 1 }} />
                              ) : (
                                <ArrowUpwardIcon sx={{ ml: 1 }} />
                              )}
                            </>
                          )}
                        </Box>
                      </TableCell>
                    )
                  )}
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
                {paginatedUsers.map((user) => (
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
                      {user.username}
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
                        textAlign: "center",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: darkMode
                          ? getColors.appBarBorderDark
                          : getColors.thumbnailBorderLight,
                        padding: 0,
                      }}
                    >
                      <FormControl>
                        <Select
                          value={user.status}
                          onChange={(e) => handleStatusChange(e, user.id)}
                          sx={{
                            width: "150px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize: "18px",
                            color: user.status === 0 ? "#00AF4E" : "#FF0000",
                          }}
                        >
                          <MenuItem value={0}>Active</MenuItem>
                          <MenuItem value={1}>Suspended</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: darkMode
                          ? getColors.appBarBorderDark
                          : getColors.thumbnailBorderLight,
                        padding: 0,
                      }}
                    >
                      <FormControl>
                        <Select
                          value={user.role}
                          onChange={(e) => handleRoleChange(e, user.id)}
                          sx={{
                            width: "180px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize: "18px",
                            color: roleColors[user.role],
                          }}
                        >
                          <MenuItem value={1}>Global Admin</MenuItem>
                          <MenuItem value={2}>User Admin</MenuItem>
                          <MenuItem value={3}>User</MenuItem>
                        </Select>
                      </FormControl>
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

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this user?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ pt: 0 }}>
              <Button
                onClick={handleCancelDelete}
                sx={{
                  borderRadius: "5px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: darkMode
                    ? getColors.appBarBgLight
                    : getColors.appBarBgDark,
                  textAlign: "center",
                  "&: hover": {
                    background: "none",
                    color: getColors.primaryMain,
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for adding User/Admin */}
          <AddUserDialog
            open={openDialog}
            setOpen={setOpenDialog}
            role={userRole}
            onAddUser={handleAddUser}
          />
        </>
      )}
    </Box>
  );
};

export default UsersPage;
