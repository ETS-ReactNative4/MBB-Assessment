"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable default-case */
var ra_core_1 = require("ra-core");
var buildGetListVariables = function (introspectionResults) { return function (resource, aorFetchType, params) {
    var filter = Object.keys(params.filter).reduce(function (acc, key) {
        var _a, _b, _c, _d, _e, _f;
        if (key === 'ids') {
            return __assign(__assign({}, acc), { id_in: params.filter[key] });
        }
        if (typeof params.filter[key] === 'object') {
            var type = introspectionResults.types.find(function (t) { return t.name === resource.type.name + "Filter"; });
            var filterSome = type.inputFields.find(function (t) { return t.name === key + "_some"; });
            if (filterSome) {
                var filter_1 = Object.keys(params.filter[key]).reduce(function (filter_acc, k) {
                    var _a;
                    return (__assign(__assign({}, filter_acc), (_a = {}, _a[k + "_in"] = params.filter[key][k], _a)));
                }, {});
                return __assign(__assign({}, acc), (_a = {}, _a[key + "_some"] = filter_1, _a));
            }
        }
        var parts = key.split('.');
        if (parts.length > 1) {
            if (parts[1] === 'id') {
                var type = introspectionResults.types.find(function (t) { return t.name === resource.type.name + "Filter"; });
                var filterSome = type.inputFields.find(function (t) { return t.name === parts[0] + "_some"; });
                if (filterSome) {
                    return __assign(__assign({}, acc), (_b = {}, _b[parts[0] + "_some"] = { id: params.filter[key] }, _b));
                }
                return __assign(__assign({}, acc), (_c = {}, _c[parts[0]] = { id: params.filter[key] }, _c));
            }
            var resourceField = resource.type.fields.find(function (f) { return f.name === parts[0]; });
            if (resourceField.type.name === 'Int') {
                return __assign(__assign({}, acc), (_d = {}, _d[key] = parseInt(params.filter[key], 10), _d));
            }
            if (resourceField.type.name === 'Float') {
                return __assign(__assign({}, acc), (_e = {}, _e[key] = parseFloat(params.filter[key], 10), _e));
            }
        }
        return __assign(__assign({}, acc), (_f = {}, _f[key] = params.filter[key], _f));
    }, {});
    return {
        skip: parseInt((params.pagination.page - 1) * params.pagination.perPage, 10),
        first: parseInt(params.pagination.perPage, 10),
        orderBy: params.sort.field + "_" + params.sort.order,
        filter: filter,
    };
}; };
var buildCreateUpdateVariables = function (resource, aorFetchType, params, queryType) {
    return Object.keys(params.data).reduce(function (acc, key) {
        var _a, _b, _c;
        if (Array.isArray(params.data[key])) {
            var arg = queryType.args.find(function (a) { return a.name === key + "Ids"; });
            if (arg) {
                return __assign(__assign({}, acc), (_a = {}, _a[key + "Ids"] = params.data[key].map(function (_a) {
                    var id = _a.id;
                    return id;
                }), _a));
            }
        }
        if (typeof params.data[key] === 'object') {
            var arg = queryType.args.find(function (a) { return a.name === key + "Id"; });
            if (arg) {
                return __assign(__assign({}, acc), (_b = {}, _b[key + "Id"] = params.data[key].id, _b));
            }
        }
        return __assign(__assign({}, acc), (_c = {}, _c[key] = params.data[key], _c));
    }, {});
};
exports.default = (function (introspectionResults) { return function (resource, aorFetchType, params, queryType) {
    var _a;
    switch (aorFetchType) {
        case ra_core_1.GET_LIST: {
            return buildGetListVariables(introspectionResults)(resource, aorFetchType, params, queryType);
        }
        case ra_core_1.GET_MANY:
            return {
                filter: { id_in: params.ids },
            };
        case ra_core_1.GET_MANY_REFERENCE: {
            var parts = params.target.split('.');
            return {
                filter: (_a = {}, _a[parts[0]] = { id: params.id }, _a),
            };
        }
        case ra_core_1.GET_ONE:
        case ra_core_1.DELETE:
            return {
                id: params.id,
            };
        case ra_core_1.CREATE:
        case ra_core_1.UPDATE: {
            return buildCreateUpdateVariables(resource, aorFetchType, params, queryType);
        }
    }
}; });
