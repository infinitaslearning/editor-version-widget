/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { green, blue, red } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import { Toolbar, Typography, Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';

import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 400;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
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

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {patches.map((patch, index) => (
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
                {patch.currentPatches[0].op === 'add' && <AddCircleOutlineIcon fontSize="large" sx={{ color: green[600] }} />}
                {patch.currentPatches[0].op === 'replace' && <LoopIcon fontSize="large" sx={{ color: blue[700] }} />}
                {patch.currentPatches[0].op === 'remove' && <RemoveCircleOutlineIcon fontSize="large" sx={{ color: red[600] }} />}
              </Typography>
              <Typography variant="h6" sx={{ opacity: open ? 1 : 0 }}>Modification #{index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ paddingLeft: '50px', display: 'block' }} onClick={() => onClick(patch, index)}>
              <Button
                sx={{ color: patch.currentPatches[0].op === 'add' ? green[600] : patch.currentPatches[0].op === 'replace' ? blue[700] : red[600] }}
                style={{ paddingLeft: '0px' }}
                size="large"
                onClick={() => onClick(patch, index)}
              >Operation: {patch.currentPatches[0].op}
              </Button>
              <Typography>Path: {patch.currentPatches[0].path}</Typography>
              {patch.currentPatches[0].op === 'replace' && (
              <Typography>
                Modified Text: {patch.currentPatches[0].value[0].text}
              </Typography>
            )}
              {patch.currentPatches[0].op === 'add' && (
              <>
                <Typography>Id: {patch.currentPatches[0].value._id}</Typography>
                <Typography>Type: {patch.currentPatches[0].value._type}</Typography>
                {(patch.currentPatches[0].value?.children && patch.currentPatches[0].value?.children[0]?.text) ? (
                  <Typography>ModifiedText:  {patch.currentPatches[0].value?.children[0]?.text}</Typography>) : null}
                {(patch.currentPatches[0].value?.answer && patch.currentPatches[0].value?.answer[0]?.children[0]?.text) ? (
                  <Typography>ModifiedText:  {patch.currentPatches[0].value?.answer[0]?.children[0]?.text}</Typography>) : null}
              </>
            )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Drawer>
  );
};

export default ChangeLog;
