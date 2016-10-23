import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from "react-router";
import {Navbar} from "./components/Navbar.jsx";
import Messages from "./components/Messages.jsx";
import MessageInput from "./components/MessageInput.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: undefined,
            messages: [],
            users: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        let socket = io();
        let self = this;

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
            })
        })
    }

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Navbar globalParent={this}/>
                </div>
                <div className="col-md-7">
                    <Messages globalParent={this}/>
                    <MessageInput globalParent={this}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
), document.getElementById('app'))
