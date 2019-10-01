import React, { Component } from "react";
import { Consumer }         from "../../providers/Context";
import TextInputGroup       from "../layout/TextInputGroup";
import axios                from "axios";


class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };


  /* ============================
        componentDidMount
  ============================ */


  async componentDidMount() {
    const { id }  = this.props.match.params;
    const res     = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;


    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }


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

    // Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }


    const updateContact = { name, email, phone };
    const { id }        = this.props.match.params;
    const res           = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);


    dispatch({ type: "UPDATE_CONTACT", payload: res.data });


    //Clear Form Fields
    this.setState({ name: "", email: "", phone: "", errors: {} });


    //redirect to the home page with the new contact
    this.props.history.push("/");
  };


  /* ============================
            render
  ============================ */


  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
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
                Edit Contact
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
                    value="Update Contact"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
