import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.grey[300],
        display: 'flex',
    },
}); }, { name: 'RaPlaceholder' });
var Placeholder = function (_a) {
    var className = _a.className, classesOverride = _a.classes;
    var classes = useStyles({ classes: classesOverride });
    return React.createElement("div", { className: classnames(className, classes.root) }, "\u00A0");
};
export default Placeholder;
