import { CP_SET_FIELD_VALUE } from "../reducers/types";

export const setFieldValue = (key, value) => {
    console.log(key + "," + value);
    return {

        type: CP_SET_FIELD_VALUE,
        payload: { key, value }
    }
}