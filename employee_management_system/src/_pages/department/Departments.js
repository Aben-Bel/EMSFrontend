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
import { grey } from "@material-ui/core/colors";
import { dataService } from "../../_services/data.service";

// Generate Order Data
function createData(id, depTitle, numEmployees) {
  return { id, depTitle, numEmployees };
}

// const rows = [
//   createData(0, "Software", "10"),
//   createData(1, "Testing", "5"),
//   createData(2, "Quality Assurance", "5"),
//   createData(3, "Marketing", "10"),
//   createData(4, "Sales", "8"),
// ];

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
  tableHead: {
    backgroundColor: "#343a40",
  },
  wholeTable: {
    marginTop: "1.5rem",
  },
  white: {
    color: "white !important",
  },
}));

export default function Departments() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(rows);
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dataService.getDepartments().then((data) => {
      setRows(data);
      setFilteredRows(data);
      console.log("Departments: ", data);
    });
  }, []);

  function filter(e) {
    e.preventDefault();
    console.log("query: ", e.target.value);
    const val = e.target.value.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row.depTitle.toLowerCase().includes(val) ||
          row.numEmployees.toLowerCase().includes(val)
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
      pathname: "/Department",
      state: {
        key: data,
      },
    });
  }

  return (
    <React.Fragment>
      <Toolbar>
        <h1>Department</h1>
        <div className={classes.grow} />

        <Fab
          onClick={() => openDetail({}, "Create")}
          color="secondary"
          aria-label="add user"
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Add new Department
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
          placeholder="Search department"
          variant="outlined"
        />
      </Box>

      <Table className={classes.wholeTable} size="small">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.white}>Department Title</TableCell>
            <TableCell className={classes.white}>Number of Employees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * limit, page * limit + limit).map((row) => (
            <TableRow key={row.id} onClick={() => openDetail(row, "Save")}>
              <TableCell>{row.department_title}</TableCell>
              <TableCell>{row.no_of_employees}</TableCell>
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
