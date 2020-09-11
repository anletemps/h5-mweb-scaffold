import React, { useState } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './index.less';
import { history } from 'umi';
import PropTypes from 'prop-types';

const HomeTabbarCarousel = (props) => {
    const { bannerItem } = props;
    const [imgHeight, setImgHeight] = useState('176px');

    const bannerLink = (url) => {
        history.push(url);
    };

    return (
        <Carousel
            autoplay={true}
            infinite
            selectedIndex={0}
            className={styles.space_carousel}
        >
            {(bannerItem || []).map((val, index) => (
                <a
                    key={index}
                    onClick={() => bannerLink(val.url)}
                    style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                >
                    <img
                        src={require('Images/2c3968e33e2342feaa9fa3695b2e169e.png')}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            setImgHeight('auto');
                        }}
                    />
                </a>
            ))}
        </Carousel>
    );
};

HomeTabbarCarousel.propTypes = {
    bannerItem: PropTypes.array.isRequired
};
export default HomeTabbarCarousel;
