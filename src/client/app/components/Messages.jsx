import React from "react";

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let globalParent = this.props.globalParent;

        let renderMessages = function () {
            if (globalParent.state.messages && globalParent.state.messages.length > 0) {
                return globalParent.state.messages.map((item, i)=> {
                    return <p>{item.message.text}</p>
                })
            }

            return "Write a message";
        }

        return <div className="ui segment">{renderMessages()}</div>
    }
}

export default Messages;