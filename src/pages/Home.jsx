import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { logginOut } from "../redux/actions/authAction";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Home extends React.Component {
  state = {
    collapsed: false,
    applications: [],
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount() {
    const formData = new FormData();
    formData.append("uid", JSON.parse(localStorage.getItem("user"))?.user?.uid);

    axios
      .post(
        "https://abnaey-dashboard.herokuapp.com/api/my-applications",
        formData
      )
      .then((response) => {
        console.log(response);
        this.setState({ applications: response.data.myApplications });
        // Modal.success({
        //   title: "تم بنجاح",
        //   content: <p>تم ارسال طلبك بنجاح!</p>,
        //   onOk() {
        //     next();
        //   },
        // });
      })
      .catch((error) => console.log(error));
  }
  render() {
    const { collapsed, applications } = this.state;
    return (
      <Layout id="home-page">
        <Sider
          className="side-nav"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} className="mb-5">
              أبنائي
            </Menu.Item>
            <SubMenu key="main" icon={<UserOutlined />} title="الرئيسية">
              <Menu.Item key="3">خدمة 1</Menu.Item>
              <Menu.Item key="4">خدمة 2</Menu.Item>
              <Menu.Item key="5">خدمة 3</Menu.Item>
            </SubMenu>

            <Menu.Item key="10" icon={<FileOutlined />}>
              {this.props.isLoggedIn ? (
                <>
                  <a href="/application">تقديم طلب</a>
                </>
              ) : (
                <>
                  <a href="/signup">انشاء حساب</a>
                </>
              )}
            </Menu.Item>

            {this.props.isLoggedIn ? (
              <>
                <Menu.Item
                  key="9"
                  icon={<LogoutOutlined />}
                  onClick={this.props.dispatchLogOut}
                >
                  تسجيل خروج
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="9" icon={<LogoutOutlined />}>
                  <a href="/signin">تسجيل دخول</a>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {this.props.isLoggedIn && (
                <>مرحبا {this.props.user.displayName}</>
              )}
              <div className="row mt-5">
                <p>عنوان ابنائي</p>
                {applications.map((app, i) => (
                  <div className="col">
                    <a href={`/application?data=${JSON.stringify(app)}`}>App {i+1}</a>
                  </div>
                ))}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            أبنائي @2021 , تم إنشاءه بواسطه أبنائي
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.regularUser.isLoggedIn,
    user: state.regularUser.user,
  };
};
// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
