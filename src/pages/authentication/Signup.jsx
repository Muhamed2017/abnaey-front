import React, { Component } from "react";
import "./auth.scss";
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
import BackgroundImge from "./bkground.png";
import bgShape from "./bg-shape.png";
import arrowIcon from "./arrow.svg";
import logo from "./logo.svg";
import fbIcon from "./fb-icon.svg";
import twtrIcon from "./twitter-icon.svg";
import GPIcon from "./google-plus.svg";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: "",
      email: "",
      password: "",
    };
  }

  onFinish = (e) => {
    e.preventDefault();
    const { full_name, email, password } = e.target;
    this.props.dispatchRegularSignup(
      full_name.value,
      email.value,
      password.value
    );
  };
  render() {
    return (
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${BackgroundImge})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center">
            <div className="col">
              <div className="floating">
                <div style={{ display: "flex", height: "100%" }}>
                  <div className="col-6 left" style={{ paddingTop: "10px" }}>
                    <div className="row">
                      <div className="col-12">
                        <div class="w-100">
                          <img
                            class="arrow"
                            style={{ float: "right" }}
                            src={arrowIcon}
                            width="52.81px"
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div class="logo-container text-center mb-5">
                          <img src={logo} width="180px" />
                        </div>
                        <p class="form-title">?????????? ???????? ????????</p>
                        <form onSubmit={this.onFinish}>
                          <div className="row inner">
                            <input
                              type="text"
                              name="full_name"
                              placeholder="?????????? ??????????????"
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="??????????????"
                            />
                            <input
                              className="mt-3"
                              name="password"
                              type="password"
                              placeholder="???????? ????????????"
                            />{" "}
                            <input
                              className="mt-3"
                              name="confirm_password"
                              type="password"
                              placeholder="?????????? ???????? ???????????? "
                            />
                            <button className="mt-5" type="submit">
                              ????????????
                            </button>
                            <div className="col social-media text-center mt-3">
                              <small>???? ???? ?????????????? ?????????????? ???? ????????</small>
                              <br />
                              <div
                                style={{ display: "inline" }}
                                className="icons-list"
                              >
                                <img
                                  src={GPIcon}
                                  onClick={this.props.dispatchGoogleSignup}
                                />
                                <img src={twtrIcon} />
                                <img
                                  src={fbIcon}
                                  onClick={this.props.dispatchFacebookSignup}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 right"
                    style={{
                      backgroundImage: `url(${bgShape})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{ display: "flex", height: "100%" }}
                      class="align-items-center"
                    >
                      <div className="col text-wrapper">
                        <h1>???????? ?????????? ??????????</h1>
                        <h1>?????? ???????? ????????????</h1>
                        <br />
                        <p>?????? ?????????????? ????????????</p>
                        <p> ?????? ????????</p>

                        <div className="signup-request mt-2">
                          <p>???????? ??????????</p>
                          <a href="/siginin">?????????? ????????</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              label="?????????? ??????????????"
              name="fullName"
              rules={[{ required: true, message: "???? ???????? ???????? ???????? ????????????" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="???????????? ????????????????????"
              rules={email_rules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="???????? ????????????"
              name="password"
              rules={password_rules}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password_confirm"
              label="?????????? ???????? ????????????"
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
                    ???????? ??????????????
                    <LoadingOutlined
                      style={{ fontSize: 18, padding: "0 10px" }}
                      spin
                    />
                  </>
                ) : (
                  <>??????????</>
                )}
              </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button>???????????? ???? ???????? ??????????</Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button onClick={this.props.dispatchGoogleSignup}>
                ???????????? ???? ???????? ????????
              </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button onClick={this.props.dispatchFacebookSignup}>
                ???????????? ???? ???????? ????????????
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
