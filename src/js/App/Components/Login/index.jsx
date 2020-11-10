import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import auth from '../../../api/auth';
class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }
  ajax = {};

  static propTypes = {
    history: PropTypes.object,
  }

  validate(data) {
    const errors = [];
    if (!data.username.trim()) {
      errors.push('Username cannot be empty');
    }
    if (!data.password.trim()) {
      errors.push('Password cannot be empty');
    }
    return errors;
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {username, password} = this.state;
    const errors = this.validate({username, password});
    if (errors.length) {
      this.setState({errors});
    } else {
      if (this.ajax.auth) {
        this.ajax.auth.cancel();
      }
      this.ajax.auth = auth({username, password}).then(() => {
        window.localStorage.setItem('isAuthenticated', true);
        window.location.href = 'http://localhost:7000';
      }).catch(() => {
        this.setState({errors: ['Invalid Username or Password']});
        window.localStorage.setItem('isAuthenticated', false);
      });
    }
  }
  render() {
    const {
      username,
      password,
      errors,
    } = this.state;
    return <div className={styles.login}>
      <div className={styles.logo}>
        <FontAwesomeIcon
          icon={faUsers}
        />
      </div>
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        {
          errors.length !== 0 &&
          <div className={styles.alert}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </div>
        }
        <FormGroup>
          <Input autoComplete="username" type="text" name="username" id="username" value={username} onChange={this.handleInputChange} placeholder="Enter your username" />
        </FormGroup>
        <FormGroup>
          <Input autoComplete="current-password" type="password" name="password" id="password" value={password} onChange={this.handleInputChange} placeholder="Enter your password" />
        </FormGroup>
        <Button type={'submit'}>Submit</Button>
      </Form>
    </div>;
  }
}

export default Login;
