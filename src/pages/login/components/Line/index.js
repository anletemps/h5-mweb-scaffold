import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Line = (props) => {
    const { show = false } = props;
    return (
        <div className="line-wrap">
            <CSSTransition
                in={show}
                timeout={500}
                classNames="line"
            >
                <div className="line"></div>
            </CSSTransition>
        </div>
    );
};

Line.propTypes = {
    show: PropTypes.bool
};

export default Line;
