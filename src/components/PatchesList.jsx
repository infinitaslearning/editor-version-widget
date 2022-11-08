/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PatchesList = ({ patches, onClick }) => (
  <div style={{
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'start',
    width: 400,
    border: '1px solid blue',
  }}
  >
    {patches.map((patch, idx) => (
      <div key={idx} style={{ boxSizing: 'border-box', width: '100%', padding: 10, border: '1px solid green' }} onClick={() => onClick(patch, idx)}>
        <strong style={{ lineHeight: '28px' }}>Modification #{idx + 1}</strong>
        <div style={{ lineHeight: '28px' }}>
          Op: {patch.op}
        </div>
        <div style={{ lineHeight: '28px' }}>
          Path: {patch.path}
        </div>
        <div style={{ lineHeight: '28px' }}>
          Value: {JSON.stringify(patch.value)}
        </div>
      </div>
  ))}
  </div>
  );

export default PatchesList;
