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
 signupEmailPassword,
 signupGoogle,
 signupFacebook,
} from "./../../redux/actions/authAction";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

class Signup extends Component {
 constructor(props) {
  super(props);
  this.state = {
   FullName: "",
   email: "",
   password: "",
  };
 }

 onFinish = (values) => {
  console.log(values);
  this.props.dispatchRegularSignup(
   values.fullName,
   values.email,
   values.password
  );
 };
 render() {
  return (
   <>
    <div className="auth-page signup">
     <Form
      size="large"
      onFinish={this.onFinish}
      {...formItemLayout}
      name="signup"
     >
      <Form.Item
       label="الاسم بالكامل"
       name="fullName"
       rules={[{ required: true, message: "من فضلك ادخل اسمك رباعيا" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item name="email" label="البريد الالكتروني" rules={email_rules}>
       <Input />
      </Form.Item>
      <Form.Item
       label="كلمه المرور"
       name="password"
       rules={password_rules}
       hasFeedback
      >
       <Input.Password />
      </Form.Item>
      <Form.Item
       name="password_confirm"
       label="تأكيد كلمه المرور"
       dependencies={["password"]}
       hasFeedback
       rules={confirm_password_rules}
      >
       <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
       <Button type="primary" htmlType="submit">
        {this.props.loading ? (
         <>
          <LoadingOutlined style={{ fontSize: 18 }} spin />
          جاري التسجيل
         </>
        ) : (
         <>تسجيل</>
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
 dispatchRegularSignup: (fullName, email, password) =>
  dispatch(signupEmailPassword(fullName, email, password)),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
});
const mapStateToProps = (state) => {
 return {
  user: state.regularUser.user,
  loading: state.regularUser.loading,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
