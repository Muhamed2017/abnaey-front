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
import ApplicationStepTwo from "../components/Application-step-two";
const { Step } = Steps;

let loading = false;

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      status: "wait",
      loading: false,
      app: {},
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
      content: (app, next) => <ApplicationForm app={app} next={next} />,
      icon: <UserOutlined />,
    },
    {
      title: "مقابله شخصيه",
      content: (app, next) => <ApplicationStepTwo app={app} next={next} />,
      // content: () => "تحديد المقابلة الشصخيه",
      icon: <SolutionOutlined />,
    },
    {
      title: "السداد",
      content: () => "دفع وسداد مصروفات المدرسه ",
    },
    {
      title: "انتهاء",
      content: () => "انتهتاء ",
      icon: <SmileOutlined />,
    },
  ];
  next = () => {
    console.log("nexted");
    if (this.state.app.application_state < this.state.current + 1) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  componentDidMount() {
    const data = new URLSearchParams(window.location.search).get("data");
    if (data) {
      const app = JSON.parse(data);
      this.setState({ app, current: Number(app.application_state) });
    } else {
      this.setState({ current: 0 });
    }
  }

  render() {
    console.log(this.state.current);
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
            {this.state.current !== null
              ? this.steps[this.state.current].content(
                  this.state.app,
                  this.next
                )
              : ""}
          </div>
          <div className="steps-action">
            {this.state.current < this.steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => this.next()}
                disabled={
                  this.state.app.application_state < this.state.current + 1
                }
              >
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
