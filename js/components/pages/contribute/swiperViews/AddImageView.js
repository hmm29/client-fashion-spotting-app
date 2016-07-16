/**
 * AddImageView.js
 * First page in Contribute swiper
 *
 * @providesModule AddImageView
 * @flow
 */

import React, { Component } from 'react'; 
import {
  Dimensions,
  Image,
  StyleSheet,
  Text, 
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import Slider from 'react-native-slider';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

var AddImageView = React.createClass({
	getInitialState() {
		return {
			effectIconStates: {
				
			},
			imageSource: null,
		}

	},

	propTypes: {
		handleShowNextButton: React.PropTypes.func.isRequired
	},

	getIconColor(state) {
		if (!state) return [styles.icon, {opacity: 0.3}];
		else if(state === 'active') return styles.icon;
		else return {};
	},

	launchImageLibrary() {
		let options = {
	      title: null, // specify null or empty string to remove the title
	      cancelButtonTitle: 'Cancel',
	      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
	      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
	      customButtons: {
	        'Use My Facebook Profile Photo': 'fb', // [Button Text] : [String returned upon selection]
	      },
	      cameraType: 'front', // 'front' or 'back'
	      mediaType: 'photo', // 'photo' or 'video'
	      videoQuality: 'high', // 'low', 'medium', or 'high'
	      maxWidth: width, // photos only
	      maxHeight: height, // photos only
	      aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
	      aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
	      quality: 0.6, // photos only
	      angle: 0, // photos only
	      allowsEditing: true, // Built in functionality to resize/reposition the image
	      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
	      //storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
	      //  skipBackup: true, // image will NOT be backed up to icloud
	      // path: 'images' // will save image at /Documents/images rather than the root
	      //}
	    };

	    ImagePicker.launchImageLibrary(options, (response) => {
	      console.log('Response = ', response);

	      if (response.didCancel) {
	        console.log('User cancelled image picker');
	      }
	      else if (response.error) {
	        console.log('ImagePickerManager Error: ', response.error);
	      } else {
	        // You can display the image using either data:
	        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

	        // uri on iOS
	        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};

	        this.setState({
	          imgSource: source
	        });
	        this.props.handleShowNextButton(true);
	      }
	    })
	},

	takePicture() {
	    this.camera.capture()
	      .then((data) => {
	      	const source = {uri: 'data:image/jpeg;base64,' + data, isStatic: true};
	      	this.setState({imageSource: source});
	      	this.props.handleShowNextButton(true);
	      })
	      .catch(err => console.error(err));
  	},

  	_renderBottomContent() {
  		const effectIconStates = this.state.effectIconStates;

  		if(effectIconStates.brightnessIconState === 'active') {
  			const brightnessControls = 
  				<View style={styles.bottomContentContainer}>
  					<View style={[styles.bottomContentSection, {width: width * 2/3}]}>
  						<Text style={styles.bottomContentLabel}>Brightness</Text>
  						  <Slider
					          value={this.state.value || 0}
					          onValueChange={(value) => this.setState({value})} />
  					</View>
  				</View>

  			return brightnessControls;


  		} else if(effectIconStates.colorTemperatureIconState === 'active') {

  		} else if(effectIconStates.contrastIconState === 'active') {
  			const contrastControls = 
  				<View style={styles.bottomContentContainer}>
  					<View style={styles.bottomContentSection}>
  						<Text style={styles.bottomContentLabel}>Contrast</Text>
  						  <Slider
					          value={this.state.value || 0}
					          onValueChange={(value) => this.setState({value})} />
  					</View>
  				</View>

  			return contrastControls;

  		} else if(effectIconStates.sharpenIconState === 'active') {

  		} else {

  			const effectIconsContainer = 
  				<View style={styles.bottomContentContainer}>
						<TouchableOpacity onPress={() => {
							this.setState({effectIconStates: {contrastIconState: 'active'}})
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/contrast-effect-icon.png')} 
								style={this.getIconColor(this.state.effectIconStates.contrastIconState)} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							this.setState({effectIconStates: {brightnessIconState: 'active'}})
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/brightness-effect-icon.png')} 
								style={this.getIconColor(this.state.effectIconStates.brightnessIconState)} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							this.setState({effectIconStates: {colorTemperatureIconState: 'active'}})
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/color-temperature-effect-icon.png')} 
								style={this.getIconColor(this.state.effectIconStates.colorTemperatureIconState)} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							this.setState({effectIconStates: {sharpenIconState: 'active'}})
						}}>
							<Image 
								source={require('../../../partials/icons/contribute/img/sharpen-effect-icon.png')} 
								style={this.getIconColor(this.state.effectIconStates.sharpenIconState)} />
						</TouchableOpacity>
					</View>
  			
  			return effectIconsContainer;
  		}
  	},

	render() {
		const camera = 
			<Camera
	          ref={(cam) => {
	            this.camera = cam;
	          }}
	          style={styles.cameraView}
	          aspect={Camera.constants.Aspect.fill}>
	          <View style={styles.cameraIconsContainer}>
	          	  <TouchableOpacity onPress={this.launchImageLibrary}>
		          	<Image
		          		source={require('../../../partials/icons/contribute/img/gallery-text.png')}
		          		style={styles.galleryTextIcon} />
		          </TouchableOpacity>
		          <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
		          	<Image
		          		source={require('../../../partials/icons/contribute/img/camera-icon.png')}
		          		style={styles.icon} />
		          </TouchableOpacity>
		      	  <View style={styles.rightCameraIcon} />
	          </View>
	        </Camera>;

        const effectIconsContainer = 
        	<View style={styles.effectIconsContainer}>
				<TouchableOpacity onPress={() => {
					this.setState({effectIconStates: {contrastIconState: 'active'}})
				}}>
					<Image 
						source={require('../../../partials/icons/contribute/img/contrast-effect-icon.png')} 
						style={this.getIconColor(this.state.effectIconStates.contrastIconState)} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					this.setState({effectIconStates: {brightnessIconState: 'active'}})
				}}>
					<Image 
						source={require('../../../partials/icons/contribute/img/brightness-effect-icon.png')} 
						style={this.getIconColor(this.state.effectIconStates.brightnessIconState)} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					this.setState({effectIconStates: {colorTemperatureIconState: 'active'}})
				}}>
					<Image 
						source={require('../../../partials/icons/contribute/img/color-temperature-effect-icon.png')} 
						style={this.getIconColor(this.state.effectIconStates.colorTemperatureIconState)} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					this.setState({effectIconStates: {sharpenIconState: 'active'}})
				}}>
					<Image 
						source={require('../../../partials/icons/contribute/img/sharpen-effect-icon.png')} 
						style={this.getIconColor(this.state.effectIconStates.sharpenIconState)} />
				</TouchableOpacity>
			</View>

        const photoGrid = 
        	<Image source={this.state.imgSource} style={[styles.cameraView, {resizeMode: Image.resizeMode.cover}]} />

		return (
			<View style={styles.container}>
				<Text style={styles.text}>ADD / ADJUST YOUR IMAGE(S)</Text>
				<View style={styles.section}>
					{this.state.imgSource ? photoGrid : camera}
				</View>
				<View style={styles.spacer} />
				<View style={styles.section}>
					{this._renderBottomContent()}
				</View>
			</View>
		);
	}

});

