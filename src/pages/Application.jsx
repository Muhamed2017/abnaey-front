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
 //  onFinish = (values) => {
 //   const fd = { ...values, uid: this.props.user.uid };
 //   // console.log(fd);
 //   this.setState({ loading: true });
 //   axios
 //    .post("http://localhost:8000/api/applications/add", fd)
 //    .then((response) => {
 //     console.log(response);
 //     this.next();
 //     // this.setState({ status: "finish", loading: false });
 //    })
 //    .catch((error) => console.log(error));

 //   this.setState({ status: "finish", loading: false });
 //  };
 steps = [
  {
   title: "معلومات ولي الامر والطالب",
   content: <ApplicationForm />,
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
