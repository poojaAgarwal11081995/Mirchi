/** @format */

import React, { Fragment } from "react";
//import PropTypes from 'prop-types';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//import { reqOrderList } from '../../../actions';
import BaseComponent from "../../common/BaseComponent";
import { borders } from "@material-ui/system";

import * as Constants from "../../utils/Constants";
import * as types from "../../actions/types";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//import React from 'react';
//import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		width: "100%",
		maxWidth: "100%",
		paddingLeft: 20,
		paddingRight: 20,
	},
});

export default function PrivacyAndPolicyGlobalUrl() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography
				variant="h6"
				component="h6"
				gutterBottom
				style={{ marginTop: 40 }}>
				Privacy Policy
			</Typography>

			<Typography variant="subtitle1" gutterBottom>
				Built the Br app as a Free app. This SERVICE is provided by at no cost
				and is intended for use as is. This page is used to inform visitors
				regarding our policies with the collection, use, and disclosure of
				Personal Information if anyone decided to use our Service. If you choose
				to use our Service, then you agree to the collection and use of
				information in relation to this policy. The Personal Information that we
				collect is used for providing and improving the Service. We will not use
				or share your information with anyone except as described in this
				Privacy Policy. The terms used in this Privacy Policy have the same
				meanings as in our Terms and Conditions, which is accessible at BR Food
				unless otherwise defined in this Privacy Policy.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Information Collection and Use
			</Typography>

			<Typography variant="subtitle2" gutterBottom>
				For a better experience, while using our Service, we may require you to
				provide us with certain personally identifiable information. The
				information that we request will be retained by us and used as described
				in this privacy policy. The app does use third party services that may
				collect information used to identify you. Link to privacy policy of
				third party service providers used by the app
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Log Data
			</Typography>

			<Typography variant="subtitle3" gutterBottom>
				We want to inform you that whenever you use our Service, in a case of an
				error in the app we collect data and information (through third party
				products) on your phone called Log Data. This Log Data may include
				information such as your device Internet Protocol (“IP”) address, device
				name, operating system version, the configuration of the app when
				utilizing our Service, the time and date of your use of the Service, and
				other statistics.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Cookies
			</Typography>
			<Typography variant="subtitle4" gutterBottom>
				Cookies are files with a small amount of data that are commonly used as
				anonymous unique identifiers. These are sent to your browser from the
				websites that you visit and are stored on your device's internal memory.
				This Service does not use these “cookies” explicitly. However, the app
				may use third party code and libraries that use “cookies” to collect
				information and improve their services. You have the option to either
				accept or refuse these cookies and know when a cookie is being sent to
				your device. If you choose to refuse our cookies, you may not be able to
				use some portions of this Service.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Service Providers
			</Typography>

			<Typography variant="subtitle2" display="block" gutterBottom>
				We may employ third-party companies and individuals due to the following
				reasons: To facilitate our Service; To provide the Service on our
				behalf; To perform Service-related services; or To assist us in
				analyzing how our Service is used. We want to inform users of this
				Service that these third parties have access to your Personal
				Information. The reason is to perform the tasks assigned to them on our
				behalf. However, they are obligated not to disclose or use the
				information for any other purpose.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Security
			</Typography>

			<Typography variant="subtitle2" display="block" gutterBottom>
				We value your trust in providing us your Personal Information, thus we
				are striving to use commercially acceptable means of protecting it. But
				remember that no method of transmission over the internet, or method of
				electronic storage is 100% secure and reliable, and we cannot guarantee
				its absolute security.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Links to Other Sites
			</Typography>

			<Typography variant="subtitle2" display="block" gutterBottom>
				This Service may contain links to other sites. If you click on a
				third-party link, you will be directed to that site. Note that these
				external sites are not operated by us. Therefore, we strongly advise you
				to review the Privacy Policy of these websites. We have no control over
				and assume no responsibility for the content, privacy policies, or
				practices of any third-party sites or services.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Changes to This Privacy Policy
			</Typography>

			<Typography variant="subtitle2" display="block" gutterBottom>
				We may update our Privacy Policy from time to time. Thus, you are
				advised to review this page periodically for any changes. We will notify
				you of any changes by posting the new Privacy Policy on this page. These
				changes are effective immediately after they are posted on this page.
			</Typography>

			<Typography variant="h6" component="h6" gutterBottom>
				Contact Us
			</Typography>

			<Typography variant="subtitle2" display="block" gutterBottom>
				If you have any questions or suggestions about our Privacy Policy, do
				not hesitate to contact us at email: developerbrsoft1@gmail.com
			</Typography>
		</div>
	);
}

// });
// PrivacyAndPolicyGlobalUrl.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// function mapStateToProps({ response }) {
//     return response;
// }

// export default connect(mapStateToProps, {})(withStyles(styles)(PrivacyAndPolicyGlobalUrl))