const iconSize = height/25;

const styles = StyleSheet.create({
	bottomContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: width
	},
	bottomContentLabel: {
        color: '#000',
        fontSize: height / 45,
        fontFamily: 'BodoniSvtyTwoITCTT-Book'
    },
    bottomContentSection: {
    	flex: 1,
	    marginLeft: 10,
	    marginRight: 10,
	    alignItems: 'stretch',
	    justifyContent: 'center',
    },
	cameraIcon: {
		width: iconSize,
		height: iconSize,

	},
	cameraIconsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: height/2.2 // same as camera view height
	},
	cameraView: {
		flex: 1,
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	    height: height/2.2,
	    width: height/2.2,
	    backgroundColor: '#ccc'
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center', 
		height, 
		width,
	},
	galleryTextIcon: {
		height: iconSize,
		width: height/8,
		resizeMode: Image.resizeMode.contain
	},
	icon: {
		width: iconSize, 
		height: iconSize,
		resizeMode: Image.resizeMode.contain
	},
	rightCameraIcon: {
		width: height/8, 
		height: height/25,
		// TODO: add "resizeMode: Image.resizeMode.contain" once Image component for this icon is added
	},
	section: {
		marginVertical: height/45
	},
	spacer: {
		height: height/10	
	},
	text: {
		fontFamily: 'Avenir-Roman',
	}
});

module.exports = AddImageView;