import React from 'react';
import { TabBar } from 'antd-mobile';
import { history } from 'umi';
import 'antd-mobile/dist/antd-mobile.css';
import PropTypes from 'prop-types';
import styles from './baseLayout.less';

const TabBarData = [
    {
        id: 'home',
        name: '首页',
        icon: require('../../assets/recycleH5_07.png'),
        selectedicon: require('../../assets/recycleH5_02.png'),
        url: '/home',
    },
    {
        id: 'class',
        name: '分类',
        icon: require('../../assets/recycleH5_03.png'),
        selectedicon: require('../../assets/recycleH5_06.png'),
        url: '/class',
    },
    {
        id: 'my',
        name: '我的',
        icon: require('../../assets/recycleH5_04.png'),
        selectedicon: require('../../assets/recycleH5_05.png'),
        url: '/my',
    }
];

const BaseLayout = (props) => {
    const { location: { pathname }, children } = props;

    const isTabBarSelect = (url) => {
        if (pathname === '/' && url === '/home') {
            return true;
        } else {
            return pathname === url;
        }
    };

    return (
        <div className={styles.baseLayout}>
            <TabBar
                unselectedTintColor="#333"
                tintColor="#ef5f55"
                barTintColor="white"
                tabBarPosition='bottom'
            >
                {
                    TabBarData.map((t) => {
                        const isSelect = isTabBarSelect(t.url);
                        return (<TabBar.Item
                            title={t.name}
                            key={t.id}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${t.icon}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${t.selectedicon}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            // badge={1}
                            onPress={() => {
                                history.push(t.url);
                            }}
                            selected={isSelect}
                            data-seed="logId"
                        >
                            {isSelect && children}
                        </TabBar.Item>
                        );
                    })
                }
            </TabBar>
        </div>
    );
};

BaseLayout.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default BaseLayout;
