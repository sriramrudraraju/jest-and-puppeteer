import * as React from "react";

import "./form.css";

class Form extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      message: "",
      terms: false,
      test: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <div className="Form">
        <div className="container contact-form m-t-20">
          <h2>Contact Form</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <label className="label">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="input"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="input"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Message</label>
                <textarea
                  className="textarea"
                  placeholder="Message here"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    name="terms"
                    type="checkbox"
                    checked={this.state.terms}
                    onChange={this.handleChange}
                  />
                  I agree to the{" "}
                  <a href="https://google.com">terms and conditions</a>
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">Do you test your React code?</label>
                <label className="radio">
                  <input
                    type="radio"
                    name="test"
                    onChange={this.handleChange}
                    value="Yes"
                    checked={this.state.test === "Yes"}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="test"
                    onChange={this.handleChange}
                    value="No"
                    checked={this.state.test === "No"}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link">
                  Submit
                </button>
              </div>
            </div>

            {this.state.submitted 
              ? <span id="submitted">Submitted</span>
              : null}
          </form>
        </div>
      </div>
    );
  }

  private handleChange(event: React.SyntheticEvent<any>) {
    const target = event.currentTarget;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      submitted: false
    });
  }

  private handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({
      fullname: "",
      email: "",
      message: "",
      terms: false,
      test: "",
      submitted: true
    });
  }
}

export default Form;
