/**
 * MapsViewIcon.js
 * Select the map view on Product page
 *
 * @providesModule MapsViewIcon
 * @flow
 */

import React, { PropTypes, Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SIZE = 22; /* icon font size */

/*
 * specifies types for properties that this component receives
 */

type Props = {
    state: PropTypes.string.isOptional,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.number,
    style: View.PropTypes.style
};

/*
 * defines the BackIcon class
 */

class MapsViewIcon extends Component {
    constructor(props:Props) {
        super(props);
        this.state = {};
    };

    /*
     * getIconSource(): get static image path based on color prop
     */

    getIconBrightness() {
        const isActive = this.props.isActive;

        if (!isActive) {
            return {opacity: 0.4}
        }
    };


    /*
     * render(): returns JSX that declaratively specifies icon appearance
     */

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.1}
                onPress={this.props.onPress}
                style={[this.props.style,{width: (this.props.size || SIZE) * 3.88,
                    height: (this.props.size || SIZE) * 3.88, alignItems: 'flex-start'}]}>
                <Image
                    source={require('./img/map-mode-active.png')}
                    style={[styles.icon, this.getIconBrightness()]} />
            </TouchableOpacity>
        );
    };
}

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
    icon: {
        opacity: 1.0,
        width: SIZE,
        height: SIZE,
        resizeMode: Image.resizeMode.contain
    }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = MapsViewIcon;
