import React from "react";
import PropTypes from "prop-types";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import DotIcon from '@material-ui/icons/FiberManualRecord';

function MinusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
		</SvgIcon>
	);
}

function PlusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
		</SvgIcon>
	);
}

function TransitionComponent(props) {
	const style = useSpring({
		from: { opacity: 0, transform: "translate3d(20px,0,0)" },
		to: {
			opacity: props.in ? 1 : 0,
			transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
		}
	});

	return (
		<animated.div style={style}>
			<Collapse {...props} />
		</animated.div>
	);
}

TransitionComponent.propTypes = {
	/**
	 * Show the component; triggers the enter or exit states
	 */
	in: PropTypes.bool
};

const StyledTreeItem = withStyles((theme) => ({
	iconContainer: {
		"& .close": {
			opacity: 0.3
		}
	},
	group: {
		marginLeft: 7,
		paddingLeft: 18,
		borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
	}
}))((props) => (
	<TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles({
	root: {
		height: 264,
		flexGrow: 1,
		maxWidth: 400
	}
});

export default function CustomizedTreeView() {
	const classes = useStyles();

	return (
		<TreeView
			className={classes.root}
			defaultExpanded={["1"]}
			defaultCollapseIcon={<MinusSquare />}
			defaultExpandIcon={<PlusSquare />}
			defaultEndIcon={null}
		>
			<StyledTreeItem nodeId="1" label="Event Name">
				<StyledTreeItem nodeId="2" label="System 1" />
				<StyledTreeItem nodeId="3" label="System 2">
					<StyledTreeItem nodeId="5" label="Task 1" />
					<StyledTreeItem nodeId="6" label="Task 2">
						<StyledTreeItem nodeId="7" label="Subtask 1">
							<StyledTreeItem nodeId="10" label="Finding 1" />
							<StyledTreeItem nodeId="11" label="Finding 2" />
						</StyledTreeItem>
						<StyledTreeItem nodeId="8" label="Subtask 2" />
						<StyledTreeItem nodeId="9" label="Subtask 3" />
					</StyledTreeItem>
				</StyledTreeItem>
				<StyledTreeItem nodeId="4" label="System 3" />
			</StyledTreeItem>
		</TreeView>
	);
}