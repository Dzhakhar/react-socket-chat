import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from "react-router";
import {Navbar} from "./components/Navbar.jsx";
import Messages from "./components/Messages.jsx";
import MessageInput from "./components/MessageInput.jsx";
import Chats from "./components/Chats.jsx";
import Calls from "./components/Calls.jsx";
import Auth from "./components/Auth.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: undefined,
            messages: [],
            users: [],
            activeUrl: ""
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.openSocket = this.openSocket.bind(this);
    }

    openSocket(callback){
        let self = this;
        let socket = io();

        self.setState({
            socket: socket
        })

        function sendMessage(message) {
            socket.emit("new_message", message);
        }

        socket.on("new_message", function (data) {
            let tmp = self.state.messages;
            tmp.push(data);
            self.setState({
                messages: tmp
            }, function(){
              if(callback) callback();
            })
        })
    }

    componentWillMount() {
      this.openSocket();
    }

    render() {
        let self = this;

        function getChildren(){
          if(!self.props.children){
            self.props.location.pathname = "/chats";
            return <Chats/>;
          }

          return self.props.children;
        }

        if(window.localStorage.getItem("TOKEN")){
          return <div className="container-fluid">
              <div className="row">
                  <div className="col-md-12 col-xs-12">
                      <Navbar globalParent={this}/>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12 col-xs-12">
                      {React.cloneElement(getChildren(), this)}
                  </div>
                  <div className="col-md-3"></div>
              </div>
          </div>
        }

        return <Auth/>;
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="chats" component={Chats}/>
            <Route path="calls" component={Calls}/>
            <Route path="messages" component={Messages}/>
        </Route>
    </Router>
), document.getElementById('app'))
