import GL from "gl-react";
import React, {PropTypes} from "react";
import {Blur} from "gl-react-blur";
import {ContrastSaturationBrightness} from "gl-react-contrast-saturation-brightness";

export default GL.createComponent(
({
  children,
  width,
  height,
  blur,
  contrast,
  saturation,
  brightness
}) =>
        <ContrastSaturationBrightness
          contrast={contrast}
          saturation={saturation}
          brightness={brightness}>
            <Blur
              passes={6}
              factor={blur}
              width={width}
              height={height}>
              {children}
            </Blur>
        </ContrastSaturationBrightness>,

  {
    displayName: "ImageEffects",
    propTypes: {
      children: PropTypes.node.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      blur: PropTypes.number.isRequired,
      contrast: PropTypes.number.isRequired,
      saturation: PropTypes.number.isRequired,
      brightness: PropTypes.number.isRequired,
    }
  });
