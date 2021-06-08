import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import {
  CssBaseline,
  Divider,
  Drawer,
  SvgIcon,
  List,
  Table,
  TablePagination,
  TableHead,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@material-ui/core";

import { Search as SearchIcon } from "react-feather";
import SimpleModal from "../_components/Modal";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme } from "@material-ui/core/styles";

import React from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  select: {
    backgroundColor: "#3f5160",
    color: "white",
  },
  full: {
    width: "100%",
  },
  buttonColor: {
    color: "white",
    htmlColor: "white",
    margin: "auto",
    width: "80%",
    backgroundColor: "#0a822a",
  },
  ratingArea: {
    width: 200,
  },
  whiteColor: {
    color: "white",
  },
  modal: {
    height: "90vh",
    width: "90vw",
  },
  bottomButton: {
    position: "fixed",
    right: 20,
    bottom: 20,
  },
}));

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

function AdminPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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

  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerClose = () => {
    setOpenDrawer(!openDrawer);
  };
  const [data, setData] = useState([]);

  const user = props.user || " ";

  const handleCloseToggle = (category, description) => {
    setOpen(!open);
  };

  const modalBody = () => "";

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Typography align="left" color="textPrimary">
              <div>
                <Typography variant="subtitle1" color="textSecondary">
                  ADMIN
                </Typography>
              </div>
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {open && <ChevronLeftIcon />}
              {!open && <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.main}>
            <ListItem className={classes.select}>
              <ListItemIcon>
                <PlayCircleFilledIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
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
              {filteredRows
                .slice(page * limit, page * limit + limit)
                .map((row) => (
                  <TableRow key={row.id} onClick={() => console.log("detail")}>
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
        </main>
      </div>
      <SimpleModal
        className={classes.modal}
        open={open}
        handleClose={handleCloseToggle}
        body={modalBody}
      ></SimpleModal>
    </>
  );
}
export { AdminPage };
