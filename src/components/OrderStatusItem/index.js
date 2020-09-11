import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const OrderStatusItem = (props) => {
    const { onStatusClick, count, url, text } = props;
    return (
        <div className={styles.order_status_item}>
            <div className={styles.order_status_item_image} onClick={(e) => onStatusClick(e)}>
                {count ? (
                    <div className={styles.order_status_item_image_icon}>{count}</div>
                ) : (
                    <div className={styles.order_status_item_image_icon_disable} />
                )}
                <img className={styles.order_status_item_image_content} src={url} alt="" />
            </div>
            <div className={styles.order_status_item_image_text}>{text}</div>
        </div>
    );
};

OrderStatusItem.propTypes = {
    onStatusClick: PropTypes.func.isRequired,
    count: PropTypes.string,
    url: PropTypes.string,
    text: PropTypes.string
};

export default OrderStatusItem;
