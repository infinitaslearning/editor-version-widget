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
  const [open, setOpen] = useState(false);

  const handlePatches = useCallback(patches => setAllPatches(prev => [...prev, ...patches]), []);

  const getContent = ({ editorState, path }) => jsonpatch.getValueByPointer(editorState, path);

  const buildState = patches => {
    console.log(patches, particle);
    return jsonpatch.deepClone(jsonpatch.applyPatch(particle, patches).newDocument);
};

  const handleClick = (patch, idx) => {
    if (patch.op === 'add') {
      document.getElementById(patch.value._id).style.border = '1px solid green';
    }
    if (patch.op === 'replace') {
      const patchesRange = allPatches.slice(0, idx + 1);
      const editorState = buildState(patchesRange);
      console.log('editorState', editorState);
      console.log(patch.path, deleteLastIndexOfPath(patch.path));
      const path = deleteLastIndexOfPath(patch.path);
      const content = getContent({ editorState, path: deleteLastIndexOfPath(patch.path) });
      const [_, index] = splitPathByLastIndex(path);
      console.log('content', content);
      document.getElementById(content._id).children[index].style.border = '1px solid blue';
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Player onChange={handlePatches} />
      {/* <PatchesList patches={allPatches} onClick={handleClick} /> */}
      <ChangeLog open={open} setOpen={setOpen} patches={allPatches} onClick={handleClick} />
    </div>
  );
};

export default App;
