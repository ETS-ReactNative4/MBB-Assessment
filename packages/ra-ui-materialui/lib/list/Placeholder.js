"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.grey[300],
        display: 'flex',
    },
}); }, { name: 'RaPlaceholder' });
var Placeholder = function (_a) {
    var className = _a.className, classesOverride = _a.classes;
    var classes = useStyles({ classes: classesOverride });
    return react_1.default.createElement("div", { className: classnames_1.default(className, classes.root) }, "\u00A0");
};
exports.default = Placeholder;
