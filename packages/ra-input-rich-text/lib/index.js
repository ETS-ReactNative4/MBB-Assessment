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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = __importDefault(require("lodash/debounce"));
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var quill_1 = __importDefault(require("quill"));
var ra_core_1 = require("ra-core");
var ra_ui_materialui_1 = require("ra-ui-materialui");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = __importDefault(require("./styles"));
var useStyles = styles_1.makeStyles(styles_2.default, { name: 'RaRichTextInput' });
var RichTextInput = function (_a) {
    var _b = _a.options, options = _b === void 0 ? {} : _b, // Quill editor options
    _c = _a.record, // Quill editor options
    record = _c === void 0 ? {} : _c, _d = _a.toolbar, toolbar = _d === void 0 ? true : _d, _e = _a.fullWidth, fullWidth = _e === void 0 ? true : _e, configureQuill = _a.configureQuill, _f = _a.helperText, helperText = _f === void 0 ? false : _f, label = _a.label, source = _a.source, resource = _a.resource, variant = _a.variant, _g = _a.margin, margin = _g === void 0 ? 'dense' : _g, rest = __rest(_a, ["options", "record", "toolbar", "fullWidth", "configureQuill", "helperText", "label", "source", "resource", "variant", "margin"]);
    var classes = useStyles();
    var quillInstance = react_1.useRef();
    var divRef = react_1.useRef();
    var editor = react_1.useRef();
    var _h = ra_core_1.useInput(__assign({ source: source }, rest)), id = _h.id, isRequired = _h.isRequired, _j = _h.input, value = _j.value, onChange = _j.onChange, _k = _h.meta, touched = _k.touched, error = _k.error;
    var lastValueChange = react_1.useRef(value);
    var onTextChange = react_1.useCallback(debounce_1.default(function () {
        var value = editor.current.innerHTML === '<p><br></p>'
            ? ''
            : editor.current.innerHTML;
        lastValueChange.current = value;
        onChange(value);
    }, 500), []);
    react_1.useEffect(function () {
        quillInstance.current = new quill_1.default(divRef.current, __assign({ modules: { toolbar: toolbar, clipboard: { matchVisual: false } }, theme: 'snow' }, options));
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
    react_1.useEffect(function () {
        if (lastValueChange.current !== value) {
            var selection = quillInstance.current.getSelection();
            quillInstance.current.setContents(quillInstance.current.clipboard.convert(value));
            if (selection && quillInstance.current.hasFocus()) {
                quillInstance.current.setSelection(selection);
            }
        }
    }, [value]);
    return (react_1.default.createElement(core_1.FormControl, { error: !!(touched && error), fullWidth: fullWidth, className: "ra-rich-text-input", margin: margin },
        label !== '' && label !== false && (react_1.default.createElement(core_1.InputLabel, { shrink: true, htmlFor: id, className: classes.label },
            react_1.default.createElement(ra_core_1.FieldTitle, { label: label, source: source, resource: resource, isRequired: isRequired }))),
        react_1.default.createElement("div", { "data-testid": "quill", ref: divRef, className: variant }),
        react_1.default.createElement(core_1.FormHelperText, { error: !!error, className: !!error ? 'ra-rich-text-input-error' : '' },
            react_1.default.createElement(ra_ui_materialui_1.InputHelperText, { error: error, helperText: helperText, touched: touched }))));
};
RichTextInput.propTypes = {
    label: prop_types_1.default.string,
    options: prop_types_1.default.object,
    source: prop_types_1.default.string,
    toolbar: prop_types_1.default.oneOfType([
        prop_types_1.default.array,
        prop_types_1.default.bool,
        prop_types_1.default.shape({
            container: prop_types_1.default.array,
            handlers: prop_types_1.default.object,
        }),
    ]),
    fullWidth: prop_types_1.default.bool,
    configureQuill: prop_types_1.default.func,
};
exports.default = RichTextInput;
