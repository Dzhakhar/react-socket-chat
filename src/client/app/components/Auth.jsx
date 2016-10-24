import React from "react";

class Auth extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      messageSent: false
    }

    this.sendPhoneNumber = this.sendPhoneNumber.bind(this);
    this.confirmSecretCode = this.confirmSecretCode.bind(this);
  }

  confirmSecretCode(e){
    e.preventDefault();
    let self = this;

    let secretCode = document.getElementById("secretCode").value;

    $.ajax({
      url: "/login/confirm/" + secretCode + "/" + self.state.number,
      method: "GET",
      success: function(data){
        console.log(data);
      }
    })
  }

  sendPhoneNumber(e){
    let self = this;
    e.preventDefault();

    $.ajax({
      url: "/login/" + document.getElementById("phoneNumber").value,
      method: "GET",
      success: function(data){
        if(JSON.parse(data).success){
          self.setState({
            messageSent: true,
            number: document.getElementById("phoneNumber").value
          })
        } else {
        }
      }
    })
  }

  render(){
    return <div className="ui form">
      <form onSubmit={this.sendPhoneNumber}>
        <div className="field">
          <label>Your phone number:</label>
          <input type="text" placeholder="8(xxx)XXX-XX-XX" id="phoneNumber"></input>
          {(this.state.messageSent) ? <form onSubmit={this.confirmSecretCode}>
            <input type="text" placeholder="type your secret code" id="secretCode"></input>
            </form> : false}
        </div>
      </form>
    </div>
  }
}

export default Auth;
