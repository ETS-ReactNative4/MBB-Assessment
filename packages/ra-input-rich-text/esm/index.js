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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import debounce from 'lodash/debounce';
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import { useInput, FieldTitle } from 'ra-core';
import { InputHelperText } from 'ra-ui-materialui';
import { FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
var useStyles = makeStyles(styles, { name: 'RaRichTextInput' });
var RichTextInput = function (_a) {
    var _b = _a.options, options = _b === void 0 ? {} : _b, // Quill editor options
    _c = _a.record, // Quill editor options
    record = _c === void 0 ? {} : _c, _d = _a.toolbar, toolbar = _d === void 0 ? true : _d, _e = _a.fullWidth, fullWidth = _e === void 0 ? true : _e, configureQuill = _a.configureQuill, _f = _a.helperText, helperText = _f === void 0 ? false : _f, label = _a.label, source = _a.source, resource = _a.resource, variant = _a.variant, _g = _a.margin, margin = _g === void 0 ? 'dense' : _g, rest = __rest(_a, ["options", "record", "toolbar", "fullWidth", "configureQuill", "helperText", "label", "source", "resource", "variant", "margin"]);
    var classes = useStyles();
    var quillInstance = useRef();
    var divRef = useRef();
    var editor = useRef();
    var _h = useInput(__assign({ source: source }, rest)), id = _h.id, isRequired = _h.isRequired, _j = _h.input, value = _j.value, onChange = _j.onChange, _k = _h.meta, touched = _k.touched, error = _k.error;
    var lastValueChange = useRef(value);
    var onTextChange = useCallback(debounce(function () {
        var value = editor.current.innerHTML === '<p><br></p>'
            ? ''
            : editor.current.innerHTML;
        lastValueChange.current = value;
        onChange(value);
    }, 500), []);
    useEffect(function () {
        quillInstance.current = new Quill(divRef.current, __assign({ modules: { toolbar: toolbar, clipboard: { matchVisual: false } }, theme: 'snow' }, options));
        if (configureQuill) {
            configureQuill(quillInstance.current);
        }
        quillInstance.current.setContents(quillInstance.current.clipboard.convert(value));
        editor.current = divRef.current.querySelector('.ql-editor');
        quillInstance.current.on('text-change', onTextChange);
        return function () {
            quillInstance.current.off('text-change', onTextChange);
            onTextChange.cancel();
            quillInstance.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(function () {
        if (lastValueChange.current !== value) {
            var selection = quillInstance.current.getSelection();
            quillInstance.current.setContents(quillInstance.current.clipboard.convert(value));
            if (selection && quillInstance.current.hasFocus()) {
                quillInstance.current.setSelection(selection);
            }
        }
    }, [value]);
    return (React.createElement(FormControl, { error: !!(touched && error), fullWidth: fullWidth, className: "ra-rich-text-input", margin: margin },
        label !== '' && label !== false && (React.createElement(InputLabel, { shrink: true, htmlFor: id, className: classes.label },
            React.createElement(FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }))),
        React.createElement("div", { "data-testid": "quill", ref: divRef, className: variant }),
        React.createElement(FormHelperText, { error: !!error, className: !!error ? 'ra-rich-text-input-error' : '' },
            React.createElement(InputHelperText, { error: error, helperText: helperText, touched: touched }))));
};
RichTextInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.object,
    source: PropTypes.string,
    toolbar: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.shape({
            container: PropTypes.array,
            handlers: PropTypes.object,
        }),
    ]),
    fullWidth: PropTypes.bool,
    configureQuill: PropTypes.func,
};
export default RichTextInput;
