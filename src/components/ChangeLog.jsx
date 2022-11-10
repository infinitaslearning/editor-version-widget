/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { green, blue, red } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const drawerWidth = 400;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ChangeLog = ({ open, setOpen, patches, onClick }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const patchesReverse = [...patches].reverse();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open={open}
    >
      <Toolbar
        variant="dense"
        sx={{ backgroundColor: 'primary.main', padding: 2 }}
        style={{ position: 'sticky', top: 0, zIndex: 100 }}
        onClick={() => setOpen(!open)}
      >
        <Typography variant="h6" color="#ffffff">
          <HistoryIcon fontSize="large" style={{ position: 'relative', top: '5px' }} />
          {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
          Change Log
        </Typography>
      </Toolbar>
      {/* <List style={{ position: 'relative', zIndex: 1 }}>
        {patchesReverse.map((patch, index) => (
          <>
            <ListItem key={index}>
              <ListItemButton
                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                onClick={() => onClick(patch, index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {patch.op === 'add' && <AddCircleOutlineIcon fontSize="large" sx={{ color: green[600] }} />}
                  {patch.op === 'replace' && <LoopIcon fontSize="large" sx={{ color: blue[700] }} />}
                  {patch.op === 'remove' && <RemoveCircleOutlineIcon fontSize="large" sx={{ color: red[600] }} />}
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary={<Typography variant="h6">Modification # {patches.length - index}</Typography>}
                  secondary={(
                    <>
                      <Typography>Operation: {patch.op}</Typography>
                      <Typography>Path: {patch.path}</Typography>
                      {patch.op === 'replace' && (
                        <Typography>
                          Modified Text: {patch.value[0].text}
                        </Typography>
                      )}
                      {patch.op === 'add' && (
                        <>
                          <Typography>Id: {patch.value._id}</Typography>
                          <Typography>Type: {patch.value._type}</Typography>
                          {(patch.value?.children && patch.value?.children[0]?.text) ? (
                            <Typography>ModifiedText:  {patch.value?.children[0]?.text}</Typography>) : null}
                          {(patch.value?.answer && patch.value?.answer[0]?.children[0]?.text) ? (
                            <Typography>ModifiedText:  {patch.value?.answer[0]?.children[0]?.text}</Typography>) : null}
                        </>
                      )}
                    </>
                  )}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
          </>
        ))}
      </List> */}
      {patchesReverse.map((patch, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{ opacity: open ? 1 : 0 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{
              width: '33%',
              flexShrink: 0 }}
            >
              {patch.op === 'add' && <AddCircleOutlineIcon fontSize="large" sx={{ color: green[600] }} />}
              {patch.op === 'replace' && <LoopIcon fontSize="large" sx={{ color: blue[700] }} />}
              {patch.op === 'remove' && <RemoveCircleOutlineIcon fontSize="large" sx={{ color: red[600] }} />}
            </Typography>
            <Typography variant="h6" sx={{ opacity: open ? 1 : 0 }}>Modification # {patches.length - index}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ paddingLeft: '50px', display: 'block' }} onClick={() => onClick(patch, index)}>
            <>
              <Button
                sx={{ color: patch.op === 'add' ? green[600] : patch.op === 'replace' ? blue[700] : red[600] }}
                style={{ paddingLeft: '0px' }}
                size="large"
                onClick={() => onClick(patch, index)}
              >Operation: {patch.op}
              </Button>
              <Typography>Path: {patch.path}</Typography>
              {patch.op === 'replace' && (
                <Typography>
                  Modified Text: {patch.value[0].text}
                </Typography>
                )}
              {patch.op === 'add' && (
                <>
                  <Typography>Id: {patch.value._id}</Typography>
                  <Typography>Type: {patch.value._type}</Typography>
                  {(patch.value?.children && patch.value?.children[0]?.text) ? (
                    <Typography>ModifiedText:  {patch.value?.children[0]?.text}</Typography>) : null}
                  {(patch.value?.answer && patch.value?.answer[0]?.children[0]?.text) ? (
                    <Typography>ModifiedText:  {patch.value?.answer[0]?.children[0]?.text}</Typography>) : null}
                </>
                )}
            </>
          </AccordionDetails>
        </Accordion>
        ))}
    </Drawer>
  );
};

export default ChangeLog;
