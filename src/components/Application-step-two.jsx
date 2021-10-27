import React, { Component } from "react";
import { formItemLayout, tailFormItemLayout } from "../../src/pages/layout";
import { Form, Input, Steps, Button, Modal, message, Radio } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
class ApplicationStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedInterview: this.props.app?.interview?.available_dates[0],
    };
  }

  componentDidMount() {}

  onFinish = (values) => {
    this.setState({ loading: true });
    const fd = { interview_id: this.props.app.interview.id };
    const next = this.props.next;
    axios
      .post("https://abnaey-dashboard.herokuapp.com/api/interview-confirm", fd)
      .then((response) => {
        this.setState({ loading: false });
        Modal.success({
          title: "تم بنجاح",
          content: <p>تم اختيار ميعاد بنجاح!</p>,
          onOk() {
            next();
          },
        });
      })
      .catch((error) => console.log(error));

    // this.setState({ status: "finish", loading: false, successModal: false });
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({ selectedInterview: e.target.value });
  };

  render() {
    console.log(this.state.selectedInterview);
    return (
      <>
        <p>اختر المعاد المناسب لك</p>
        <Radio.Group
          onChange={this.onChange}
          value={this.state.selectedInterview}
        >
          {this.props.app?.interview?.available_dates?.map((date) => (
            <Radio value={date}>{date}</Radio>
          ))}
        </Radio.Group>
        <Button style={{ margin: "0 8px" }} onClick={() => this.onFinish()}>
          اختر
          {this.state.loading? <Spinner></Spinner>:""}
        </Button>
      </>
    );
  }
}
// export default ApplicationStepTwo;
const mapDispatchToProps = (dispatch) => ({
  //  dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state, props) => {
  return {
    app: Object.keys(props?.app).length > 0 ? props.app : null,
    next: props.next,
  };
};
// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStepTwo);
