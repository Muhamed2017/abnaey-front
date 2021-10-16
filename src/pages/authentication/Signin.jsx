import React, { Component } from "react";
import "./auth.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
 formItemLayout,
 tailFormItemLayout,
 email_rules,
 password_rules,
 confirm_password_rules,
} from "../layout";
import {
 signupGoogle,
 signupFacebook,
 signinEmailPassword,
} from "./../../redux/actions/authAction";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

class Signin extends Component {
 constructor(props) {
  super(props);
  this.state = {
   email: "",
   password: "",
  };
 }

 onFinish = (values) => {
  console.log(values);
  this.props.dispatchRegularSignin(values.email, values.password);
 };
 render() {
  return (
   <>
    <div className="auth-page signin">
     <Form
      size="large"
      onFinish={this.onFinish}
      {...formItemLayout}
      name="signin"
     >
      <Form.Item name="email" label="البريد الالكتروني">
       <Input />
      </Form.Item>
      <Form.Item label="كلمه المرور" name="password">
       <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
       <Button type="primary" htmlType="submit">
        {this.props.loading ? (
         <>
          <LoadingOutlined style={{ fontSize: 18, padding: "0 3px" }} spin />
         </>
        ) : (
         <>متابعة</>
        )}
       </Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button>متابعه عن طريق تويتر</Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button onClick={this.props.dispatchGoogleSignup}>
        متابعه عن طريق جوجل
       </Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button onClick={this.props.dispatchFacebookSignup}>
        متابعه عن طريق فيسبوك
       </Button>
      </Form.Item>
     </Form>
    </div>
   </>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignin: (email, password) =>
  dispatch(signinEmailPassword(email, password)),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
});
const mapStateToProps = (state) => {
 return {
  user: state.regularUser.user,
  loading: state.regularUser.loading,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
