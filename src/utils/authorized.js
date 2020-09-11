import { history, connect } from 'umi';

export default connect((props) => {
    const loggingStatus = localStorage.getItem('authority') || false;
    return loggingStatus;
})(function Authority(props) {
    const { loggingStatus } = props;
    console.log(history.path, 'path');
    if (loggingStatus) {
        console.log(11111);
    } else {
        console.log(22222);
    }
    return props.children;
});
