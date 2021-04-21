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
	},
});

export default function PrivacyAndPolicy() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography
				variant="h6"
				component="h6"
				gutterBottom
				style={{ marginTop: 40 }}>
				Br Food Privacy Policy
			</Typography>

			<Typography variant="subtitle1" gutterBottom>
				Br Food ("Br Food ," the "Company," "we," "us," and "our,") respect your
				privacy and is committed to protecting it through its compliance with
				its privacy policies. This policy describes: the types of information
				that Br Food may collect from you when you access or use its websites,
				applications and other online services (collectively, referred
				as "Services"); and its practices for collecting, using, maintaining,
				protecting and disclosing that information.
			</Typography>

			<Typography variant="subtitle1" gutterBottom>
				This policy applies only to the information Br Food collects through its
				Services, in email, text and other electronic communications sent
				through or in connection with its Services. This policy DOES NOT apply
				to information that you provide to, or that is collected by, any
				third-party, such as restaurants at which you make reservations and/or
				pay through Br Food 's Services and social networks that you use in
				connection with its Services. Br Food encourages you to consult directly
				with such third-parties about their privacy practices. Please read this
				policy carefully to understand Br Food ’s policies and practices
				regarding your information and how Br Food will treat it. By accessing
				or using its Services and/or registering for an account with Br Food ,
				you agree to this privacy policy and you are consenting to Br Food 's
				collection, use, disclosure, retention, and protection of your personal
				information as described here. If you do not provide the information Br
				Food requires, Br Food may not be able to provide all of its Services to
				you. If you reside in any other part of the world, Br Food , located at,
				Vantmure Corner, Miraj Sangli Raod, Miraj – 416410 Maharashtra, India
				will be the controller of your personal data provided to, or collected
				by or for, or processed in connection with our Services. Your data
				controller is responsible for the collection, use, disclosure,
				retention, and protection of your personal information in accordance
				with its privacy standards as well as any applicable national laws. Your
				data controller may transfer data to other members of Br Food as
				described in this Privacy Policy. Br Food may process and retain your
				personal information on its servers in India where its data centers are
				located, and/or on the servers of its third parties, having contractual
				relationships with Br Food . This policy may change from time to time,
				your continued use of Br Food 's Services after it makes any change is
				deemed to be acceptance of those changes, so please check the policy
				periodically for updates. The information we collect and how we use it
				 How we use the information we collect  How we share the information we
				collect  Analytics and tailored advertising  Choices about how we use
				and disclose your information  Communication choices  Reviewing,
				changing or deleting information  Accessing &amp; correcting your
				personal information  Security: How we protect your information
				 Permissible Age  Third party links and services  California privacy
				rights  EU privacy/data protection rights  Data retention and account
				termination  Job applicants  Changes to this privacy policy
			</Typography>

			<Typography variant="subtitle3" gutterBottom>
				<br />
				<h6>Contact us</h6>
				If you have any queries relating to the processing/ usage of information
				provided by you or Br Food 's Privacy Policy, you may email the Data
				Protection Officer (DPO) at  Brfood@gmail.com or write to us at the
				following address.
				<br />
				<br />
				Br Food ,
				<br />
				Vantmure Corner, Miraj-Sangli Road,
				<br />
				Miraj-416410
				<br />
				Maharashtra.
				<br /> India
				<br />
				0233-2221120/50, <a href="tel:">8888907907</a>,
				<a href="tel:">9175967002</a>,<a href="tel:">9022614385</a>
			</Typography>
		</div>
	);
}

// });
// PrivacyAndPolicy.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// function mapStateToProps({ response }) {
//     return response;
// }

// export default connect(mapStateToProps, {})(withStyles(styles)(PrivacyAndPolicy))
