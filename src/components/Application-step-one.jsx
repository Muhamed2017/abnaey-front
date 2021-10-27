import React, { Component } from "react";
import { formItemLayout, tailFormItemLayout } from "../../src/pages/layout";
import { Form, Input, Steps, Button, Modal, message } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  onFinish = (values) => {
    const fd = { ...values, uid: this.props.user.uid };
    this.setState({ loading: true });
    const next = this.props.next;
    axios
      .post("https://abnaey-dashboard.herokuapp.com/api/applications/add", fd)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        Modal.success({
          title: "تم بنجاح",
          content: <p>تم ارسال طلبك بنجاح!</p>,
          onOk() {
            next();
          },
        });
      })
      .catch((error) => console.log(error));

    // this.setState({ status: "finish", loading: false, successModal: false });
  };

  render() {
    const app = this.props.app;
    console.log(app)
    return (
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
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            name="student_full_name"
            label="اسم الطالب رباعيا"
            initialValue={app?.student_full_name}
            rules={[
              { required: true, message: "من فضلك ادخل اسم الطالب رباعيا" },
            ]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            label="الجنسيه"
            name="nationality"
            initialValue={app?.nationality}
            rules={[{ required: true, message: "من فضلك ادخل جنسيه الطالب" }]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            label="تاريخ ميلاد الطالب"
            name="student_date_of_birth"
            initialValue={app?.student_date_of_birth}
            rules={[
              { required: true, message: "من فضلك ادخل تاريخ ميلاد الطالب" },
            ]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            label="السنة الدراسيه"
            name="applicant_year"
            initialValue={app?.applicant_year}
            rules={[{ required: true, message: "من فضلك ادخل السنة الدراسيه" }]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            label="الجوال"
            name="phone"
            rules={[{ required: true, message: "من فضلك ادخل رقم جوالك" }]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            name="parent_sgl_madany"
            label="السجل المدني لولي الأمر"
            initialValue={app?.parent_sgl_madany}
            rules={[
              {
                required: true,
                message: "من فضلك ادخل السجل المدني لولي الأمر",
              },
            ]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            name="desease"
            initialValue={app?.desease}
            label="هل يشكو الطالب من امراض"
            rules={[{ required: true, message: "من فضلك اجب عن هذا السوال" }]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            name="full_address"
            initialValue={app?.full_address}
            label="عنوان السكن بالتفصيل"
            rules={[{ required: true, message: "من فضلك ادخل عنوان السكن " }]}
          >
            <Input disabled={app} />
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            style={{ display: app ? "none" : "block" }}
          >
            <Button type="primary" htmlType="submit">
              {this.state.loading ? (
                <>
                  جاري التقديم
                  <LoadingOutlined
                    style={{ fontSize: 18, padding: "0 10px" }}
                    spin
                  />
                </>
              ) : (
                <>تسجيل</>
              )}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
// export default ApplicationForm;
const mapDispatchToProps = (dispatch) => ({
  //  dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state, props) => {
  return {
    isLoggedIn: state.regularUser.isLoggedIn,
    user: state.regularUser.user,
    app: Object.keys(props.app).length > 0 ? props.app : null,
    next: props.next,
  };
};
// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
