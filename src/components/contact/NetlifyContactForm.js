// Example of a netlify contact form

import React from 'react'
import axios from 'axios'
import Recaptcha from "react-google-recaptcha";

const RECAPTCHA_KEY = "6LciBGAUAAAAANPZPH_vS6PHsqSVNAf8XCf1Xp_v"
const REQUIRED_FIELDS = ["name", "email", "subject", "message", "g-recaptcha-response"]

class NetlifyContactForm extends React.Component {
  constructor(props) {
    super(props)

    this.recaptcha;

    this.initialFormFieldsState = {
      name: "",
      email: "",
      subject: "",
      message: "",
      "g-recaptcha-response": "",
    }

    this.state = {
      fields: this.initialFormFieldsState,
      errors: {},
    }
  }

  validateForm = () => {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    REQUIRED_FIELDS.map(requiredField => {
      if (!fields[requiredField]) {
        formIsValid = false
        if (requiredField === "g-recaptcha-response") {
          errors[requiredField] = `Please complete verification`
        } else {
          errors[requiredField] = `Please enter your ${requiredField}`
        }
      }
    })

    if (fields['email']) {
      let pattern = new RegExp(/([\w\.\-_+]+)?\w+@[\w-_]+(\.\w+){1,}/)
      if (!pattern.test(fields['email'])) {
        formIsValid = false;
        errors['email'] = "Please enter a valid email address";
      }
    }

    this.setState({ errors: errors })
    
    return formIsValid
  }

  resetForm = () => {
    this.recaptcha.reset()
    this.setState({ fields: this.initialFormFieldsState })
  }

  encodeFormData = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  handleChange = e => this.setState({
    fields: {
      ...this.state.fields,
      [e.target.name]: e.target.value
    }
  })

  handleRecaptcha = value => {
    this.setState({
      fields: {
        ...this.state.fields,
        "g-recaptcha-response": value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.validateForm()) {
      axios({
        method: "POST",
        url: "/",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: this.encodeFormData({ "form-name": "contact", ...this.state.fields })
      })
      .then(() => {
        this.resetForm()
        // TODO need UX for success message
        console.log("Form submit success")
      })
      .catch(error => {
        // TODO need UX for error message
        console.warn(error)
      });
    }
  }

  render() {

    const { name, email, subject, message } = this.state.fields;

    return (
      <form 
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={this.handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label>
            Your Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
          </label>
          {this.state.errors.name &&
            <div>{this.state.errors.name}</div>}
        </div>
        <div>
          <label>
            Your Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
          </label>
          {this.state.errors.email &&
            <div>{this.state.errors.email}</div>}
        </div>
        <div>
          <label>
            Subject: <input type="text" name="subject" value={subject} onChange={this.handleChange} />
          </label>
          {this.state.errors.subject &&
            <div>{this.state.errors.subject}</div>}
        </div>
        <div>
          <label>
            Message: <textarea name="message" value={message} onChange={this.handleChange} />
          </label>
          {this.state.errors.message &&
            <div>{this.state.errors.message}</div>}
        </div>
        <Recaptcha
          ref={(el) => { this.recaptcha = el; }}
          sitekey={RECAPTCHA_KEY}
          onChange={this.handleRecaptcha}
        />
        {this.state.errors["g-recaptcha-response"] &&
            <div>{this.state.errors["g-recaptcha-response"]}</div>}
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    )
  }
}

export default NetlifyContactForm
