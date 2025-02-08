import React from 'react';

const EnvTest = () => {
  const domain = import.meta.env.VITE_ISSUER_BASE_URL;

  return (
    <div>
      <p>Auth0 Domain: {domain}</p>
    </div>
  );
};

export default EnvTest;