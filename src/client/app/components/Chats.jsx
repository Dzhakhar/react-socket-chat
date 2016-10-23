import React from "react";
import {Link} from "react-router";

class Chats extends React.Component {
  render(){
    let tmp = [
      {
        username: "Dzhakhar",
        avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUmTjmoz9VNgoZvYPCH0mY1qCZwvMVf-EG5m97Ad-VBemfjnAnFjzBECXp",
        lastMessage: "How are you?:)"
      }, {
        username: "Bilal",
        avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUmTjmoz9VNgoZvYPCH0mY1qCZwvMVf-EG5m97Ad-VBemfjnAnFjzBECXp",
        lastMessage: "Что нового?:)"
      }, {
        username: "Adam",
        avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUmTjmoz9VNgoZvYPCH0mY1qCZwvMVf-EG5m97Ad-VBemfjnAnFjzBECXp",
        lastMessage: "Hey now"
      }, {
        username: "Zubi",
        avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUmTjmoz9VNgoZvYPCH0mY1qCZwvMVf-EG5m97Ad-VBemfjnAnFjzBECXp",
        lastMessage: "No one .."
      }, {
        username: "Makka",
        avatar: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUmTjmoz9VNgoZvYPCH0mY1qCZwvMVf-EG5m97Ad-VBemfjnAnFjzBECXp",
        lastMessage: "Hey"
      }
    ]

    let renderChats = function(){
      return tmp.map((item, i)=>{
        return <Link to={"/messages?r=" + item.username} className="item chat-item">
          <img className="ui tiny user-avatar image" src={item.avatar}></img>
          <div className="content">
            <div className="header">{item.username}</div>
            {item.lastMessage}
          </div>
        </Link>
      })
    }

    return <div className="chat-page">
        <div className="ui segment cleared">
          <div className="ui relaxed divided list">
            {renderChats()}
          </div>
      </div>
    </div>
  }
}

export default Chats;
