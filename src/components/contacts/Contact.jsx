import React, { Component } from "react";
import { PropTypes }        from "prop-types";
import { Consumer }         from "../../providers/Context";
import axios                from "axios";
import { Link }             from "react-router-dom";



class Contact extends Component {
  state = {
    showContactInfo: false
  };

  //Alternatively, propTypes can included within the component.
  //static propTypes = { };

  //The same is true for defaultProps.
  //static defaultProps = {};


  //When using an arrow function, you don't put the async before the identifier.
  //Rather, you put it before the parameters
  onDeleteClick = async (id, dispatch) => {

    ////////////////////////////////////////////////////////////////////////////
    //
    //  Note: to verify that the DELETE request is actually happening,
    //  go to the NETWORK tab and look at the request:
    //
    //      Request URL: https://jsonplaceholder.typicode.com/users/1
    //      Request Method: DELETE
    //      Status Code: 200
    //      Remote Address: 172.64.129.28:443
    //       Referrer Policy: no-referrer-when-downgrade
    //
    ////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////
    //
    //  Originally, onDeleteClick was not async and we did this:
    //
    //    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    //    .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
    //
    //  Then we changed to this:
    //
    //    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    //    dispatch({ type: "DELETE_CONTACT", payload: id });
    //
    ////////////////////////////////////////////////////////////////////////////


    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: "DELETE_CONTACT", payload: id });

    ////////////////////////////////////////////////////////////////////////////
    //
    //  Note: In section 7, part 4 Brad mentions how once we add a contact, then try
    //  to delete it using the X, it won't work because the new contact does not actaully
    //  exist in jsonplaceholder. This is not a real problem, but rather just a consequence
    //  of the data not being persisted due to the fact that it's a mock API.
    //  That said, I did not get the error message.
    //  Presumably, jsonplaceholder has changed its API.
    //  All the same, here is the workaround:
    //
    //   try {
    //     await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    //     dispatch({ type: "DELETE_CONTACT", payload: id });
    //   } catch (e) {
    //     dispatch({ type: "DELETE_CONTACT", payload: id });
    //   }
    //
    ////////////////////////////////////////////////////////////////////////////
  };


  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo }    = this.state;

    return (
      <Consumer>
      {
        (value) => {
          const { dispatch } = value;

          return (
            <div className="card card-body mb-3">
              <h4>{name}
                <i
                  className="fas fa-sort-down"
                  style={{cursor: 'pointer'}}
                  onClick={() => this.setState({showContactInfo: !this.state.showContactInfo})}
                />
                <i
                  className="fas fa-times"
                  style={{cursor: 'pointer', float:'right', color: 'red'}}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>

                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{cursor: 'pointer', float:'right', color: 'black', marginRight: '16px'}}
                  ></i>
                </Link>
              </h4>

              {
                showContactInfo ? (
                  <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                  </ul>
                ) : null
              }
            </div>
          );
        }
      }
      </Consumer>
    );
  }
}


Contact.propTypes = {
  contact:  PropTypes.object.isRequired
};


export default Contact;
