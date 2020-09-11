import { reg } from 'Services/my';
export default {
    namespace: 'my',
    state: {
        list: {
            data: []
        },
        notLogin: false
    },
    effects: {
        * reg({ payload, callback }, { call, put }) {
            const response = yield call(reg, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'setData',
                payload: response
            });
            if (response) {
                callback(response);
            }
        },
    },
    reducers: {
        setData(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    }
};
