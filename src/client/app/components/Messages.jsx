import React from "react";
import MessageInput from "./MessageInput.jsx";

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let globalParent = this.props;

        let renderMessages = function () {
            if (globalParent.state.messages && globalParent.state.messages.length > 0) {
                return globalParent.state.messages.map((item, i)=> {
                    return <p key={i}>{item.message.text}</p>
                })
            }

            return "Write a message";
        }

        return <div
          className="messages-page"
          style={{backgroundImage: "url(media/geometry2.png)"}}>
          {renderMessages()}

          <div className="message-input-div">
            <MessageInput globalParent={this.props}/>
          </div>
        </div>
    }
}

export default Messages;
