import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions/actions';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, allUsers, isError } = useSelector((state) => state.users);
  // console.log('fullState', allUsers);

  const handleDelete = (id) => {
    // console.log('handleDelete', id);
    if (window.confirm('Do you want?')) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  if (loading) {
    return (
      <div className="loader-css">
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="add-user-button">
        <Button
          variant="contained"
          color="primary"
          style={{ float: 'right' }}
          onClick={() => history.push('/adduser')}
        >
          Add User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#Sl.No</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Contact</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers &&
              allUsers.map((userData, index) => (
                <StyledTableRow key={userData.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {userData.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.contact}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.address}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => history.push(`/edituser/${userData.id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(userData.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
