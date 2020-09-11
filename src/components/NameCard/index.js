import React from 'react';
import { history } from 'umi';
import PropTypes from 'prop-types';
import styles from './index.less';
import imgURL from 'Images/default-pic.png';

const NameCard = (props) => {
    const { avatar = imgURL, notLogin, name } = props;

    const link = () => {
        history.push('/login');
    };

    return (
        <React.Fragment>
            {
                notLogin === 1 && <div className={styles.name_content}>
                    <div className={styles.content_card}>
                        <img className={styles.avatar} src={avatar} alt="" />
                        <div className={styles.content_name}>{name}</div>
                    </div>
                </div>
            }
            {
                notLogin === 0 && <div className={styles.name_content}
                    onClick={() => { link(); }}>
                    <div className={styles.content_card}>
                        <img className={styles.avatar} src={avatar} alt="" />
                        <div className={styles.content_name}>{name}</div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

NameCard.propTypes = {
    notLogin: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
};

export default NameCard;
