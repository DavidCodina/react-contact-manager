import React, { Component } from "react";
import { Consumer }         from "../../providers/Context";
import TextInputGroup       from "../layout/TextInputGroup";
import axios from "axios";


class AddContact extends Component {
  state = {
    addContact: false,
    name: "",
    email: "",
    phone: "",
    errors: {}
  };


  /* ============================
           onChange
  ============================ */


  onChange = e => this.setState({ [e.target.name]: e.target.value });


  /* ============================
            onSubmit
  ============================ */


  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;


    //Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required.'}});
      return;
    }

    if (email === '') {
      this.setState({errors: { email: 'Email is required.'}});
      return;
    }

    if (phone === '') {
      this.setState({errors: { phone: 'Phone is required.'}});
      return;
    }


    //Create Contact object
    const newContact = {
      name,
      email,
      phone
    };



    ////////////////////////////////////////////////////////////////////////////
    //
    //  Originally, the POST request was not async and we did this:
    //
    //    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
    //    .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));
    //
    ////////////////////////////////////////////////////////////////////////////


    //Note: the id that we get back will always be 11 because jsonplaceholder is a mock API.
    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({ type: "ADD_CONTACT", payload: res.data })


    //Clear the form after submitting.
    this.setState({ name: '', email: '', phone: '', errors: {} });

    //Redirect to the Home page at the end of form submission.
    this.props.history.push('/');
  };


  /* ============================
            render
  ============================ */


  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {
          (value) => {
            const { dispatch } = value;

            return (
              <div className="card mb-3">
                <div className="card-header" style={{ cursor: "pointer" }}>
                  <i
                    className="fas fa-address-card"
                    style={{
                      cursor: "pointer",
                      float: "left",
                      color: "#076BFF"
                    }}
                  />
                  Add Contact
                </div>


                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      className="form-control"
                      label="Name"
                      name="name"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

                    <TextInputGroup
                      className="form-control"
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter Email..."
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextInputGroup
                      className="form-control"
                      label="Phone"
                      name="phone"
                      placeholder="Enter Phone..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />

                    <input
                      className="btn btn-light btn-block"
                      type="submit"
                      value="Add Contact"
                    />
                  </form>
                </div>
              </div>
            );
          }
        }
      </Consumer>
    );
  }
}

export default AddContact;
