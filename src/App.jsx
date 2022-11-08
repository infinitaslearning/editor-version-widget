/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';

import PatchesList from './components/PatchesList';
import Player from './components/Player';

const App = () => {
  const [allPatches, setAllPatches] = useState([]);

  const handlePatches = useCallback(patches => setAllPatches(prev => [...prev, ...patches]), []);
  return (
    <>
      <Player onChange={handlePatches} />
      <PatchesList patches={allPatches} />
    </>
  );
};

export default App;
