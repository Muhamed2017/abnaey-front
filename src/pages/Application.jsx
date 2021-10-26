import React, { Component } from "react";
import { Form, Input, Steps, Button, message } from "antd";
import axios from "axios";
import {
 UserOutlined,
 SolutionOutlined,
 LoadingOutlined,
 SmileOutlined,
} from "@ant-design/icons";
import { formItemLayout, tailFormItemLayout } from "./layout";
import { connect } from "react-redux";
import ApplicationForm from "./../components/Application-step-one";
const { Step } = Steps;

let loading = false;

class Application extends Component {
 constructor(props) {
  super(props);
  this.state = {
   current: 0,
   status: "wait",
   loading: false,
  };
 }
 onFinish = (values) => {
  const fd = { ...values, uid: this.props.user.uid };
  // console.log(fd);
  this.setState({ loading: true });
  axios
   .post("http://localhost:8000/api/applications/add", fd)
   .then((response) => {
    console.log(response);
    this.next();
    // this.setState({ status: "finish", loading: false });
   })
   .catch((error) => console.log(error));

  this.setState({ status: "finish", loading: false });
 };
 steps = [
  {
   title: "معلومات ولي الامر والطالب",
   content: (
    <>
     <Form
      size="large"
      onFinish={this.onFinish}
      {...formItemLayout}
      name="apply-for-son"
     >
      <Form.Item
       label="اسم ولي الامر رباعيا"
       name="parent_full_name"
       initialValue={this.props.user.displayName}
       rules={[{ required: true, message: "من فضلك ادخل الاسم رباعيا" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="student_full_name"
       label="اسم الطالب رباعيا"
       rules={[{ required: true, message: "من فضلك ادخل اسم الطالب رباعيا" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       label="الجنسيه"
       name="nationality"
       rules={[{ required: true, message: "من فضلك ادخل جنسيه الطالب" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       label="تاريخ ميلاد الطالب"
       name="student_date_of_birth"
       rules={[{ required: true, message: "من فضلك ادخل تاريخ ميلاد الطالب" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       label="السنة الدراسيه"
       name="applicant_year"
       rules={[{ required: true, message: "من فضلك ادخل السنة الدراسيه" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       label="الجوال"
       name="phone"
       rules={[{ required: true, message: "من فضلك ادخل رقم جوالك" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="parent_sgl_madany"
       label="السجل المدني لولي الأمر"
       rules={[
        { required: true, message: "من فضلك ادخل السجل المدني لولي الأمر" },
       ]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="desease"
       label="هل يشكو الطالب من امراض"
       rules={[{ required: true, message: "من فضلك اجب عن هذا السوال" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="full_address"
       label="عنوان السكن بالتفصيل"
       rules={[{ required: true, message: "من فضلك ادخل عنوان السكن " }]}
      >
       <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
       <Button type="primary" htmlType="submit">
        {this.state.loading ? (
         <>
          جاري التقديم
          <LoadingOutlined style={{ fontSize: 18, padding: "0 10px" }} spin />
         </>
        ) : (
         <>تسجيل</>
        )}
       </Button>
      </Form.Item>
     </Form>
    </>
   ),
   icon: <UserOutlined />,
  },
  {
   title: "مقابله شخصيه",
   content: "تحديد المقابلة الشصخيه",
   icon: <SolutionOutlined />,
  },
  {
   title: "السداد",
   content: "دفع وسداد مصروفات المدرسه ",
  },
  {
   title: "انتهاء",
   content: "انتهتاء ",
   icon: <SmileOutlined />,
  },
 ];
 next = () => {
  console.log("nexted");
  const current = this.state.current + 1;
  this.setState({ current });
 };

 prev = () => {
  const current = this.state.current - 1;
  this.setState({ current });
 };

 render() {
  return (
   <>
    <div id="application-form" className="my-5">
     <Steps current={this.state.current}>
      {this.steps.map((item) => (
       <Step
        key={item.title}
        title={item.title}
        status={item.status}
        icon={item.icon}
       />
      ))}
     </Steps>
     <div className="steps-content">
      {this.steps[this.state.current].content}
     </div>
     <div className="steps-action">
      {this.state.current < this.steps.length - 1 && (
       <Button type="primary" onClick={() => this.next()}>
        التالي
       </Button>
      )}
      {this.state.current === this.steps.length - 1 && (
       <Button
        type="primary"
        onClick={() => message.success("تم ارسال طلب التقديم بنجاح")}
       >
        تم
       </Button>
      )}
      {this.state.current > 0 && (
       <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
        السابق
       </Button>
      )}
     </div>
    </div>
   </>
  );
 }
}

// export default Application;

const mapDispatchToProps = (dispatch) => ({
 //  dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  user: state.regularUser.user,
 };
};
// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Application);
