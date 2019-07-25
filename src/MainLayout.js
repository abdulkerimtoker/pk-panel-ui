import React from 'react';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import PlayerList from "./containers/PlayerList";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import PlayerPage from "./containers/PlayerPage";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const MainLayout = () => (
    <Layout>
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Link to="/players">
                            <Icon type="user" />
                            <span className="nav-text">Players</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/videos">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{ padding: '0 50px', marginLeft: 200 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <Switch>
                        <Route path="/players" component={PlayerList} />
                        <Route path="/player/:id/:tab?" component={PlayerPage} />
                    </Switch>
                </div>
            </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Saptor ©2019 - All rights reserved</Footer>
    </Layout>
);

export default MainLayout