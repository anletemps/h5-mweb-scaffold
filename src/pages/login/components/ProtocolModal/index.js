import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd-mobile';

const ProtocolModal = (props) => {
    const { visible, onClose } = props;

    return (
        <Modal
            popup
            visible={visible}
            animationType="slide-up"
            className="modal-service"
            platform={'android'}
            footer={[{ text: '确 定', onPress: () => { onClose(); } }]}
        >
            <div className="modal-coupon-center" style={{ height: 360 }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    src="https://umijs.org/zh/guide/"
                />
            </div>
        </Modal>
    );
};

ProtocolModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ProtocolModal;
