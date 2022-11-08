import React from 'react';

const PatchesList = ({ patches }) => (
  <div>
    {
        patches?.map(patch => (<p>{JSON.stringify(patch)}</p>))
    }
  </div>
  );

export default PatchesList;
