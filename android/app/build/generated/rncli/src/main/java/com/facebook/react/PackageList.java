
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @davidgovea/react-native-wheel-datepicker
import com.zyu.ReactNativeWheelPickerPackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/toolbar-android
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
// @react-native-community/viewpager
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @sentry/react-native
import io.sentry.RNSentryPackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-document-picker
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-localization
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
// react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-restart
import com.reactnativerestart.RestartPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-twilio-video-webrtc
import com.twiliorn.library.TwilioPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ReactNativeWheelPickerPackage(),
      new AsyncStoragePackage(),
      new RNDateTimePickerPackage(),
      new NetInfoPackage(),
      new ReactToolbarPackage(),
      new RNCViewPagerPackage(),
      new RNCMaskedViewPackage(),
      new RNSentryPackage(),
      new BackgroundTimerPackage(),
      new RNDeviceInfo(),
      new ReactNativeDocumentPicker(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new ReactNativeLocalizationPackage(),
      new ReactNativePushNotificationPackage(),
      new ReanimatedPackage(),
      new RestartPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new TwilioPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
