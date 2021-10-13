import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { logginOut } from "../redux/actions/authAction";
import { signupGoogle } from "./../redux/actions/authAction";
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
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
       {!this.props.isLoggedIn ? (
        <>
         <Menu.Item key="1">إنشاء حساب</Menu.Item>
         <Menu.Item key="2">تسجيل دخول</Menu.Item>
        </>
       ) : (
        <>
         <Menu.Item onClick={this.props.dispatchLogOut} key="1">
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
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  user: state.regularUser.user,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
