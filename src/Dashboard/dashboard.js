import React from 'react';
import {db} from '../Authentication/auth'
import '../App.css';


class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = { userType: '' }
  }
  componentDidMount(){
    // console.log(this.props);
    db.collection("Users").doc(this.props.userInfo.uid).get()
      .then(doc => {
      if (doc.exists) {
         if (doc.data().type === 'admin') {
             this.setState({userType: doc.data().type});
         }
         else if (doc.data().type === 'user') {
          this.setState({userType: doc.data().type});
         }
         else{
             console.log("Neither Admin, nor User, error");
         }
      } else {
         alert('User Doesnt Exist!!!')
      }
    })
  }
  render(){
    var {userInfo, isAuthenticated} = this.props;
    console.log(isAuthenticated);
    return (
        <div className="login bg-lightWhite h-full lg:h-screen">
            Hey <b style={{color: 'blue'}}>{this.state.userType}</b> {userInfo.email}
        </div>
    ) 
  }
}



export default Dashboard;