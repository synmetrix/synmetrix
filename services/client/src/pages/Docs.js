import React from 'react';
import PropTypes from 'prop-types';

import ErrorFound from 'components/ErrorFound';
import DocsSection from 'components/DocsSection';
import Container from 'components/Container';

const Docs = ({ match }) => {
  const { params = {} } = match;
  const { versionId } = params;
  
  if (!versionId) {
    return <ErrorFound status={404} />;
  }

  return (
    <Container>
      <div style={{ padding: 40 }}>
        <DocsSection toolbar versionId={versionId} />
      </div>
    </Container>
  );
};

Docs.propTypes = {
  match: PropTypes.object,
};

Docs.defaultProps = {
  match: {},
};

export default Docs;
