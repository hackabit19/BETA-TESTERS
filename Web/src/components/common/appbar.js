import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import { firebase } from '../../firebase'
 
 /* import User from '../../images/man-user.png'*/
 
 export default class AppBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      openUserPanel : false,
      userPanel : null
    };
  }

  componentDidMount(){

    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = (event) => {
      event.preventDefault()
      firebase.auth().signOut()
      .then(() => {
          console.log("user signOut")
          this.props.history.push("/")
      })
      .catch(err => {
          console.log(err)
      })
  }

  scrollToElement = (event,element) => {
      event.preventDefault()
     
  }

  handleUserPanel = (event) => {
    event.preventDefault()
    const x = this.state.openUserPanel;
    this.setState({
      openUserPanel : !x
    })


  }

  render() {
      console.log(this.props)
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/" style={{color:"white"}}>
            <img src="" style={{height:"50px"}} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-3 text-white" navbar style={{width:"100%"}}>
              <NavItem className="text-light">
                <NavLink href=""  style={{color:"white"}} onClick={(event) => this.scrollToElement(event,'why')}>WHY US</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href=""  style={{color:"white"}} onClick={(event) => this.scrollToElement(event,'how')}>HOW It WORKS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="" style={{color:"white"}} onClick={(event) => this.scrollToElement(event,'about')}>ABOUT</NavLink>
              </NavItem>
              {!this.props.user ? 
              <NavItem className="ml-md-auto">
                <NavLink  href="/login" style={{color:"white"}}>LOGIN</NavLink>
              </NavItem> : null}
              {!this.props.user ? 
              <NavItem className="">
                <NavLink  href="/signup" style={{color:"white"}}>SIGNUP</NavLink>
              </NavItem> : null }
              
              {this.props.user ? 
              <NavItem className=" ml-md-auto" onClick={(event) => this.handleUserPanel(event)}>
                <NavLink  href=""  style={{color:"white"}}>
                  <div className="signIn" onClick={(event) => this.handleUserPanel(event)}>
                    <img src="" className="img-fluid"></img> 
                  </div>
                  {this.state.openUserPanel ? 
                  <>
                    <div style={{height:"20px",width:"20px",clipPath:"polygon(0 100%, 50% 0, 100% 100%)",
                  background:"gray",position:"absolute",left:"97%",top:"65%",zIndex:"100"}}>

                    </div>
                    <div style={{position:"absolute",left:"85%",top:"70px" ,background:"white",color:"white"}}>
                      <div className="" style={{color:"black",padding:"5px 15px",fontSize:"20px",
                        paddingBottom:"10px",
                        borderBottom:"1px solid gray"}}>
                        <p style={{fontSize:"15px",marginBottom:"-5px"}}> Signed in as</p>
                        {this.props.user.email}
                      </div>
                      <div className="" style={{color:"black",padding:"5px 15px",fontSize:"20px",paddingBottom:"10px",
                        borderBottom:"1px solid gray"}}>
                        {this.props.user.uid}
                      </div>
                      <div className="" style={{color:"black",padding:"5px 15px",fontSize:"20px",paddingBottom:"10px",
                        borderBottom:"1px solid gray"}}>
                        Your Profile
                      </div>
                      <div className=""  style={{color:"black",padding:"5px 15px",fontSize:"20px",paddingBottom:"10px"}}
                      onClick={this.handleLogout}>
                        SIGNOUT
                      </div>
                    </div>
                    </>
                    : ''}
                </NavLink>
              </NavItem> : null }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}