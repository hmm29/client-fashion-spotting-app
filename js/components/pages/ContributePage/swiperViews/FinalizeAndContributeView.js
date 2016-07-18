/**
 * FinalizeAndContributeView.js
 * Third page in Contribute swiper
 *
 * @providesModule FinalizeAndContributeView
 * @flow
 */

import React, { Component } from 'react'; 
import {
  Dimensions,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text, 
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

var { KDSocialShare } = NativeModules;
var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var FinalizeAndContributeView = React.createClass({
	getInitialState() {
		return {
			activeExcitingTags: ['Wow!'],
			excitingTags: [],
			input: 'I literally fell in love with this orangy shirt. Anthropologie made my day today!'
		}
	},

	componentWillMount() {
		this.getExcitingTags();
		this.getContributeSummary();
	},

	getContributeSummary() {
		this.setState({contributeSummary: {
			item: 'blouse',
			store: 'Anthropologie',
			location: 'Beverly Center, Los Angeles, CA'
		}});
	},

	getExcitingTags() {
		this.setState({excitingTags: ['New', 'Sale', 'Wow!', 'Unique']});
	},


	getButtonColor(buttonText) {
		return (this.state.activeExcitingTags.indexOf(buttonText) > -1 ? styles.activeButton : styles.inactiveButton)
	},

	handleToggleButtonState(buttonText) {
		var activeExcitingTagsArr = this.state.activeExcitingTags,
	    idx = activeExcitingTagsArr.indexOf(buttonText);

	    if (idx > -1) activeExcitingTagsArr.splice(idx, 1);
	    else activeExcitingTagsArr.push(buttonText);

	    this.setState({
	      activeExcitingTags: activeExcitingTagsArr
	    });
	},

	onShare(appName) {
		switch(appName) {
			case 'facebook':
				KDSocialShare.shareOnFacebook({
			        'text':'Global democratized marketplace for art',
			        'link':'https://artboost.com/',
			        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
			        //or use image
			        'image': 'artboost-icon',
			      },
			      (results) => {
			        console.log(results);
			      }
			    );
			case 'twitter':
				KDSocialShare.tweet({
			        'text':'Global democratized marketplace for art',
			        'link':'https://artboost.com/',
			        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
			        //or use image
			        'image': 'artboost-icon',
			      },
			      (results) => {
			        console.log(results);
			      }
			    );
		}
	},

	render() {
		const { item, store, location } = this.state.contributeSummary;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>FINALIZE AND CONTRIBUTE</Text>
				<View style={[styles.section, {left: -(width/10)}]}>
					<View style={styles.contributeSummary}>
						<Image source={require('../../../partials/icons/contribute/img/contribute-summary-test-photo.png')} style={styles.contributeSummaryPhoto} />
						<View style={styles.rightContainer}>
							<Text style={styles.contributeSummaryText}>
								This <Text style={styles.underline}>{item}</Text> was spotted at <Text style={styles.underline}>{store}</Text> in <Text style={styles.underline}>{location}</Text>.
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>WHY I'M SPOTTING IT:</Text>
				<TextInput
			        multiline = {true}
			        editable = {true}
			        maxLength = {40}
			        onChangeText={(input) => this.setState({input})}
        			value={this.state.input}
			        style={styles.multilineTextInput}
			      />
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>WHAT I FIND EXCITING ABOUT IT:</Text>
				<ScrollView
					  automaticallyAdjustContentInsets={false}
		              contentContainerStyle={styles.scrollView}
		              showsHorizontalScrollIndicator={false}
		              horizontal={true}
		              directionalLockEnabled={true}>
					{this.state.excitingTags && this.state.excitingTags.map((excitingTag, i) => (
		                <TouchableOpacity key={i} onPress={() => {
		                	this.handleToggleButtonState(excitingTag);
		                	this.props.handleShowNextButton(true, 'Contribute', () => {
		                		alert('done');
		                	});
		                }} style={[styles.excitingTag, this.getButtonColor(excitingTag)]}><Text
		                  style={styles.excitingTagText}>{excitingTag && excitingTag.toUpperCase()}</Text>
		                 </TouchableOpacity>
		              ))}
	             </ScrollView>
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>SHARE ALSO ON:</Text>
					<View style={styles.shareIconsContainer}>
						<TouchableOpacity onPress={() => {
							this.onShare('facebook');
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/share-facebook.png')} 
								style={styles.shareIcon} />
						</TouchableOpacity>
						<View style={styles.shareIconPartition} />
						<TouchableOpacity onPress={() => {
							this.onShare('pinterest');
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/share-pinterest.png')} 
								style={styles.shareIcon} />
						</TouchableOpacity>
						<View style={styles.shareIconPartition} />
						<TouchableOpacity onPress={() => {
							this.onShare('twitter');
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/share-twitter.png')} 
								style={styles.shareIcon} />
						</TouchableOpacity>
						<View style={styles.shareIconPartition} />
						<TouchableOpacity onPress={() => {
							this.onShare('snapchat');
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/share-snapchat.png')} 
								style={styles.shareIcon} />
						</TouchableOpacity>
						<View style={styles.shareIconPartition} />
						<TouchableOpacity onPress={() => {
							this.onShare('SMS')
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/share-SMS.png')} 
								style={styles.shareIcon} />
						</TouchableOpacity>
				</View>
				</View>
			</View>
		);
	}

});

const iconSize = height/25;
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};
const photoSize = height/8;

const styles = StyleSheet.create({
	activeButton: {
		backgroundColor: 'red'
	},
	autocompleteContainer: {

	},	
	autocompleteInput: {
		bottom: height/75,
	},
	autocompleteInputContainer: {
		borderWidth: 0,
	},
	category: {
		width: width/1.3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: height/85,
		borderBottomWidth: 1,
		borderColor: '#000',
		paddingBottom: height/85
	},
	categoryText: {
		fontWeight: 'bold'
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center', 
		height, 
		width,
	},
	contributeSummary: {
		width: width/1.03,
		backgroundColor: 'rgba(4,22,43,0.2)', 
		paddingHorizontal: height/20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contributeSummaryPhoto: {
		width: photoSize, 
		height: photoSize, 
		resizeMode: Image.resizeMode.stretch
	},
	contributeSummaryText: {
		fontSize: height/50
	},
	excitingTag: {
		backgroundColor: 'rgba(4,22,43,0.3)',
		paddingVertical: height/140,
		paddingHorizontal: width/20,
		marginHorizontal: width / 70,
	},
	excitingTagsBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	excitingTagText: {
		fontFamily: 'Avenir-Roman',
		color: '#fff',
		fontWeight: 'bold'
	},
	icon: {
		width: iconSize, 
		height: iconSize,
		resizeMode: Image.resizeMode.contain,
		margin: width / 70
	},
	multilineTextInput: {
		height: height/8,
		borderWidth: 2,
		borderColor: '#000',
		fontSize: height/45,
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	nextStepIcon: {
		width: iconSize/2,
		height: iconSize/2
	},
	rightContainer: {
		width: width/2,
		paddingHorizontal: 10,
		marginLeft: 15

	},
	scrollView: {

	},
	section: {
		width: width/1.3,
		marginVertical: height/45,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	sectionTitle: {
		marginBottom: height/45,
		fontSize: height/55
	},
	shareIconsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: width/1.3
	},
	shareIcon: {
		width: iconSize * 1.8, 
		height: iconSize * 1.8,
		resizeMode: Image.resizeMode.contain,
		margin: width/80,
	},
	shareIconPartition: {
		height: iconSize * 1.2,
		width: 1,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	storeSearchBar: {
		...border,
		width: width/1.3,
		height: height/15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'Avenir-Roman',
		marginBottom: height/45,
	},
	underline: {
		textDecorationLine: 'underline'
	}
});

module.exports = FinalizeAndContributeView;