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

export default function Employees() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dataService.getEmployees().then((data) => {
      console.log("EMPLOYEES:: ", data);
      setRows(data);
      setFilteredRows(data);
      console.log("employees:: ", data);
    });
  }, []);

  function filter(e) {
    e.preventDefault();
    const val = e.target.value.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row.first_name.toLowerCase().includes(val) ||
          row.last_name.toLowerCase().includes(val) ||
          (row.first_name + " " + row.last_name).toLowerCase().includes(val)
      )
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
    history.push({
      pathname: "/Employee",
      state: {
        key: data,
      },
    });
  }

  return (
    <React.Fragment>
      <Toolbar>
        <h1>Employee</h1>
        <div className={classes.grow} />

        <Fab
          onClick={() => openDetail({}, "Create")}
          color="secondary"
          aria-label="add user"
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Add new employee
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
            <TableCell className={classes.white}>Frist Name</TableCell>
            <TableCell className={classes.white}>Second Name</TableCell>
            <TableCell className={classes.white}>Date of Birth</TableCell>
            <TableCell className={classes.white}>Department</TableCell>
            <TableCell className={classes.white}>Hourly Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * limit, page * limit + limit).map((row) => (
            <TableRow key={row.id} onClick={() => openDetail(row, "Save")}>
              <TableCell>
                <Avatar>{row.first_name.charAt(0)}</Avatar>
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.date_of_birth}</TableCell>
              <TableCell>{row.department_title}</TableCell>
              <TableCell>{row.hourly_rate}</TableCell>
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
