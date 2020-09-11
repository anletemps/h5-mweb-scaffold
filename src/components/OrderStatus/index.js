import React, { useState } from 'react';
import styles from './index.less';
import OrderStatusItem from 'Components/OrderStatusItem';
import recycleH514 from 'Images/recycleH5_14.png';
import recycleH513 from 'Images/recycleH5_13.png';
import recycleH516 from 'Images/recycleH5_16.png';
import recycleH511 from 'Images/recycleH5_11.png';
import PropTypes from 'prop-types';

const OrderStatus = (props) => {
    const { countList } = props;
    const [statusItem] = useState([
        {
            text: `待发货`,
            url: recycleH514,
            name: 'waitingDeliveryCount',
            value: 1
        },
        {
            text: `待收货`,
            url: recycleH513,
            name: 'waitingReceiveCount',
            value: 2
        },
        {
            text: `待验机`,
            url: recycleH516,
            name: 'waitingReviewCount',
            value: 3
        },
        {
            text: `待确认`,
            url: recycleH511,
            name: 'waitingConfirmCount',
            value: 4
        },
    ]);

    // const [orderStatus] = useState();

    const orderMore = () => {
        console.log('跳转去更多哦');
    };

    return (
        <div className={styles.order_deatil_info + ' ' + 'box_shadow'}>
            <div className={styles.orders} onClick={(e) => { orderMore(); }} >
                <div className={styles.order_text_large}>我的订单</div>
                <div className={styles.order_text_right}>
                    <span className={styles.right_content}>查看更多</span>
                </div>
            </div>
            <div className={styles.list}>
                {statusItem.map((item, index) => {
                    return (
                        <OrderStatusItem
                            count={countList && countList[item.name] !== 0 ? countList[item.name] : ''}
                            key={index}
                            text={item.text}
                            url={item.url}
                            onStatusClick={() => {
                                console.log(`跳转到${item.text}`);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

OrderStatus.propTypes = {
    countList: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired
};

export default OrderStatus;
