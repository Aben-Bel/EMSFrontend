import React, { useState } from "react";
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

// Generate Order Data
function createData(id, fname, sname, dob, department, hourlyRate) {
  return { id, fname, sname, dob, department, hourlyRate };
}

const rows = [
  createData(0, "Aymen", "Mohammednur", "18 Feb 2000", "Software", "50"),
  createData(1, "Abenezer", "Sleshi", "01 March 1999", "Software", "45"),
  createData(2, "Bethelhem", "Teshibelay", "02 May 2000", "Software", "40"),
  createData(3, "Semere", "Terefe", "18 June 2000", "Software", "35"),
  createData(4, "Semere", "Habtu", "10 June 2000", "Software", "30"),
  createData(5, "Mohammednur", "Aymen", "18 Feb 2000", "Software", "50"),
  createData(6, "Sleshi", "Abenezer", "01 March 1999", "Software", "45"),
  createData(7, "Teshibelay", "Bethelhem", "02 May 2000", "Software", "40"),
  createData(8, "Tereffe", "Semere", "18 June 2000", "Software", "35"),
  createData(9, "Habtu", "Semere", "10 June 2000", "Software", "30"),
];

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

  const [filteredRows, setFilteredRows] = useState(rows);
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  function filter(e) {
    e.preventDefault();
    const val = e.target.value.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row.fname.toLowerCase().includes(val) ||
          row.sname.toLowerCase().includes(val) ||
          (row.fname + " " + row.sname).toLowerCase().includes(val)
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
                <Avatar>{row.fname.charAt(0)}</Avatar>
              </TableCell>
              <TableCell>{row.fname}</TableCell>
              <TableCell>{row.sname}</TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.hourlyRate}</TableCell>
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
