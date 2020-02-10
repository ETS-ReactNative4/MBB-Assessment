"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Inbox_1 = __importDefault(require("@material-ui/icons/Inbox"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/styles");
var ra_core_1 = require("ra-core");
var button_1 = require("../button");
var inflection_1 = __importDefault(require("inflection"));
var useStyles = styles_1.makeStyles({
    message: {
        textAlign: 'center',
        opacity: 0.5,
        margin: '0 1em',
    },
    icon: {
        width: '9em',
        height: '9em',
    },
    toolbar: {
        textAlign: 'center',
        marginTop: '2em',
    },
}, { name: 'RaEmpty' });
var Empty = function (_a) {
    var resource = _a.resource, basePath = _a.basePath;
    var classes = useStyles();
    var translate = ra_core_1.useTranslate();
    var resourceName = inflection_1.default.humanize(translate("resources." + resource + ".name", {
        smart_count: 0,
        _: inflection_1.default.pluralize(resource),
    }), true);
    var emptyMessage = translate('ra.page.empty', { name: resourceName });
    var inviteMessage = translate('ra.page.invite');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.message },
            react_1.default.createElement(Inbox_1.default, { className: classes.icon }),
            react_1.default.createElement(Typography_1.default, { variant: "h4", paragraph: true }, translate("resources." + resource + ".empty", {
                _: emptyMessage,
            })),
            react_1.default.createElement(Typography_1.default, { variant: "body1" }, translate("resources." + resource + ".invite", {
                _: inviteMessage,
            }))),
        react_1.default.createElement("div", { className: classes.toolbar },
            react_1.default.createElement(button_1.CreateButton, { variant: "contained", basePath: basePath }))));
};
exports.default = Empty;
