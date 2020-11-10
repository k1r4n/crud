import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component, lazy, Suspense} from 'react';
import data from './data.json';

import styles from './index.module.scss';

const List = lazy(() => import('./List'));
const TopBar = lazy(() => import('./TopBar'));
const AddModal = lazy(() => import('./AddModal'));
const Pagination = lazy(() => import('./Pagination'));

import {
  updateNotesList,
} from '../../../actions/fetchAction';

const LIMIT = 12;

class Home extends Component {
  static defaultProps = {
    updateNotesList: [],
  }
  state = {
    modal: false,
    activePage: 1,
    pageCount: 0,
    note: {
      title: '',
      description: '',
    },
  };

  static propTypes = {
    history: PropTypes.object,
    notesList: PropTypes.array,
    updateNotesList: PropTypes.func,
  }

  componentDidMount() {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = 'http://localhost:7000/login';
    } else {
      window.localStorage.setItem('notesList', JSON.stringify(data));
      this.setState({pageCount: parseInt(((data.length + 1) / LIMIT), 10) + (((data.length + 1) % LIMIT) > 0 ? 1 : 0)});
      this.props.updateNotesList(data.slice(0, LIMIT));
    }
  }

  componentDidUpdate() {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = 'http://localhost:7000/login';
    }
  }

  handleAddNote = (event) => {
    event.preventDefault();
    const {note} = this.state;
    const notesList = JSON.parse(window.localStorage.getItem('notesList'));
    notesList.push(note);
    window.localStorage.setItem('notesList', JSON.stringify(notesList));
    this.props.updateNotesList(notesList.slice(0, LIMIT));
    this.setState({
      modal: false,
      activePage: 1,
      pageCount: parseInt(((notesList.length + 1) / LIMIT), 10) + (((notesList.length + 1) % LIMIT) > 0 ? 1 : 0),
    });
  }

  handleDeleteNote = (event, id) => {
    event.preventDefault();
    let notesList = JSON.parse(window.localStorage.getItem('notesList'));
    const filteredNotesList = [...this.props.notesList];
    let {activePage} = this.state;
    const index = (LIMIT * (activePage - 1)) + id;
    notesList = [...notesList.slice(0, index), ...notesList.slice(index + 1)];
    window.localStorage.setItem('notesList', JSON.stringify(notesList));
    if (filteredNotesList.length === 1) {
      if (activePage !== 1) {
        activePage -= 1;
      }
    }
    this.props.updateNotesList(notesList.slice((LIMIT * (activePage - 1)), (LIMIT * activePage)));
    this.setState({
      modal: false,
      activePage,
      pageCount: parseInt(((notesList.length) / LIMIT), 10) + (((notesList.length) % LIMIT) > 0 ? -1 : 0),
    });
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  }

  handleInputChange = (data, type) => {
    this.setState({note: {
      ...this.state.note,
      [type]: data,
    }});
  }

  handlePageChange = (activePage) => {
    const notes = JSON.parse(window.localStorage.getItem('notesList'));
    const offset = (activePage - 1) > 0 ? (activePage - 1) * LIMIT : 0;
    this.props.updateNotesList(notes.slice(offset, offset + LIMIT));
    this.setState({activePage});
  }

  render() {
    const {
      notesList,
    } = this.props;
    const {
      note,
      activePage,
      pageCount,
      modal,
    } = this.state;
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <span>
            <Suspense fallback={<div>Loading...</div>}>
              <TopBar
                toggleModal={this.toggleModal}
              />
            </Suspense>
          </span>
        </div>

        <div className={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <List
              notesList={notesList}
              handleDeleteNote={this.handleDeleteNote}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              activePage={activePage}
              pageCount={pageCount}
              handlePageChange={this.handlePageChange}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AddModal
              note={note}
              activeModal={modal}
              toggleModal={this.toggleModal}
              handleAddNote={this.handleAddNote}
              handleInputChange={this.handleInputChange}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notesList: state.notesList,
});

const mapDispatchToProps = () => ({
  updateNotesList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
