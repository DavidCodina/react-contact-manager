import React, { Component } from "react";

//This component is not related to the contact-manager project.
//It is more of an excursion to briefly overview the various lifecycle methods.

export default class Test extends Component {
  state = {
    title: "",
    body: ""
  };


  //1. Besides render() componentDidMount() is probably the second most popular.
  //This is where you make HTTP calls to an API to fetch data
  componentDidMount(){
    console.log('Component did mount...')

    //GET Request
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body:  data.body
        }, () => {
          console.log(this.state)
        })
      );
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //  2. componentWillMount()
  //  This will run before the component mounts.
  //  Note: I got the following warning:
  //  react-dom.development.js:12029 Warning: componentWillMount has been renamed,
  //  and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks
  //  for details. Based on the info in the previous link it looks like
  //  componentWillReceiveProps, and componentWillUpdate will also be deprecated very soon.
  //  Brad recommends this article:
  //  https://medium.com/@baphemot/understanding-react-react-16-3-component-life-cycle-23129bc7a705
  //
  //  It looks like the new name is UNSAFE_componentWillMount().
  //  That said, I'm not sure what exactly makes it unsafe.
  //
  //////////////////////////////////////////////////////////////////////////////


  UNSAFE_componentWillMount() {
    console.log("Component will Mount...");
  }


  //3. As the name implies, this will only run when the component updates
  //(i.e., an associate piece of state changes.)
  //It will not run on the initial mount.
  //To actually see this in action, we could insert this into context.js,
  //and then delete a contact in the UI.
  componentDidUpdate() {
    console.log("Component did update...");
  }


  //4. Like componentDidUpdate(), to actually see this in action,
  //we could insert this into context.js, and then delete a contact in the UI.
  //It will fire BEFORE componentDidUpdate().
  //Again, componentWillUpdate() will cause a warning in the browser console in React 16.9
  UNSAFE_componentWillUpdate() {
    // Change of States
    console.log("Component will update...");
  }


  //5. componentWillReceiveProps() will prompt a warning in React 16.9...
  //When a component receives new properties, this will run.
  //This is usually used in conjunction with Redux.
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    console.log("Component will receive props...");
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return { test: "something" };
  // }


  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log("get SnapshotBeforeUpdate...");
  //   return;
  // }


  render() {
    return (
      <div>
        <h1>Test Component</h1>

      </div>
    );
  }
}
