/**
 * 图片懒加载组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class LazyImage extends React.Component {
    static propTypes = {
        id: PropTypes.string, // img标签id
        className: PropTypes.string, // img标签 class
        src: PropTypes.string, // img标签 src
        title: PropTypes.string, // img标签 title
        alt: PropTypes.string, // img标签 alt
        name: PropTypes.string, // img标签 name
        style: PropTypes.object, // img标签 style
        onClick: PropTypes.func, // img标签 点击事件
        onError: PropTypes.func, // 图片加载error事件
        onLoad: PropTypes.func, // 图片加载load事件，
        lazyImageData: PropTypes.shape({
            offset: PropTypes.number, // 图片加载距可视区域距离
            height: PropTypes.number // 占位图高度
        }),
        shapeFlag: PropTypes.string // 占位图类型,传该值则为不规则图片大小,展位图的大小固定值
    };

    static defaultProps = {
        lazyImageData: {}
    };

    constructor(props) {
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.state = {
            isLoaded: false // 加载完的标记
        };
    }

    /**
     * @desc 图片加载成功
     * @param res Object 事件回调参数
     */
    onLoad(res) {
        if (this.unmount) return;
        this.setState({
            isLoaded: true
        });
        typeof this.props.onLoad === 'function' && this.props.onLoad(res);
    }

    /**
     * @desc 图片加载失败
     * @param res Object 事件回调参数
     */
    onError(res) {
        typeof this.props.onError === 'function' && this.props.onError(res);
    }

    /**
     * @desc 获取占位图dom节点
     * @param imgBox
     */
    imgBoxDom(imgBox) {
        this.imgBox = imgBox;
    }

    listenerScrollFlag = false; // 添加滚动监听事件标记

    oldScrollDate = 0; // 上一次滑动事件时间戳

    /**
     * @desc 滚动事件，加载图片，卸载scroll
     */
    scrollEvent() {
        let newScrollDate = new Date(),
            oldScrollDate = this.oldScrollDate;
        if (newScrollDate - oldScrollDate < 100) return; // throttle 减少性能损耗
        oldScrollDate = newScrollDate;
        let imgBox = this.imgBox,
            seeHeight = document.documentElement.clientHeight;
        if ((imgBox.getBoundingClientRect().top - (this.props.lazyImageData.offset ? this.props.lazyImageData.offset : 0) < seeHeight) && imgBox.getBoundingClientRect().top + this.props.lazyImageData.height + (this.props.lazyImageData.offset ? this.props.lazyImageData.offset : 0) > 0) { // 判断图片是否在可视区域
            let imgObj = new Image();
            imgObj.src = this.props.src;
            imgObj.onload = this.onLoad.bind(this);
            imgObj.onerror = this.onError.bind(this);
            if (window.removeEventListener) {
                window.removeEventListener('scroll', this.scrollEvent);
            } else if (window.detachEvent) {
                window.detachEvent('onscroll', this.scrollEvent);
            }
        }
    };

    /**
     * @desc 监听scroll
     */
    ListenerScroll() {
        if (this.imgBox && this.props.src && !this.listenerScrollFlag) {
            window.addEventListener('scroll', this.scrollEvent);
            this.listenerScrollFlag = true;
            this.scrollEvent(); // 页面渲染后加载当前可视页面的图片
        }
    }

    render() {
        let imgClassName = this.state.isLoaded ? 'lazy-image-loaded ' : 'loading-image ',
            imgTag = (<div></div>);

        imgClassName += `${this.props.className ? this.props.className : ''}`;
        if (this.state.isLoaded) {
            imgTag = (<img id={this.props.id} className={imgClassName} style={this.props.style} src={this.props.src}
                alt={this.props.alt}
                onClick={() => typeof this.props.onClick === 'function' && this.props.onClick(this.props.src)}
                title={this.props.title} name={this.props.name}/>);
        } else if (this.props.lazyImageData.height && this.props.src) {
            imgTag = (<div ref={this.imgBoxDom.bind(this)} className={this.props.shapeFlag ? 'lazy-image-box lazy-image-box-shape' : 'lazy-image-box'}
                style={{ height: `${this.props.lazyImageData.height / 20}rem` }}></div>);
        } else if (this.props.src) {
            imgTag = (<div className={this.props.shapeFlag ? 'lazy-image-box lazy-image-box-shape' : 'lazy-image-box'}>
                {
                    <img id={this.props.id} className={imgClassName} style={this.props.style} src={this.props.src}
                        onLoad={this.onLoad.bind(this)} onError={this.onError.bind(this)}/>
                }
            </div>);
        }
        return imgTag;
    }

    componentDidMount() {
        this.ListenerScroll();
    }

    componentDidUpdate() {
        this.ListenerScroll();
    }

    componentWillUnmount() {
        if (window.removeEventListener) {
            window.removeEventListener('scroll', this.scrollEvent);
        } else if (window.detachEvent) {
            window.detachEvent('onscroll', this.scrollEvent);
        }
        this.unmount = true;
    }
}
