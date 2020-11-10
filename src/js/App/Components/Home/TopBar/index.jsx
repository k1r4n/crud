import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from 'reactstrap';

import {faBook, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import styles from './index.module.scss';

const TopBar = ({toggleModal}) => (
  <div className={styles.topBar}>
    <Navbar color="light" light fixed={'top'} expand="md">
      <NavbarBrand href="/">
        <div className={styles.logo}>
          <FontAwesomeIcon
            icon={faBook}
          />
        </div>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem
          className={styles.addUser}
          onClick={() => toggleModal('add')}
        >
          <FontAwesomeIcon icon={faPlus} /> ADD
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

TopBar.propTypes = {
  toggleModal: PropTypes.func,
};

export default TopBar;
