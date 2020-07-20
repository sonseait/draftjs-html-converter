import * as React from "react";
import "./App.css";
import { HashRouter, Route, Redirect, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Converter } from "./modules/converter/Converter";

export const App: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Layout>
        {/* <Layout.Header className="header">
          <div className="logo" />
        </Layout.Header> */}
        <Layout>
          {/* <Layout.Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[global.location.hash]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="#/users">
                <Link
                  to="/users"
                  replace={global.location.pathname === "/users"}
                >
                  <span>Users</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider> */}
          <Layout style={{ padding: "0 24px 24px" }}>
            <Layout.Content className="site-layout-background">
              <Route path="/users" component={Converter}></Route>
              <Redirect to="/users"></Redirect>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
};
