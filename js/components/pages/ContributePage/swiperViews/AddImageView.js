/**
 * AddImageView.js
 * First page in Contribute swiper
 *
 * @providesModule AddImageView
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from '@nitrog7/react-native-camera';
const {Image: GLImage} = require("gl-react-image"); // must use require syntax to use {Image: GLImage}
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/EvilIcons';
import ImageEffects from '../../../partials/ImageEffects';
import Slider from 'react-native-slider';
import { Surface } from 'gl-react-native';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */
var INITIAL_BRIGHTNESS_VALUE = 1;
var INITIAL_COLOR_TEMPERATURE_VALUE = 1;
var INITIAL_CONTRAST_VALUE = 1;
var INITIAL_SHARPEN_VALUE = 0.1;

var AddImageView = React.createClass({
	getInitialState() {
		return {
      camera: {
        type: Camera && Camera.constants.Type.back,
        flashMode: Camera && Camera.constants.FlashMode.auto,
      },
			// store effect values separately to avoid
			// continuously copying and updated a shared object with values

			// initial input values for effects on uploaded photo
			brightnessValue: INITIAL_BRIGHTNESS_VALUE,
			colorTemperatureValue: INITIAL_COLOR_TEMPERATURE_VALUE,
			contrastValue: INITIAL_CONTRAST_VALUE,
			sharpenValue: INITIAL_SHARPEN_VALUE,
			// store icon states together
			// as only one icon will be active at a time
			effectIconStates: {

			},
			imgSource: null,
      medium: 'camera' // where image came from - either camera or photoLibrary
		}

	},

	propTypes: {
		handleShowNextButton: React.PropTypes.func.isRequired,
    updateUploadData: React.PropTypes.func.isRequired
	},

  changeFlashMode() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  },

  componentWillUnmount() {
    this.setState({imgSource: null, medium: ''});
  },

  getFlashModeIcon() {
    let iconSource;

    if(this.state.camera.flashMode === Camera.constants.FlashMode.on) {
      iconSource = require('../../../partials/icons/contribute/img/flash-on.png');
    } else if (this.state.camera.flashMode === Camera.constants.FlashMode.off) {
      iconSource = require('../../../partials/icons/contribute/img/flash-off.png');
    } else {
      iconSource = require('../../../partials/icons/contribute/img/flash-auto.png');
    }

    return iconSource;
  },

	getIconStyle() {
    // make icons grey if no picture chosen
		if (!this.state.imgSource) return [styles.icon, {opacity: 0.3}];
    // but make normal black if picture has been uploaded/taken
		else return styles.icon;
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
	      quality: 0.85, // photos only
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
	        Alert.alert('Please Enable Photos Permissions', 'Go to Settings > Eyespot and turn on the Photos permissions in order to access the Camera Roll.');
	      } else {
	        // You can display the image using either data:
	        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

	        // uri on iOS
	        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};

	        this.setState({
	          imgSource: source, medium: 'photoLibrary'
	        });
	        this.props.handleShowNextButton(true);
          this.props.updateUploadData("imageView", this.state);

	      }
	    })
	},

  switchCameraType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  },

	takePicture() {
	    this.camera && this.camera.capture()
	      .then((response) => {
	      	const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

	      	this.setState({imgSource: source, medium: 'camera'});
	      	this.props.handleShowNextButton(true);
          this.props.updateUploadData("imageView", this.state);
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
  						    maximumValue={2}
  						  	minimumTrackTintColor='#000'
  						  	trackStyle={styles.trackStyle}
				            thumbStyle={styles.thumbStyle}
					        value={this.state.brightnessValue}
					        onValueChange={(brightnessValue) => this.setState({brightnessValue})} />
					      <View style={styles.sliderBoundValues}>
						      <Text>0</Text>
						      <Text>100</Text>
					      </View>
  					</View>
  					<View style={styles.bottomContentIcons}>
  						<TouchableOpacity onPress={() => {
  							// update saved, current effect value with the value of the slider to save the changes
							// return to list of effects by resetting effectIconStates object
  							this.setState({currentBrightnessValue: this.state.brightnessValue, effectIconStates: {}});
  						}}>
  							<Icon name="check" size={30} color="#000" />
  						</TouchableOpacity>
  						<TouchableOpacity onPress={() => {
  							// revert edited effect value to (current) value saved before editing
  							// return to list of effects by resetting effectIconStates object
  							this.setState({brightnessValue: this.state.currentBrightnessValue, effectIconStates: {}});
  						}}>
  							<Icon name="close-o" size={30} color="#000" />
  						</TouchableOpacity>
  					</View>
  				</View>

  			return brightnessControls;


  		} else if(effectIconStates.colorTemperatureIconState === 'active') {

  			const colorTemperatureControls =
  				<View style={styles.bottomContentContainer}>
  					<View style={[styles.bottomContentSection, {width: width * 2/3}]}>
  						<Text style={styles.bottomContentLabel}>Color Temperature</Text>
  						  <Slider
  						   	maximumValue={2}
  						    minimumTrackTintColor='#000'
  						  	trackStyle={styles.trackStyle}
				            thumbStyle={styles.thumbStyle}
					        value={this.state.colorTemperatureValue}
					        onValueChange={(colorTemperatureValue) => this.setState({colorTemperatureValue})} />
					        <View style={styles.sliderBoundValues}>
						      	<Text>0</Text>
						      	<Text>100</Text>
					      </View>
  					</View>
  					<View style={styles.bottomContentIcons}>
  						<TouchableOpacity onPress={() => {
							// update saved, current effect value with the value of the slider to save the changes
							// return to list of effects by resetting effectIconStates object
  							this.setState({currentColorTemperatureValue: this.state.colorTemperatureValue, effectIconStates: {}});
  						}}>
  							<Icon name="check" size={30} color="#000" />
  						</TouchableOpacity>
  						<TouchableOpacity onPress={() => {
  							// revert edited effect value to (current) value saved before editing
  							// return to list of effects by resetting effectIconStates object
  							this.setState({colorTemperatureValue: this.state.currentColorTemperatureValue, effectIconStates: {}});
  						}}>
  							<Icon name="close-o" size={30} color="#000" />
  						</TouchableOpacity>
  					</View>
  				</View>

  			return colorTemperatureControls;

  		} else if(effectIconStates.contrastIconState === 'active') {
  			const contrastControls =
  				<View style={styles.bottomContentContainer}>
  					<View style={[styles.bottomContentSection, {width: width * 2/3}]}>
  						<Text style={styles.bottomContentLabel}>Contrast</Text>
  						  <Slider
  						    maximumValue={2}
  						    minimumTrackTintColor='#000'
  						  	trackStyle={styles.trackStyle}
				            thumbStyle={styles.thumbStyle}
					        value={this.state.contrastValue}
					        onValueChange={(contrastValue) => this.setState({contrastValue})} />
					        <View style={styles.sliderBoundValues}>
						      	<Text>0</Text>
						      	<Text>100</Text>
					      </View>
  					</View>
  					<View style={styles.bottomContentIcons}>
  						<TouchableOpacity onPress={() => {
							// update saved, current effect value with the value of the slider to save the changes
							// return to list of effects by resetting effectIconStates object
  							this.setState({currentContrastValue: this.state.contrastValue, effectIconStates: {}});
  						}}>
  							<Icon name="check" size={30} color="#000" />
  						</TouchableOpacity>
  						<TouchableOpacity onPress={() => {
  							// revert edited effect value to (current) value saved before editing
  							// return to list of effects by resetting effectIconStates object
  							this.setState({contrastValue: this.state.currentContrastValue, effectIconStates: {}});
  						}}>
  							<Icon name="close-o" size={30} color="#000" />
  						</TouchableOpacity>
  					</View>
  				</View>

  			return contrastControls;

  		} else if(effectIconStates.sharpenIconState === 'active') {

  			const sharpenControls =
  						<View style={styles.bottomContentContainer}>
  					<View style={[styles.bottomContentSection, {width: width * 2/3}]}>
  						<Text style={styles.bottomContentLabel}>Sharpen</Text>
  						  <Slider
  						  	maximumValue={2}
  						    minimumTrackTintColor='#000'
  						  	trackStyle={styles.trackStyle}
				            thumbStyle={styles.thumbStyle}
					        value={this.state.sharpenValue}
					        onValueChange={(sharpenValue) => this.setState({sharpenValue})} />
					        <View style={styles.sliderBoundValues}>
						      	<Text>0</Text>
						      	<Text>100</Text>
					      </View>
  					</View>
  					<View style={styles.bottomContentIcons}>
  						<TouchableOpacity onPress={() => {
  							// update saved, current effect value with the value of the slider to save the changes
							// return to list of effects by resetting effectIconStates object
  							this.setState({currentSharpenValue: this.state.sharpenValue, effectIconStates: {}});
  						}}>
  							<Icon name="check" size={30} color="#000" />
  						</TouchableOpacity>
  						<TouchableOpacity onPress={() => {
  							// revert edited effect value to (current) value saved before editing
  							// return to list of effects by resetting effectIconStates object
  							this.setState({sharpenValue: this.state.currentSharpenValue, effectIconStates: {}});
  						}}>
  							<Icon name="close-o" size={30} color="#000" />
  						</TouchableOpacity>
  					</View>
  				</View>

  			return sharpenControls;

  		} else {

  			const effectIconsContainer =
  				<View style={styles.bottomContentContainer}>
						<TouchableOpacity onPress={() => {
							// save the current effect value to revert back to if the user cancels changes to the effect
							// update effectIconStates object to reflect currently active effect
							this.setState({currentContrastValue: this.state.contrastValue, effectIconStates: {contrastIconState: 'active'}})
						}}>
							<Image
								source={require('../../../partials/icons/contribute/img/contrast-effect-icon.png')}
								style={this.getIconStyle()} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							// save the current effect value to revert back to if the user cancels changes to the effect
							// update effectIconStates object to reflect currently active effect
							this.setState({currentBrightnessValue: this.state.brightnessValue, effectIconStates: {brightnessIconState: 'active'}})
						}}>
							<Image
								source={require('../../../partials/icons/contribute/img/brightness-effect-icon.png')}
								style={this.getIconStyle()} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							// save the current effect value to revert back to if the user cancels changes to the effect
							// update effectIconStates object to reflect currently active effect
							this.setState({currentColorTemperatureValue: this.state.colorTemperatureValue, effectIconStates: {colorTemperatureIconState: 'active'}})
						}}>
							<Image
								source={require('../../../partials/icons/contribute/img/color-temperature-effect-icon.png')}
								style={this.getIconStyle()} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							// save the current effect value to revert back to if the user cancels changes to the effect
							// update effectIconStates object to reflect currently active effect
							this.setState({currentSharpenValue: this.state.sharpenValue, effectIconStates: {sharpenIconState: 'active'}})
						}}>
							<Image
								source={require('../../../partials/icons/contribute/img/sharpen-effect-icon.png')}
								style={this.getIconStyle()} />
						</TouchableOpacity>
				</View>

  			return effectIconsContainer;
  		}
  	},

	render() {
		const camera = Camera && Camera.constants && Camera.constants.CaptureQuality &&
			<Camera
	          ref={(cam) => {
	            this.camera = cam;
	          }}
            captureAudio={false}
            captureQuality={Camera.constants.CaptureQuality.photo}
            captureTarget={Camera.constants.CaptureTarget.memory}
            type={this.state.camera.type}
            flashMode={this.state.camera.flashMode}
            style={styles.view}>
            <View style={[styles.cameraIconsContainer, {bottom: height/2.45}]}>
	          	  <TouchableOpacity onPress={this.changeFlashMode}>
                  <Image
                    source={this.getFlashModeIcon()}
                    style={[styles.icon, {right: width/12}]} />
		          </TouchableOpacity>
		      	  <View/>
              <TouchableOpacity onPress={this.switchCameraType}>
		          	<Image
		          		source={require('../../../partials/icons/contribute/img/camera-switch.png')}
		          		style={[styles.icon, {left: width/14}]} />
		          </TouchableOpacity>
	          </View>
	          <View style={[styles.cameraIconsContainer, {bottom: height/70, paddingHorizontal: width/30}]}>
	          	<TouchableOpacity onPress={this.launchImageLibrary}>
		          	<Image
		          		source={require('../../../partials/icons/contribute/img/gallery-text.png')}
		          		style={styles.textIcon} />
		          </TouchableOpacity>
              <View style={styles.textIcon} />
              <View style={styles.textIcon}/>
	          </View>
	        </Camera> || null;

        const viewportSize = height/1.95;

        const viewport = (this.state.imgSource ?
        	<View style={styles.view}>
        		<Surface ref="surface" width={viewportSize} height={viewportSize}>
		          <ImageEffects
		          	brightness={this.state.brightnessValue}
      					saturation={this.state.colorTemperatureValue}
      					contrast={this.state.contrastValue}
      					blur={this.state.sharpenValue}>
					<GLImage
					  source={this.state.imgSource}
					  imageSize={{ width: height/2.2, height: height/1.2 }}
					  resizeMode={this.state.medium === 'camera' ? 'cover' : 'stretch'}
					/>
		          </ImageEffects>
		        </Surface>
            <View style={[styles.cameraIconsContainer, {position: 'absolute', top: height/2.2, paddingHorizontal: width/30}]}>
                <TouchableOpacity onPress={this.launchImageLibrary}>
                <Image
                  source={require('../../../partials/icons/contribute/img/gallery-text.png')}
                  style={styles.textIcon} />
              </TouchableOpacity>
              <View style={styles.textIcon} />
              <TouchableOpacity onPress={() => this.setState({imgSource: null})}>
              <Image
                source={require('../../../partials/icons/contribute/img/retake-text.png')}
                style={[styles.textIcon, {height: height/65}]} />
            </TouchableOpacity>
            </View>
        	</View> : camera);

		return (
			<View style={styles.container}>
				<Text style={styles.text}>ADD / ADJUST YOUR IMAGE(S)</Text>
				<View style={styles.section}>
					{viewport}
				</View>
        {this.state.imgSource ? <View style={styles.captureButton}>
          <Image
            source={require('../../../partials/icons/contribute/img/camera-icon-grey.png')}
            style={styles.icon} />
        </View> : <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
          <Image
            source={require('../../../partials/icons/contribute/img/camera-icon.png')}
            style={styles.icon} />
        </TouchableOpacity>}
        <View style={styles.spacer} />
				<View style={styles.section}>
					{this._renderBottomContent()}
				</View>
			</View>
		);
	}

});

const cameraIconSize = width/14;
const iconSize = height/25;

const styles = StyleSheet.create({
	bottomContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: width,
    top: height/50
	},
	bottomContentIcons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	bottomContentLabel: {
      color: '#000',
      position: 'absolute',
      bottom: height/15,
      left: width/4,
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
		width: height/1.95 // same as camera view height
	},
  captureButton: {
    top: height/78,
    width: cameraIconSize,
    height: cameraIconSize,
  },
	view: {
		flex: 1,
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	    backgroundColor: 'transparent',
      height: height/1.95,
      width: height/1.95
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height,
		width,
	},
	textIcon: {
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
	sliderBoundValues: {
		width: width * 0.79, // slider is ~79% width of the screen
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		bottom: -5
	},
	spacer: {
		height: height/100
	},
	text: {
    fontFamily: 'Avenir-Medium',
    fontSize: height/55,
	},
	trackStyle: {
		height: 18,
		borderRadius: 1,
		backgroundColor: '#d5d8e8',
	},
	thumbStyle: {
		width: 0,
		height: 0,
	}
});

module.exports = AddImageView;
