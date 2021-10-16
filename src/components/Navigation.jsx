import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { logginOut } from "../redux/actions/authAction";
import { signupGoogle } from "./../redux/actions/authAction";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

class Navigation extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  return (
   <>
    <Layout>
     <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
       {!this.props.isLoggedIn ? (
        <>
         <a href="/signup">
          <Menu.Item key="1" style={{ background: "transparent" }}>
           إنشاء حساب
          </Menu.Item>
         </a>
         <Menu.Item key="2" style={{ background: "transparent" }}>
          تسجيل دخول
         </Menu.Item>
        </>
       ) : (
        <>
         <Menu.Item key={"2"} style={{ background: "transparent" }}>
          <Avatar src={this.props.user.photoURL ?? ""} />
         </Menu.Item>
         <Menu.Item key={"3"} style={{ background: "transparent" }}>
          {this.props.user.displayName}
         </Menu.Item>
         <Menu.Item
          onClick={this.props.dispatchLogOut}
          key="1"
          style={{ background: "transparent" }}
         >
          تسجيل خروج
         </Menu.Item>
        </>
       )}
      </Menu>
     </Header>
    </Layout>
   </>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  user: state.regularUser.user,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
