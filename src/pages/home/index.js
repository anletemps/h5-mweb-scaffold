import React from 'react';
import { SearchBar, Flex } from 'antd-mobile';
import { history, connect } from 'umi';
import { HomeCarousel, LazyImage } from 'Components';
import PropTypes from 'prop-types';
import './index.less';

const Home = (props) => {
    const { bannerList, productList } = props;
    return (
        <div className='homePage'>
            <LazyImage src='https://picsum.photos/id/48/200/200' />
            <div className='homePage_search'>
                <div className='homePage_input'>
                    <SearchBar
                        placeholder="搜索你想要的商品"
                        onFocus={() => history.push('/search')}
                    />
                </div>
                <div className='homePage_search_ico' onClick={() => history.push('/class')}>
                    <img src={require('../../assets/icon-classify.png')} />
                </div>
                {
                    bannerList && bannerList.length !== 0
                        ? <HomeCarousel bannerItem={bannerList} />
                        : ''
                }
            </div>
            <div className='stepBlock'>
                <div className='stepBlocktitle'>四步变现</div>
                <img className='stepBlockimg' onClick={() => history.push('/class')} src={require('../../assets/recycleH5_01.png')} alt="" />
            </div>
            <div className='stepBlock hotMobileBlock'>
                <div className='stepBlocktitle'>热门机型</div>
                <Flex className='hotMobile_block'>
                    <Flex.Item><div className='hotMobile' onClick={() => history.push('/class?brand=52')}><div className='hotMobile_icon' />苹果</div></Flex.Item>
                    <Flex.Item><div className='hotMobile' onClick={() => history.push('/class?brand=4')}><div className='hotMobile_icon oppo' />OPPO</div></Flex.Item>
                    <Flex.Item><div className='hotMobile' onClick={() => history.push('/class?brand=16')}><div className='hotMobile_icon vivo' />VIVO</div></Flex.Item>
                    <Flex.Item><div className='hotMobile' onClick={() => history.push('/class?brand=9')}><div className='hotMobile_icon huawei' />华为</div></Flex.Item>
                </Flex>
            </div>
            <div className='itemList itemList2'>
                <div className='itemListtitle'>热门回收<div className='gotoMore' onClick={() => history.push('/class')}>更多<img src="https://res.zudeapp.com/wximage/right_arrow.png" alt="" /></div></div>
                <div className='hotlist'>
                    {
                        productList && productList.length !== 0 ? productList.map((val) => (
                            <div className='itemBlock' key={val.id} onClick={() => { console.log('去商品'); }}>
                                <div className='product_img'>
                                    <img className='img' src={require('Images/5a28b40bc60057c40a000005.png')} />
                                </div>
                                <span className='text_ellipsis'>{val.productName}</span>
                                <div className='priceBox'>最高回收价 <span className='price'>¥{val.topPrice}</span></div>
                                <div className='btn' >立即回收</div>
                            </div>
                        ))
                            : ''
                    }
                </div>
            </div>
        </div>

    );
};

Home.propTypes = {
    bannerList: PropTypes.array.isRequired,
    productList: PropTypes.array.isRequired
};

export default connect(({ home }) => ({
    bannerList: home.list.bannerList,
    productList: home.list.productList
}))(Home);
