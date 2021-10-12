import React, { Component } from "react";
import "./auth.css";
import {
 formItemLayout,
 tailFormItemLayout,
 email_rules,
 password_rules,
 confirm_password_rules,
} from "../layout";
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

 onFormLayoutChange = ({ size }) => {
  this.setState({ componentSize: size });
 };

 onFinish = (values) => {
  console.log(values);
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
        تسجيل
       </Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button>متابعه عن طريق تويتر</Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button>متابعه عن طريق جوجل</Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button>متابعه عن طريق فيسبوك</Button>
      </Form.Item>
     </Form>
    </div>
   </>
  );
 }
}

export default Signup;
