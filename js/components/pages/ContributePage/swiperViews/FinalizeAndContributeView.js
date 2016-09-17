/**
 * FinalizeAndContributeView.js
 * Third page in Contribute swiper
 *
 * @providesModule FinalizeAndContributeView
 * @flow
 */

import React, { PropTypes, Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Communications from 'react-native-communications';
const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
} = FBSDK;

import uploadImage from '../helpers/uploadImage.js';

var { KDSocialShare } = NativeModules;
var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var FinalizeAndContributeView = React.createClass({
	getInitialState() {
		return {
			activeExcitingTag: "",
			excitingTags: [],
			input: '',
      modalVisible: false
		}
	},

	componentWillMount() {
		this.getExcitingTags();
		this.getContributeSummary();
	},

	getContributeSummary() {
    this.props.updateUploadData("finalizeAndContributeView", this.state);
	},

	getExcitingTags() {
		this.setState({excitingTags: ['New!', 'Fall!', 'Wow!', 'Unique!']}, function(){
      this.props.updateUploadData("finalizeAndContributeView", this.state);
    });
	},


	getButtonColor(buttonText) {
		return (this.state.activeExcitingTag === buttonText ? styles.activeButton : styles.inactiveButton)
	},

	handleToggleButtonState(buttonText) {
		this.setState({activeExcitingTag: buttonText});
	},

	onShare(app) {
    var self = this;

		switch(app) {
			case 'facebook':
            self.shareLinkWithShareDialog();
            break;
			case 'twitter':
				KDSocialShare.tweet({
              'text':'// Spotted with Eyespot app. Download yours for free!',
              'link':'https://eyes.pt/',
              'imagelink': this.props.imageData && this.props.imageData.imgSource && this.props.imageData.imgSource.uri,
			      },
			      (results) => {
			        console.log(results);
			      }
			    );
          break;
			case 'SMS':
        // FIXME: Apple does not allow for prefilled text messages, so can't add picture to pre-formatted text message :(
        // find a way to add picture to the text
				Communications.text(null, '// Spotted with Eyespot app. Download yours for free!\n' + 'https://eyes.pt/');
        break;
      default:
        Alert.alert('Coming Soon!', 'This share feature is not yet offered, but is coming soon!')
		}
	},

  shareLinkWithShareDialog() {
        // show loading modal to divert user while waiting for asynchronous uploadImage response
        this.setState({modalVisible: true});

        // FIXME: because imageUrl of shareLinkContent has to be an absolute url,
        // we need to upload to cloudinary in order to show it
        // this might cause duplicate photo uploading here and in upload function

        var self = this;
        uploadImage(self.props.imageData && self.props.imageData.imgSource && self.props.imageData.imgSource.uri, function(response){
          self.setState({modalVisible: false})
          const secure_img_url = response.secure_url;
          // Build up a shareable link.
          const shareLinkContent = {
            /**
             * The type of content to be shared is link.
             */
            contentType: 'link',

            /**
             * URL for the content being shared.
             */
            contentUrl: "https://eyes.pt/",

            /**
             * The Description of the link.
             * If not specified, this field is automatically populated by information scraped
             * from the contentURL,  typically the title of the page.
             */
            contentDescription: "// Spotted with Eyespot app. Download yours for free!",

            /**
             * The title to display for this link.
             */
            // contentTitle?: string,

            /**
             * The URL of a picture to attach to this comment.
             */
            imageUrl: secure_img_url,

            /**
             * The predefine quote to attacth to this comment.
             * If specified, the quote text will render with custom styling on top of the link.
             */
            // quote?: string,
          };

          // Share the link using the share dialog.
            ShareDialog.canShow(shareLinkContent).then(
              function(canShow) {
                if (canShow) {
                  return ShareDialog.show(shareLinkContent);
                }
              }
            ).then(
              function(result) {
                if (result.isCancelled) {
                  console.log('Share cancelled');
                } else {
                  if(result.postId) console.log('Share success with postId: '
                    + result.postId);
                }
              },
              function(error) {
                Alert.alert('Share Error', 'There was an issue. Please try again.');
                console.log('Share fail with error: ' + error);
              }
            );

        });
  },

	render() {

    const uri = this.props.imageData.imgSource ? this.props.imageData.imgSource.uri : ""

		return (
			<View style={styles.container}>
				<Text style={styles.text}>FINALIZE AND CONTRIBUTE</Text>
				<View style={[styles.section, {left: -(width/10)}]}>
					<View style={styles.contributeSummary}>
						<Image source={{uri: uri}} style={styles.contributeSummaryPhoto} />
						<View style={styles.rightContainer}>
							<Text style={styles.contributeSummaryText}>
								This was spotted at <Text style={styles.underline}>{this.props.productAndLocationData.store.name}</Text>, <Text style={styles.underline}>{this.props.productAndLocationData.store.vicinity}</Text>.
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
				<Text style={styles.sectionTitle}>WHY I'M SPOTTING IT:</Text>
				<TextInput
			        multiline = {true}
			        editable = {true}
			        maxLength = {80}
			        onChangeText={(input) => this.setState({input})}
              onEndEditing={() => this.props.updateUploadData("finalizeAndContributeView", this.state)}
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
                      // NOTE; update upload data in callback of setState to ensure new changes applied
                      this.setState({activeExcitingTag: excitingTag}, function() {
                        this.props.updateUploadData("finalizeAndContributeView", this.state);
                      });
		                	this.handleToggleButtonState(excitingTag);
		                	this.props.handleShowNextButton(true, 'Contribute');
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
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={{width, height}}>
              <View style={styles.modalLoaderContainer}>
                <ActivityIndicator
                  animating={true}
                  style={styles.modalLoader}
                  size="large"
                />
              </View>
            </View>
            </Modal>
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
const photoSize = height/7;

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
		resizeMode: Image.resizeMode.cover
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
  modalLoaderContainer: {
    height: height/36,
    width: height/36,
    backgroundColor: 'white',
    paddingVertical: height/22,
    paddingHorizontal: height/22,
    paddingLeft: height/44,
    width: width/5,
    top: height/2.2,
    alignSelf: 'center',
    borderRadius: width/32
  },
  modalLoader: {
    left: width/45,
    bottom: height/42
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
		marginVertical: height/65,
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
	storeFilterBar: {
		...border,
		width: width/1.3,
		height: height/15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'Avenir-Medium',
    fontSize: height/55,
		marginBottom: height/100,
	},
	underline: {
		textDecorationLine: 'underline'
	}
});

module.exports = FinalizeAndContributeView;
