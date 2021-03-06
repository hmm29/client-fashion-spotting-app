package com.eyespot;

import com.facebook.react.ReactActivity;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.xxsnakerxx.socialauth.SocialAuthPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.chirag.RNMail.RNMail;
import cl.json.RNSharePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.yoloci.fileupload.FileUploadPackage;
import com.projectseptember.RNGL.RNGLPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Eyespot";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RCTCameraPackage(),
            new SocialAuthPackage(),
            new FBSDKPackage(),
            new RNMail(),
            new RNSharePackage(),
            new BlurViewPackage(),
            new OrientationPackage(this),
            new FileUploadPackage(),
            new RNGLPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new FIRAnalyticsPackage(),
            new FacebookLoginPackage(),
            new CodePush(null, this, BuildConfig.DEBUG)
        );
    }
}
