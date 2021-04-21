/** @format */

import React, { Fragment } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
	Widget,
	addResponseMessage,
	addLinkSnippet,
	addUserMessage,
} from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import BaseComponent from "../../common/BaseComponent";
//import logo from './logo.svg';
import * as StringKeys from "../../res/StringKeys";
import CommonButton from "../../common/CommonButton";

class ChatApp extends BaseComponent {
	componentDidMount() {
		addResponseMessage("Welcome to this awesome chat!");
	}

	handleNewUserMessage = (newMessage) => {
		console.log(`New message incoming! ${newMessage}`);
		// Now send the message throught the backend API
	};

	// state = {
	//     about: ''
	// }
	getCustomLauncher = (handleToggle) => {
		console.log("handleToggle ::: ", handleToggle);
	};

	render() {
		console.log("ffh : ", this.props.launcher);

		const { classes } = this.props;
		return (
			<Fragment>
				<div div className={classes.appBarSpacer} />
				<h3>TERMS AND CONDITION</h3>
				<h3>I. Acceptance of terms</h3>
				<br />
				Thank you for using Br Food . These Terms of Service (the
				&quot;Terms&quot;) are intended to make you aware of your legal rights
				and responsibilities with respect to your access to and use of the Br
				Food website at www.Br Food .com (the &quot;Site&quot;) and any related
				mobile or software applications (&quot;Br Food Platform&quot;) including
				but not limited to delivery of information via the website whether
				existing now or in the future that link to the Terms (collectively, the
				&quot;Services&quot;).
				<br />
				<br />
				<br />
				<strong>
					<em>
						These Terms are effective for all existing and future Br Food users,
						including but without limitation to users having access to
						&#39;restaurant business page&#39; to manage their claimed business
						listings.
					</em>
				</strong>
				<br />
				<br />
				<br />
				<em>
					Please read these Terms carefully. By accessing or using the Br Food
					Platform, you are agreeing to these Terms and concluding a legally
					binding contract with Br Food and/or its affiliates or, hereinafter
					collectively referred to as &quot;Br Food &quot;. You may not use the
					Services if you do not accept the Terms or are unable to be bound by
					the Terms. Your use of the Br Food Platform is at your own risk,
					including the risk that you might be exposed to content that is
					objectionable, or otherwise inappropriate.
				</em>
				<ul>
					<li>
						Clicking to accept or agree to the Terms, where it is made available
						to you by Br Food in the user interface for any particular Service;
						or
					</li>
					<li>
						Actually using the Services. In this case, you understand and agree
						that Br Food will treat your use of the Services as acceptance of
						the Terms from that point onwards.
					</li>
				</ul>
				<h3>II. Definitions</h3>
				<h5>user</h5>
				<p>
					&quot;User&quot; or &quot;You&quot; or &quot;Your&quot; refers to you,
					as a user of the Services. A user is someone who accesses or uses the
					Services for the purpose of sharing, displaying, hosting, publishing,
					transacting, or uploading information or views or pictures and
					includes other persons jointly participating in using the Services
					including without limitation a user having access to &#39;restaurant
					business page&#39; to manage claimed business listings or otherwise.
				</p>
				{this.props.value}
				<h5>content</h5>
				<p>
					&quot;Content&quot; will include (but is not limited to) reviews,
					images, photos, audio, video, location data, nearby places, and all
					other forms of information or data. &quot;Your content&quot; or
					&quot;User Content&quot; means content that you upload, share or
					transmit to, through or in connection with the Services, such as
					likes, ratings, reviews, images, photos, messages, profile
					information, and any other materials that you publicly display or
					displayed in your account profile. &quot;Br Food Content&quot; means
					content that Br Food creates and make available in connection with the
					Services including, but not limited to, visual interfaces, interactive
					features, graphics, design, compilation, computer code, products,
					software, aggregate ratings, reports and other usage-related data in
					connection with activities associated with your account and all other
					elements and components of the Services excluding Your Content and
					Third Party Content. &quot;Third Party Content&quot; means content
					that comes from parties other than Br Food or its users and is
					available on the Services.
				</p>
				<h5>Restaurant(s)</h5>
				<p>
					&quot;Restaurant&quot; means Br Food and any related mobile or
					software applications of Br Food .
				</p>
				<h5>store</h5>
				<p>
					&quot;Store&quot; means Br Food Grocery App and any related mobile or
					software applications of Br Food .
				</p>
				<h3>III. Eligibility to use the services</h3>
				<p>
					<ol>
						<li>
							You hereby represent and warrant that you are at least eighteen
							(18) years of age or above and are fully able and competent to
							understand and agree the terms, conditions, obligations,
							affirmations, representations, and warranties set forth in these
							Terms.
						</li>
						<li>
							Compliance with Laws. You are in compliance with all laws and
							regulations in the country in which you live when you access and
							use the Services. You agree to use the Services only in compliance
							with these Terms and applicable law, and in a manner that does not
							violate our legal rights or those of any third party(ies).
						</li>
					</ol>
				</p>
				<h3>IV. Changes to the terms</h3>
				<p>
					&nbsp; &nbsp;&nbsp;&nbsp;Br Food may vary or amend or change or update
					these Terms, from time to time entirely at its own discretion. You
					shall be responsible for checking these Terms from time to time and
					ensure continued compliance with these Terms. Your use of Br Food
					Platform after any such amendment or change in the Terms shall be
					deemed as your express acceptance to such amended/changed terms and
					you also agree to be bound by such changed/amended Terms.
				</p>
				<h3>V. Provision of the services being offered by Br Food </h3>
				<ol>
					<li>
						Br Food is constantly evolving in order to provide the best possible
						experience and information to its users. You acknowledge and agree
						that the form and nature of the Services which Br Food provides, may
						require effecting certain changes in it, therefore, Br Food reserves
						the right to suspend/cancel, or discontinue any or all products or
						services at any time without notice, make modifications and
						alterations in any or all of its contents, products and services
						contained on the site without any prior notice.
					</li>
					<li>
						We, the software, or the software application store that makes the
						software available for download may include functionality to
						automatically check for updates or upgrades to the software. Unless
						your device, its settings, or computer software does not permit
						transmission or use of upgrades or updates, you agree that we, or
						the applicable software or software application store, may provide
						notice to you of the availability of such upgrades or updates and
						automatically push such upgrade or update to your device or computer
						from time-to-time. You may be required to install certain upgrades
						or updates to the software in order to continue to access or use the
						Services, or portions thereof (including upgrades or updates
						designed to correct issues with the Services). Any updates or
						upgrades provided to you by us under the Terms shall be considered
						part of the Services.
					</li>
					<li>
						You acknowledge and agree that if Br Food disables access to your
						account, you may be prevented from accessing the Services, your
						account details or any files or other content, which is contained in
						your account.
					</li>
					<li>
						You acknowledge and agree that while Br Food may not currently have
						set a fixed upper limit on the number of transmissions you may send
						or receive through the Services, Br Food may set such fixed upper
						limits at any time, at Br Food &#39;s discretion.
					</li>
					<li>
						By using Br Food &#39;s Services you agree to the following
						disclaimers:
						<ul>
							<li>
								The Content on these Services is for informational purposes
								only. Br Food disclaims any liability for any information that
								may have become outdated since the last time the particular
								piece of information was updated. Br Food reserves the right to
								make changes and corrections to any part of the Content on these
								Services at any time without prior notice. Br Food does not
								guarantee quality of the Goods, the prices listed in menus or
								the availability of all menu items at the restaurant. Unless
								stated otherwise, all pictures and information contained on
								these Services are believed to be owned by or licensed to Br
								Food . Please email a takedown request (by using the
								&quot;Contact Us&quot; link on the home page) to the webmaster
								if you are the copyright owner of any Content on these Services
								and you think the use of the above material violates Your
								copyright in any way. Please indicate the exact URL of the
								webpage in your request. All images shown here have been
								digitized by Br Food . No other party is authorized to reproduce
								or republish these digital versions in any format whatsoever
								without the prior written permission of Br Food .
							</li>
							<li>
								Any certification, licenses or permits
								(&quot;Certification&quot;) or information in regard to such
								Certification that may be displayed on the Restaurant&#39;s
								listing page on the Platform is for informational purposes only.
								Br Food does not make any warranties about the validity,
								authenticity, reliability and accuracy of such Certification or
								any information displayed in this regard. Any reliance by a user
								upon the Certification or information thereto shall be strictly
								at such user&#39;s own risk and Br Food in no manner shall
								assume any liability whatsoever for any losses or damages in
								connection with the use of this information or for any
								inaccuracy, invalidity or discrepancy in the Certification or
								non-compliance of any applicable local laws or regulations by
								the Restaurant partner.
							</li>
						</ul>
					</li>
					<li>
						Br Food reserves the right to charge a subscription and/or
						membership and/or a convenience fees from a user, by giving
						reasonable prior notice, in respect of any product, service or any
						other aspect of the Br Food Platform anytime in future.
					</li>
					<li>
						Br Food may from time to time introduce referral and/or incentive
						based programs for its users (Program). These Program(s) maybe
						governed by their respective terms and conditions. By participating
						in the Program, Users are bound by the Program terms and conditions
						as well as the Br Food Platform terms. Further, Br Food reserves the
						right to terminate / suspend the User&#39;s account and/or credits /
						points earned and/or participation of the User in the Program if Br
						Food determines in its sole discretion that the User has violated
						the rules of the Program and/or has been involved in activities that
						are in contravention of the Program terms and/or Br Food Platform
						terms or has engaged in activities which are fraudulent / unlawful
						in nature. Furthermore, Br Food reserves the right to modify, cancel
						and discontinue its Program without notice to the User.
					</li>
				</ol>
				<h3>VI. Use of services by you or user</h3>
				<ol>
					<li>
						{" "}
						<strong>Br Food User Account Access</strong>
						<ol type="a">
							<li>
								You must create an account in order to use some of the features
								offered by the Services, including without limitation to
								&#39;claim your business listing&#39; on the Services. Use of
								any personal information you provide to us during the account
								creation process is governed by our Privacy Policy. You must
								keep your password confidential and you are solely responsible
								for maintaining the confidentiality and security of your
								account, all changes and updates submitted through your account,
								and all activities that occur in connection with your account.
							</li>
							<li>
								You may also be able to register to use the Services by logging
								into your account with your credentials from certain third party
								social networking sites (e.g., Facebook). You confirm that you
								are the owner of any such social media account and that you are
								entitled to disclose your social media login information to us.
								You authorize us to collect your authentication information, and
								other information that may be available on or through your
								social media account consistent with your applicable settings
								and instructions.
							</li>
							<li>
								In creating an account, you represent to us that all information
								provided to us in such process is true, accurate and correct,
								and that you will update your information as and when necessary
								in order to keep it accurate. You may not impersonate someone
								else, create or use an account for anyone other than yourself,
								provide an email address other than your own, or provide or use
								false information to obtain access on the Services that you are
								not legally entitled to claim. You acknowledge that any false
								claiming may cause Br Food to incur substantial economic damages
								and losses for which you may be held liable and accountable.
							</li>
							<li>
								You are also responsible for all activities that occur in your
								account. You agree to notify us immediately of any unauthorized
								use of your account in order to enable us to take necessary
								corrective action. You also agree that you will not allow any
								third party to use your Br Food account for any purpose and that
								you will be liable for such unauthorized access.
							</li>
							<li>
								By creating an account, you agree to receive certain
								communications in connection with Br Food Platform or Services.
								For example, you might receive comments from other Users or
								other users may follow the activity to do on your account. You
								can opt-out or manage your preferences regarding non- essential
								communications through account settings.
							</li>
						</ol>
					</li>
					<li>
						<strong>Others Terms</strong>
						<ol type="a">
							<li>
								You agree to use the Services only for purposes that are
								permitted by{" "}
								<strong>(a) the Terms and (b) any applicable law,</strong>
								regulation or generally accepted practices or guidelines in the
								relevant jurisdictions.
							</li>
							<li>
								You agree to use the data owned by Br Food (as available on the
								Services or through any other means like API etc.) only for
								personal use/purposes and not for any commercial use (other than
								in accordance with &#39;Claim Your Business Listing&#39; access)
								unless agreed to by/with Br Food in writing.
							</li>
							<li>
								You agree not to access (or attempt to access) any of the
								Services by any means other than the interface that is provided
								by Br Food , unless you have been specifically allowed to do so,
								by way of a separate agreement with Br Food . You specifically
								agree not to access (or attempt to access) any of the Services
								through any automated means (including use of scripts or web
								crawlers) and shall ensure that you comply with the instructions
								set out in any robots.txt file present on the Services.
							</li>
							<li>
								You agree that you will not engage in any activity that
								interferes with or disrupts the Services (or the servers and
								networks which are connected to the Services). You shall not
								delete or revise any material or information posted by any other
								User(s), shall not engage in spamming, including but not limited
								to any form of emailing, posting or messaging that is
								unsolicited.
							</li>
						</ol>
					</li>
				</ol>
				<h3>VII. Content</h3>
				<ul>
					<li>
						<strong>Ownership of Br Food Content and Proprietary Rights</strong>
						<ol type="a">
							<li>
								We are the sole and exclusive copyright owners of the Services
								and our Content. We also exclusively own the copyrights,
								trademarks, service marks, logos, trade names, trade dress and
								other intellectual and proprietary rights throughout the world
								(the &quot;IP Rights&quot;) associated with the Services and Br
								Food Content, which may be protected by copyright, patent,
								trademark and other applicable intellectual property and
								proprietary rights and laws. You acknowledge that the Services
								contain original works and have been developed, compiled,
								prepared, revised, selected, and arranged by us and others
								through the application of methods and standards of judgment
								developed and applied through the expenditure of substantial
								time, effort, and money and constitutes valuable intellectual
								property of us and such others. You further acknowledge that the
								Services may contain information which is designated as
								confidential by Br Food and that you shall not disclose such
								information without Br Food &#39;s prior written consent.
							</li>
							<li>
								You agree to protect Br Food &#39;s proprietary rights and the
								proprietary rights of all others having rights in the Services
								during and after the term of this agreement and to comply with
								all reasonable written requests made by us or our suppliers and
								licensors of content or otherwise to protect their and
								others&#39; contractual, statutory, and common law rights in the
								Services. You acknowledge and agree that Br Food (or Br Food
								&#39;s licensors) own all legal right, title and interest in and
								to the Services, including any IP Rights which subsist in the
								Services (whether those rights happen to be registered or not,
								and wherever in the world those rights may exist). You further
								acknowledge that the Services may contain information which is
								designated as confidential by Br Food and that you shall not
								disclose such information without Br Food &#39;s prior written
								consent. Unless you have agreed otherwise in writing with Br
								Food , nothing in the Terms gives you a right to use any of Br
								Food &#39;s trade names, trademarks, service marks, logos,
								domain names, and other distinctive brand features.
							</li>
							<li>
								You agree not to use any framing techniques to enclose any
								trademark or logo or other proprietary information of Br Food ;
								or remove, conceal or obliterate any copyright or other
								proprietary notice or source identifier, including without
								limitation, the size, colour, location or style of any
								proprietary mark(s). Any infringement shall lead to appropriate
								legal proceedings against you at appropriate forum for seeking
								all available/possible remedies under applicable laws of the
								country of violation. You cannot modify, reproduce, publicly
								display or exploit in any form or manner whatsoever any of the
								Br Food &#39;s Content in whole or in part except as expressly
								authorized by Br Food .
							</li>
							<li>
								To the fullest extent permitted by applicable law, we neither
								warrant nor represent that your use of materials displayed on
								the Services will not infringe rights of third parties not owned
								by or affiliated with us. You agree to immediately notify us
								upon becoming aware of any claim that the Services infringe upon
								any copyright trademark, or other contractual, intellectual,
								statutory, or common law rights by following the instructions
							</li>
						</ol>
					</li>
				</ul>
				<h3>VIII. Content guidelines and privacy policy</h3>
				<ol>
					<li>
						Content Guidelines
						<p>
							You represent that you have read, understood and agreed to
							our Guidelines and Polices related to Content
						</p>
					</li>
					<li>
						Privacy Policy
						<p>
							You represent that you have read understood and agreed to
							our Privacy Policy. Please note that we may disclose information
							about you to third parties or government authorities if we believe
							that such a disclosure is reasonably necessary to
						</p>
						<ol type="i">
							<li>take action regarding suspected illegal activities;</li>
							<li>enforce or apply our Terms and Privacy Policy</li>
							<li>
								comply with legal process or other government inquiry, such as a
								search warrant, subpoena, statute, judicial proceeding, or other
								legal process/notice served on us; or
							</li>
							<li>
								protect our rights, reputation, and property, or that of our
								users, affiliates, or the general public
							</li>
						</ol>
						<ol type="a">
							<li>
								You hereby agree and assure Br Food that the Br Food
								Platform/Services shall be used for lawful purposes only and
								that you will not violate laws, regulations, ordinances or other
								such requirements of any applicable Central, Federal State or
								local government or international law(s). You shall not upload,
								post, email, transmit or otherwise make available any
								unsolicited or unauthorized advertising, promotional materials,
								junk mail, spam mail, chain letters or any other form of
								solicitation, encumber or suffer to exist any lien or security
								interest on the subject matter of these Terms or to make any
								representation or warranty on behalf of Br Food in any form or
								manner whatsoever.
							</li>
							<li>
								Any Content uploaded by you, shall be subject to relevant laws
								of India and of the country of use and may be disabled, or and
								may be subject to investigation under applicable laws. Further,
								if you are found to be in non-compliance with the laws and
								regulations, these terms, or the privacy policy of the Br Food
								Platform, Br Food shall have the right to immediately block your
								access and usage of the Br Food Platform and Br Food shall have
								the right to remove any non-compliant content and or comment
								forthwith, uploaded by you and shall further have the right to
								take appropriate recourse to such remedies as would be available
								to it under various statutes.
							</li>
						</ol>
					</li>
				</ol>
				<h3>IX. User feedback</h3>
				<ol>
					<li>
						If you share or send any ideas, suggestions, changes or documents
						regarding Br Food &#39;s existing business (&quot;Feedback&quot;),
						you agree that (i) your Feedback does not contain the confidential,
						secretive or proprietary information of third parties, (ii) Br Food
						is under no obligation of confidentiality with respect to such
						Feedback, and shall be free to use the Feedback on an unrestricted
						basis (iii) Br Food may have already received similar Feedback from
						some other user or it may be under consideration or in development,
						and (iv) By providing the Feedback, you grant us a binding,
						non-exclusive, royalty-free, perpetual, global license to use,
						modify, develop, publish, distribute and sublicense the Feedback,
						and you irrevocably waive, against Br Food and its users any
						claims/assertions, whatsoever of any nature, with regard to such
						Feedback.
					</li>
					<li>
						Please provide only specific Feedback on Br Food &#39;s existing
						products or marketing strategies; do not include any ideas that Br
						Food &#39;s policy will not permit it to accept or consider.
					</li>
					<li>
						The purpose of this policy is to avoid potential misunderstandings
						or disputes when Br Food &#39;s products or marketing strategies
						might seem similar to ideas submitted to Br Food . If, despite our
						request to not send us your ideas, you still submit them, then
						regardless of what your letter says, the following terms shall apply
						to your Submissions.
					</li>
				</ol>
				<h3>
					X. Additional Terms and Conditions for Users using the various
					services offered by Br Food :
				</h3>
				<ol>
					<li>
						ONLINE GROCERY ORDERING:
						<ol>
							<li>
								Br Food provides online ordering services by entering into
								contractual arrangements with Stores (as defined below) on a
								principal-to-principal basis for the purpose of listing their
								menu items or the Products (as defined below) for online
								ordering by the Users on the Br Food Platform.
							</li>
							<li>
								The Users can access the menu items or Products listed on the Br
								Food Platform and place online orders against the Restaurant
								/Store(s) through Br Food .
							</li>
							<li>
								Your request to order food and beverages or Products from a
								Restaurant or a Store on the Restaurant /Store page on the Br
								Food Platform shall constitute an unconditional and irrevocable
								authorization issued in favour of Br Food to place online orders
								for food and beverages or Products against the Restaurant
								/Store(s) on your behalf.
							</li>
							<li>
								Delivery of an order placed by you through the Br Food Platform
								may be undertaken directly by Br Food through third-party who
								may be available to provide delivery services to you (“Delivery
								Partners”). In case of Groceries Br Food is merely acting as an
								intermediary between you and the Delivery Partners, or you and
								the Store, as the case may be.
							</li>
							<li>
								GROCERY, Where Br Food is facilitating delivery of an order
								placed by you, Br Food shall not be liable for any acts or
								omissions on part of the Delivery Partner including deficiency
								in service, wrong delivery of order, time taken to deliver the
								order, order package tampering, etc.
							</li>
							<li>
								You may be charged a delivery fee for delivery of your order by
								the Delivery Partner or the Store, as the Delivery Partner or
								the Store may determine (“Delivery Charges&quot;). You agree
								that Br Food is authorized to collect, on behalf of the Delivery
								Partner or the Store, the Delivery Charges for the delivery
								service provided by the Store or the Delivery Partner, as the
								case may be. The Delivery Charges may vary from order to order,
								which may be determined on multiple factors which shall include
								but not be limited to Restaurant Partner / Store, order value,
								distance, demand during peak hours. Br Food will use reasonable
								efforts to inform you of the Delivery Charges that may apply to
								you, provided you will be responsible for Delivery Charges
								incurred for your order regardless of your awareness of such
								Delivery Charges.
							</li>
						</ol>
						<ol type="A">
							<li>
								Br Food Ordering
								<ol type="a">
									<li>
										Br Food operates an online marketplace under the name and
										style “Br Food Mall” and provides online ordering services
										by entering into contractual arrangements with third-party
										wholesale and retail Store(s) (“Store(s)”), dealing in
										various consumer products including but not limited to
										groceries (“Products”) on a principal-to-principal basis for
										the purpose of listing their Products for online ordering by
										the Users on the Br Food Platform.
									</li>
									<li>
										Br Food disclaims all warranties and liabilities associated
										with any Product offered under Br Food platform.
									</li>
									<li>
										Services are available to only select geographies, and are
										subject to restrictions based on business hours and days of
										the Store(s)
									</li>
									<li>
										All Products listed on the Platform will be sold at MRP
										unless otherwise specified. The prices listed on the Br Food
										Platform are as received from the Store(s). The final price
										charged to you by the Store(s) may change at the time of
										delivery. In the event of a conflict between price on the Br
										Food Platform and price charged by the Store(s), the price
										charged by the Store(s) shall be deemed to be the correct
										price except Delivery Charge of Br Food . In case the prices
										are higher or lower on the date of delivery, additional
										charges will be collected or refunded as the case may be at
										the time of the delivery of the order.
									</li>
								</ol>
							</li>
							<li>
								General Issues
								<ol type="a">
									<li>
										For the users in India, it is hereby clarified by Br Food
										that the liability of any violation of the applicable rules
										and regulations made thereunder shall solely rest with the
										sellers/brand owners, vendors, Restaurant
										Partner(s)/Store(s), importers or manufacturers of the food
										products, Products or any Pre Packed Goods accordingly. For
										the purpose of clarity Pre-Packed Goods shall mean the food
										and beverages items which is placed in a package of any
										nature, in such a manner that the contents cannot be changed
										without tampering it and which is ready for sale to the
										customer or as may be defined under the Food Safety and
										Standards Act, 2006 from time to time.
									</li>
									<li>
										Please note that some of the food and beverages or Products
										may be suitable for certain ages only. You should check the
										dish you are ordering and read its description, if provided,
										prior to placing your order. Br Food shall not be liable in
										the event the food and beverages or the Product ordered by
										You does not meet your dietary or any other requirements
										and/or restrictions.
									</li>
									<li>
										While placing an order you shall be required to provide
										certain details, including without limitation, contact
										number and delivery address. You agree to take particular
										care when providing these details and warrant that these
										details are accurate and complete at the time of placing an
										Order. By providing these details, you express your
										acceptance to Br Food &#39;s terms and privacy policies.
									</li>
									<li>
										You or any person instructed by you shall not resell food
										and beverages or Products purchased via the Br Food
										Platform.
									</li>
									<li>
										The total price for food ordered, including the Delivery
										Charges and other charges, will be displayed on the Br Food
										Platform when you place your order, which may be rounded up
										to the nearest amount. Users shall make full payment towards
										such food or Products ordered via the Br Food Platform.
									</li>
									<li>
										Any amount that may be charged to you by Br Food over and
										above the order value, shall be inclusive of applicable
										taxes.
									</li>
									<li>
										Delivery periods/Takeaway time quoted at the time of
										ordering are approximate only and may vary.
									</li>
									<li>
										Personal Promo code can only be used by You subject to such
										terms and conditions set forth by Br Food from time to time.
									</li>
								</ol>
							</li>
						</ol>
						<ol type="i">
							<li>
								Cancellation and refund policy:
								<ol type="i">
									<li>
										You acknowledge that your cancellation, or attempted or
										purported cancellation of an Order shall amount to breach of
										your unconditional and irrevocable authorization in favour
										of Br Food to place that Order against the Restaurant
										Partners/Store(s) on your behalf (“Authorization
										Breach&quot;). In the event you commit an Authorization
										Breach, you shall be liable to pay the liquidated damages of
										an amount equivalent to the Order Value. You hereby
										authorize Br Food to deduct or collect the amount payable as
										liquidated damages through such means as Br Food may
										determine in its discretion, including without limitation,
										by deducting such amount from any payment made towards your
										next Order
									</li>
									<li>
										In the event You have provided incorrect particulars, e.g.,
										contact number, delivery address etc., or that You were
										unresponsive, not reachable or unavailable for fulfillment
										of the services offered to You, You will not be eligible for
										any refunds.
									</li>
									<li>
										No replacement / refund / or any other resolution will be
										provided without Br Food Mall’s permission.
									</li>
									<li>
										Any complaint, with respect to the Order which shall include
										instances but not be limited to food spillage, foreign
										object in food, delivery of the wrong order or food and
										beverages or Products, poor quality, You will be required to
										share the proof of the same before any resolution can be
										provided.
									</li>
									<li>
										You shall not be entitled to a refund in case instructions
										placed along with the Order are not followed in the form and
										manner You had intended. Instructions are followed by the Br
										Food on a best-efforts basis.
									</li>
									<li>
										All refunds shall be processed in the same manner as they
										are received, unless refunds have been provided to you in
										the form of credits, refund amount will reflect in your
										account based on respective banks policies.
									</li>
								</ol>
							</li>
						</ol>
					</li>
					<li>
						BOOK SERVICE/TABLE RESERVATIONS:
						<ol>
							<li>
								The user can make a request for booking a table at a restaurant,
								offering table reservation via the Br Food Platform and related
								mobile or software application and such booking will be
								confirmed to a user by email, short message service
								(&quot;SMS&quot;) and/or by any other means of communication
								only after the restaurant accepts and confirms the booking. The
								availability of a booking is determined at the time a user
								requests for a table reservation. While using the Br Food Book
								Service, you shall be required to provide certain details, You
								agree to provide correct details and warrant that these details
								are accurate and complete. By submitting a booking request, you
								express your acceptance to Br Food &#39;s terms and privacy
								policies and agree to receive booking confirmations by email SMS
								and/or by any other means of communication after booking a table
								through the Br Food Book Service. User further agrees not to
								make more than one reservation for user&#39;s personal use for
								the same mealtime.
							</li>

							<li>
								Fees: Br Food may charge booking fee (&quot;Booking Fee&quot;)
								from the user upon availing the Br Food Book Service. This
								Booking Fee shall be adjusted by the restaurant against the
								total bill for the items consumed by the user at such
								restaurant. Any balance amount remaining to be paid after
								deduction of the Booking Fee from the restaurant bill shall be
								payable by the user. The user shall also be liable to pay any
								additional charges and/or applicable taxes that may be
								applicable to the transaction. In the event of any change in the
								amount of the Booking Fee after the payment is made by the user,
								the amount of the Booking Fee already paid by the user will be
								applicable. The user may be required to furnish the payment
								instrument at the restaurant from which payment has been made
								for identification purposes.
							</li>

							<li>
								Modifications &amp; Cancellations: Any request for modification
								of the confirmed booking will be subject to acceptance of the
								same by Br Food . Br Food will use its best endeavours to keep
								the user informed of the status of the booking. For bookings
								where Booking Fee is not applicable, the user may cancel such
								booking Sixty (60) minutes in advance from the scheduled booking
								time. A confirmed booking for which Booking Fee has been charged
								from a user, modification option will not be available, however
								the user is required to cancel the confirmed booking twenty-four
								(24) hours prior to the scheduled booking time to avail the
								refund. Unless otherwise provided herein these Terms, Br Food
								shall refund the Booking Fee to the user within seven (7)
								working days from the date of such cancellation. However, Br
								Food reserves the right to retain the Booking Fee in the event
								the user fails to cancel the booking within the estimated
								timeframe mentioned herein above.
							</li>

							<li>
								Late Arrivals: Br Food advises the users to arrive 10 minutes in
								advance of the scheduled booking time. The restaurant reserves
								the right to cancel your booking and allocate the table to other
								guests in case of late arrivals and Br Food shall in no manner
								be liable for such cancellation initiated by the Restaurant. Br
								Food hereby reserves its right to retain the Booking Fee paid by
								the users, in the event the user is late by more than 10 minutes
								from the scheduled booking time and/or fails to show up at the
								restaurant.
							</li>
							<li>
								Dispute: In the event the restaurant fails to honour the
								confirmed booking or in case of any other complaint or dispute
								raised by the user in relation to the booking, the user shall
								raise such disputes with Br Food within 30 minutes from the
								scheduled booking time at the helpline numbers as provided
								herein below. Upon receipt of such complaint or dispute, Br Food
								will make reasonable efforts to verify the facts of such
								complaint/ dispute with the restaurant and may at its sole
								discretion initiate the refund of the Booking Fee to such user.
							</li>
							<li>
								Personal Information: Users will be required to share certain
								personal information with Br Food and/or the restaurant
								including but not limited to their name, phone number, email
								address in order to avail the Br Food Book Service and the user
								hereby permits Br Food to share such personal information with
								the restaurant for confirming such user&#39;s booking and/or
								such other communication relating to but not limited to the Br
								Food Book Service or any promotions by the restaurant. Br Food
								will use these details in accordance with the Privacy Policy
								published here. Br Food will share your personal information
								with the restaurant for the purpose of your reservation.
								However, notwithstanding anything otherwise set out herein, Br
								Food shall in no manner be liable for any use of your personal
								information by such restaurant for any purpose whatsoever.
							</li>
							<li>
								Additional Request: In the case of any additional request
								communicated by the user at the time of the booking, the same
								will be conveyed to the restaurant by Br Food and confirmed to
								the user basis restaurant&#39;s response. While Br Food will
								take all the care to ensure timely communication of these
								requests to both the user and the restaurant, the liability to
								fulfill the request lies solely with the restaurant and Br Food
								shall in no manner be liable if the restaurant does not honor
								any of the confirmed additional requests of the users.
							</li>
							<li>
								Call Recording: Br Food may contact via telephone, SMS or other
								electronic messaging or by email with information about your Br
								Food Book Service or any feedback thereon. Any calls that may be
								made by Br Food , by itself or through a third party, to the
								users or the restaurant pertaining to any booking requests of a
								user may be recorded for internal training and quality purposes
								by Br Food or any third party appointed by Br Food .
							</li>
							<li>
								Liability Limitation: Notwithstanding anything otherwise set out
								herein, Br Food shall in no manner be liable in any way for any
								in-person interactions with the restaurant as a result of the
								booking or for the User&#39;s experience at the restaurant or in
								the event a restaurant does not honor a confirmed booking.
							</li>
						</ol>
					</li>
				</ol>
				Contact Us: You may write to us at
				<a href="Brfoodmall@gmail.com">Brfoodmall@gmail.com </a> for any further
				queries with regard to the Br Food Book Service and may also contact us
				on the following numbers for more information:
				<br /> Br Food , <br />
				Vantmure Corner, Miraj-Sangli Road, Miraj-416410 Maharashtra, India
				0233-2221120/50, <a href="tel:8888907907">8888907907</a>,
				<a href="tel:9175967002">9175967002</a>,
				<a href="tel:9022614385">9022614385</a>
				<Widget
					handleNewUserMessage={() => this.handleNewUserMessage}
					//profileAvatar={logo}
					title="My new awesome title"
					subtitle="And my cool subtitle"
					showCloseButton={false}
					// handleQuickButtonClicked
				/>
			</Fragment>
		);
	}
}

const styles = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarSpacer: theme.mixins.toolbar,
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
	editorStyle: {
		borderColor: "red",
		borderWidth: 10,
		backgroungColor: "green",
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});
ChatApp.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(ChatApp));
