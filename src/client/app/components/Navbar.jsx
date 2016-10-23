import React from "react";
import {Link} from "react-router";

class Navbar extends React.Component {
  render(){
    let globalParent = this.props.globalParent;

    let className = function(link){
      if(globalParent.props.location.pathname.indexOf(link) > -1){
        return "active item col-md-4 col-xs-4";
      }

      return "item col-md-4 col-xs-4";
    }

    return <div className="ui pointing secondary menu tab-menu">
          <Link to="/calls" className={className("calls")} data-tab="first">CALLS</Link>
          <Link to="/chats" className={className("chats")} data-tab="second">CHATS</Link>
          <Link to="/contacts" className={className("contacts")} data-tab="third">CONTACTS</Link>
        </div>
  }
}

exports.Navbar = Navbar;
