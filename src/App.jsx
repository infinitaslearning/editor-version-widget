/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import * as jsonpatch from 'fast-json-patch';

// import PatchesList from './components/PatchesList';
import Player from './components/Player';
import ChangeLog from './components/ChangeLog';
import particle from './particle';

const deleteLastIndexOfPath = path => {
  const arrayPath = path.split('/');
  return arrayPath.splice(0, arrayPath.length - 1).join('/');
};

const splitPathByLastIndex = path => {
  const arrayPath = path.split('/');
  const basePath = arrayPath.splice(0, arrayPath.length - 1).join('/');
  const index = +arrayPath;
  return [basePath, index];
};

const App = () => {
  const [allPatches, setAllPatches] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const [newParticle, setNewParticle] = useState(particle);
  const [oldParticle, setOldParticle] = useState(particle);
  const [open, setOpen] = useState(true);

  const handlePatches = useCallback(patches => {
    // patches.currentPatches[0]?.value?.children?.[0].text
    // patches.currentPatches[0]?.op !== 'add'
    if (patches.currentPatches.length) { setAllPatches(prev => [...prev, jsonpatch.deepClone(patches)]); }
}, []);

  const handleClick = (patch, idx) => {
    if (idx === allPatches.length - 1) {
      setIsCompare(false);
    } else if (allPatches.length > 1) {
      console.log('----------------');
      console.log('idx', idx);
      console.log('NEW', allPatches[idx].editorState);
      console.log('OLD', allPatches[idx + 1].editorState);
      setIsCompare(true);
      setNewParticle(allPatches[idx].editorState);
      setOldParticle(allPatches[idx + 1].editorState);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Player onChange={handlePatches} isCompare={isCompare} oldParticle={oldParticle} newParticle={newParticle} />
      {/* <PatchesList patches={allPatches} onClick={handleClick} /> */}
      <ChangeLog open={open} setOpen={setOpen} patches={allPatches} onClick={handleClick} />
    </div>
  );
};

export default App;
