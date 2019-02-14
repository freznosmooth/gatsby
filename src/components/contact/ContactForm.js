import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  form: {
    padding: 50,
    backgroundColor: '#fff',
  },
  fieldContainer: {
    position: 'relative',
    paddingBottom: 24,
    marginBottom: 0,
    transition: 'margin 0.3s ease-in-out',
    '&.hasError': {
      marginBottom: 16,
    }
  },
  fieldError: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    color: 'red',
    fontSize: 12,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    '.hasError &': {
      opacity: 1,
    }
  }
})

export class ContactForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fields: {
        name: {
          value: '',
          required: true,
        },
        email: {
          value: '',
          required: true,
        },
        subject: {
          value: '',
          required: true,
        },
        message: {
          value: '',
          required: true,
        },
      },
      errors: {},
    }
  }

  fieldHasError(fieldName) {
    return !!this.state.errors[fieldName]
  }

  isValidEmail = (value) => {
    // Regex from from https://emailregex.com/
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(value)
  }

  validateForm = () => {
    let fieldErrors = {}
    let isValid = true
    const { fields } = this.state

    // Check for valid email
    if (!this.isValidEmail(fields.email.value)) {
      fieldErrors.email = 'Please enter a valid Email Address'
      isValid = false
    }

    // Check for empty required fields
    Object.keys(fields).forEach(field => {
      if (fields[field].required && fields[field].value === '') {
        fieldErrors[field] = `Please enter your ${field}`
        isValid = false
      }
    })

    this.setState({ errors: fieldErrors })

    return isValid
  }

  handleChange = fieldName => event => {
    // Set new field value
    const fields = {
      ...this.state.fields,
      [fieldName]: {
        ...this.state.fields[fieldName],
        value: event.target.value
      }
    }

    // Remove existing field validation errors
    const errors = {
      ...this.state.errors
    }

    if (errors[fieldName]) {
      delete errors[fieldName]
    }

    this.setState({ fields, errors });
  }

  handleSubmit = () => {
    const formIsValid = this.validateForm()

    if (formIsValid) {
      alert('Submitted successfully!')
    }
  }
  
  render() {
    const { classes } = this.props
    const { errors } = this.state

    return (
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classNames(classes.fieldContainer, this.fieldHasError('name') && 'hasError')}>
          <TextField
            id="name"
            type="text"
            label="Name"
            className={classes.textField}
            value={this.state.fields.name.value}
            onChange={this.handleChange('name')}
            error={this.fieldHasError('name')}
            required
          />
          <div className={classes.fieldError}>{errors.name}</div>
        </div>
        <div className={classNames(classes.fieldContainer, this.fieldHasError('email') && 'hasError')}>
          <TextField
            id="email"
            type="email"
            label="Email Address"
            className={classes.textField}
            value={this.state.fields.email.value}
            onChange={this.handleChange('email')}
            error={this.fieldHasError('email')}
            required
          />
          <div className={classes.fieldError}>{errors.email}</div>
        </div>
        <div className={classNames(classes.fieldContainer, this.fieldHasError('subject') && 'hasError')}>
          <TextField
            id="subject"
            type="text"
            label="Subject"
            className={classes.textField}
            value={this.state.fields.subject.value}
            onChange={this.handleChange('subject')}
            error={this.fieldHasError('subject')}
            required
          />
          <div className={classes.fieldError}>{errors.subject}</div>
        </div>
        <div className={classNames(classes.fieldContainer, this.fieldHasError('message') && 'hasError')}>
          <TextField
            id="message"
            label="Message"
            multiline
            rows="6"
            value={this.state.fields.message.value}
            onChange={this.handleChange('message')}
            className={classes.textField}
            error={this.fieldHasError('message')}
            required
          />
          <div className={classes.fieldError}>{errors.message}</div>
        </div>
        <Button color="primary" onClick={this.handleSubmit}>
          Send
        </Button>
      </form>
    )
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(ContactForm)
