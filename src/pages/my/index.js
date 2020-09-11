import React from 'react';
import { connect } from 'dva';
// import { Modal } from 'antd-mobile';
import { NameCard, OrderStatus } from 'Components';
import styles from './index.less';
import PropTypes from 'prop-types';

const MyIndex = (props) => {
    const { notLogin, data } = props;

    const linkurl = (v) => {
        if (v === 'address') {
            console.log('去地址管理咯');
        } else {
            console.log('去支付账户管理咯');
        }
    };

    return (
        <div className={styles.content_me}>
            <NameCard
                name={notLogin ? JSON.parse(localStorage.getItem('USER_INFO')).name : '登录/注册'}
                notLogin={notLogin ? 1 : 0}
            />
            {data && <OrderStatus countList={0} />}
            {data && <OrderStatus countList={data} />}
            <div className={styles.service_info + ' ' + 'box_shadow'}>
                <div className={styles.service_title + ' ' + 'border_bottommin'}>我的服务</div>
                <div className={styles.service_content}>
                    <div className={styles.service_item} onClick={() => linkurl('account')}>
                        <img
                            className={styles.service_img}
                            src={require('../../assets/recycleH5_17.png')}
                            alt=""
                        />
                        <div className={styles.service_text}>收款方式</div>
                    </div>
                    <div className={styles.service_item} onClick={() => linkurl('address')}>
                        <img
                            className={styles.service_img}
                            src={require('../../assets/recycleH5_18.png')}
                            alt=""
                        />
                        <div className={styles.service_text}>收货地址</div>
                    </div>
                    <div className={styles.service_item} onClick={() => { console.log('帮助中心'); }}>
                        <img
                            className={styles.service_img}
                            src={require('../../assets/recycleH5_19.png')}
                            alt=""
                        />
                        <div className={styles.service_text}>帮助中心</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MyIndex.propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.array.isRequired,
    notLogin: PropTypes.bool.isRequired
};
export default connect(({ my }) => ({
    data: my.list.data,
    notLogin: my.notLogin
}))(MyIndex);
