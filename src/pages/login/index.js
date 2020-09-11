import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Toast } from 'antd-mobile';
import { CSSTransition } from 'react-transition-group';
import { history } from 'umi';
import { Line, ProtocolModal } from './components';
import './index.less';

let timer = null;

const LoginNew = () => {
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phoneIsFocus, setPhoneIsFocus] = useState(false);
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneCodeIsFocus, setPhoneCodeIsFocus] = useState(false);
    const [isWait, setIsWait] = useState('');
    const [codeText, setCodeText] = useState('获取验证码');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (/^1[3456789]\d{9}$/.test(phone)) {
            setPhoneError(false);
        }
    }, [phone]);

    useEffect(() => {
        return () => {
            timer = null;
        };
    }, []);

    // 协议弹窗
    const showProtocol = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    /**
     * 倒计时
     */
    const setTime = () => {
        setIsWait(true);
        let countdown = 60;
        setCodeText(`${countdown}s`);
        timer = setInterval(() => {
            if (countdown === 0) {
                setCodeText('重新获取');
                setIsWait(false);
                clearInterval(timer);
            } else {
                countdown--;
                setCodeText(`${countdown}s`);
            }
        }, 1000);
    };

    /**
     * 获取短信验证码
     *  @return {Boolean} 当信息不完整时退出
     */
    const getCode = () => {
        if (isWait) {
            return false;
        }
        if (!checkData()) return;
        Toast.success('验证码发送成功', 2);
        // 接口成功发送验证码并倒计时
        setTime();
    };

    /**
     * 登录
     * @return {Boolean} 当信息不完整时退出
     */
    const submit = () => {
        history.push('/home');
    };

    /**
     * 校验表单
     * @return {Boolean} 当信息不完整时退出
     */
    const checkData = () => {
        if (!phone) {
            Toast.fail('请输入手机号码', 2);
            return false;
        }
        if (!/^1[3456789]\d{9}$/.test(phone)) {
            Toast.fail('请输入正确的手机号', 2);
            setPhoneError(true);
            return false;
        }
        return true;
    };
    return (
        <div className="login-bg">
            <div className="logo-wrap">
                <div className="logo"></div>
                <div className="welcome-wrap">
                    <div className="hello">您好!</div>
                    <div className="welcome">欢迎来到<span>UMI项目</span></div>
                </div>
            </div>
            <div className="form-wraper">
                <div className={classNames('input-wrap')}>
                    <CSSTransition
                        in={phone.length > 0}
                        timeout={400}
                        classNames="fade"
                        unmountOnExit
                    >
                        <span>手机号</span>
                    </CSSTransition>
                    <CSSTransition
                        in={phone.length > 0}
                        timeout={400}
                        classNames="input"
                    >
                        <input
                            className={phoneError ? 'error' : ''}
                            value={phone}
                            onChange={(e) => {
                                if (e.target.value.length <= 11) {
                                    setPhone(e.target.value);
                                }
                            }}
                            onFocus={() => {
                                setPhoneIsFocus(true);
                            }}
                            onBlur={() => {
                                setPhoneIsFocus(false);
                            }}
                            type="text"
                            placeholder="请输入手机号" />
                    </CSSTransition>
                </div>
                <Line show={phoneIsFocus} />
                <div className={classNames('input-wrap-flex', 'margin-top-20')}>
                    <div className="left">
                        <CSSTransition
                            in={phoneCode.length > 0}
                            timeout={400}
                            classNames="fade"
                            unmountOnExit
                        >
                            <span>短信验证码</span>
                        </CSSTransition>
                        <CSSTransition
                            in={phoneCode.length > 0}
                            timeout={400}
                            classNames="input"
                        >
                            <input
                                value={phoneCode}
                                onChange={(e) => {
                                    setPhoneCode(e.target.value);
                                }}
                                onFocus={() => {
                                    setPhoneCodeIsFocus(true);
                                }}
                                onBlur={() => {
                                    setPhoneCodeIsFocus(false);
                                }}
                                type="text"
                                placeholder="请输入短信验证码" />
                        </CSSTransition>
                    </div>
                    <div className="right">
                        <span className={classNames('code-info', { 'gray-info': isWait, 'active-info': codeText === '重新获取' })}
                            onClick={getCode}>{codeText}</span>
                    </div>
                </div>
                <Line show={phoneCodeIsFocus} />
            </div>
            <div className="login-wrap">
                <div className="login" onClick={submit}>登录/注册</div>
            </div>
            <p className="agree-wrap" onClick={(e) => {
                showProtocol();
            }}>登录或注册即代表您已同意<span className="agree">《用户注册协议》</span></p>
            {/* ----协议---- */}
            <ProtocolModal visible={visible} onClose={() => { onClose(); }} />
        </div>
    );
};

export default LoginNew;
