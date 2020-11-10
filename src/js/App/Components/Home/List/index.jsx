import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const List = ({
  notesList,
  handleDeleteNote,
}) => (
  <div className={styles.notesList}>
    {
      notesList.map((note, index) => (
        <div key={note.title} className={styles.note}>
          <div className={styles.title}><h3>{note.title}</h3><FontAwesomeIcon className={styles.delete} icon={faTrash} onClick={(event) => handleDeleteNote(event, index)} /></div>
          <p>
            {note.description}
          </p>
        </div>
      ))
    }
  </div>
);

List.propTypes = {
  notesList: PropTypes.array,
  handleDeleteNote: PropTypes.func,
};

export default List;
