import React from "react";

class MessageInput extends React.Component {
    constructor(props) {
        super(props);

        this.messageSubmit = this.messageSubmit.bind(this.props.globalParent);
    }

    messageSubmit(e) {
        e.preventDefault();
        let textInput = document.getElementById("message-text");
        
        console.log(this.state);

        if (this.state.socket) {
            this.state.socket.emit("new_message", {
                author: "Dzhakhar",
                message: {
                    text: textInput.value
                }
            })
            textInput.value = "";
        }
    }

    render() {
        return <div className="ui form">
            <form onSubmit={this.messageSubmit}>
                <div className="field">
                    <input id="message-text"></input>
                </div>
            </form>
        </div>
    }
}

export default MessageInput;
