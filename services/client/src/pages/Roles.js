import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import Container from 'components/Container';
import RolesManagement from 'components/RolesManagement'; 

import s from './Roles.module.css';

const defaultSection = 'roles';

const Roles = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const { section } = params;
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/roles');

  useEffect(() => {
    if (!section) {
      setLocation(`${basePath}/${defaultSection}`);
    }
  }, [section, basePath, setLocation]);

  return (
    <Container>
      <RolesManagement />
    </Container>
  );
};

Roles.propTypes = {
  match: PropTypes.object.isRequired,
};

Roles.defaultProps = {};

export default Roles;
