import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  Avatar,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Fab,
  makeStyles,
  TableHead,
  Toolbar,
  TablePagination,
  Button,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import { dataService } from "../../_services/data.service";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  white: {
    backgroundColor: "black",
    color: "white !important",
  },
  wholeTable: {
    marginTop: "1.5rem",
  },
}));

export default function Users() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dataService.getUsers().then((data) => {
      setRows(data);
      setFilteredRows(data);
    });
  }, []);

  function filter(e) {
    e.preventDefault();
    const val = e.target.value.toLowerCase();
    setFilteredRows(
      rows.filter((row) => row.username.toLowerCase().includes(val))
    );
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function openDetail(data, action) {
    data.action = action;
    console.log("go to user");
    history.push({
      pathname: "/user",
      state: {
        key: data,
      },
    });
  }

  return (
    <React.Fragment>
      <Toolbar>
        <h1>ADMIN</h1>
        <div className={classes.grow} />

        <Fab
          onClick={() => openDetail({}, "Create")}
          color="secondary"
          aria-label="add user"
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Add new Admin
        </Fab>
      </Toolbar>

      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          onChange={filter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search Employee"
          variant="outlined"
        />
      </Box>

      <Table size="small" className={classes.wholeTable}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.white}>Profile</TableCell>
            <TableCell className={classes.white}>Username</TableCell>
            <TableCell className={classes.white}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * limit, page * limit + limit).map((row) => (
            <TableRow key={row?.id} onClick={() => openDetail(row, "Save")}>
              <TableCell>
                <Avatar>{row.username.charAt(0)}</Avatar>
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.user_role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredRows.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </React.Fragment>
  );
}
