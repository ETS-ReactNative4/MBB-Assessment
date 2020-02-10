var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import uniq from 'lodash/uniq';
import { CRUD_GET_LIST_SUCCESS, CRUD_CREATE_SUCCESS, } from '../../../../actions';
import { DELETE, DELETE_MANY } from '../../../../core';
var idsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = []; }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === DELETE) {
            var index = previousState
                .map(function (el) { return el === action.payload.id; }) // eslint-disable-line eqeqeq
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            return __spreadArrays(previousState.slice(0, index), previousState.slice(index + 1));
        }
        if (action.meta.fetch === DELETE_MANY) {
            var newState = previousState.filter(function (el) { return !action.payload.ids.includes(el); });
            return newState;
        }
    }
    switch (action.type) {
        case CRUD_GET_LIST_SUCCESS:
            return action.payload.data.map(function (_a) {
                var id = _a.id;
                return id;
            });
        case CRUD_CREATE_SUCCESS:
            return uniq(__spreadArrays([action.payload.data.id], previousState));
        default:
            return previousState;
    }
};
export default idsReducer;
export var getIds = function (state) { return state; };
