import React from 'react';
import BaseLayout from './baseLayout';
import PropTypes from 'prop-types';

const ULR_NO_LAYOUT = ['/', '/home', '/class', '/my'];

const Index = (props) => {
    const renderBody = () => {
        const { location: { pathname }, children } = props;
        if (ULR_NO_LAYOUT.includes(pathname)) {
            return (<BaseLayout {...props} />);
        }
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {renderBody()}
        </React.Fragment>
    );
};

Index.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default Index;
