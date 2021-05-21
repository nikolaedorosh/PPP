import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Box, CardMedia } from '@material-ui/core';


function Copyright() {
  return (
    <Typography style={{padding:"0 193px"}}variant="body2" color="textSecondary">
      {'Taking care of your health '}
      <Box>
      <Link color="inherit" href="https://github.com/nikolaedorosh/PPP" >
      <img style={{width:30 , height:30}} src='github_PNG40.png'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/SBernaldo" >
      <img style={{width:30 , height: "auto"}} src='spain.jpg'></img>
      </Link>{' '}
       <Link color="inherit" href="https://github.com/qxift" >
      <img style={{width:30 , height: "auto"}} src='usa.jpg'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/nikolaedorosh" >
      <img style={{width:30 , height: "auto"}} src='moldova.png'></img>
      </Link>{' '}
      <Link color="inherit" href="https://github.com/belovinho" >
      <img style={{width:30 , height: "auto"}} src='rus.jpg'></img>
      </Link>{' '}
      </Box>

    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    
    minHeight: 'auto',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    borderRadius: "10px",
    opacity: 0.6,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
