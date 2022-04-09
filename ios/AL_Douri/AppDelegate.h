#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>


#import "RNFirebase.h"
#import "RNFirebaseMessaging.h"
#import "FirebasePushNotifications.h"

#import <UserNotifications/UNUserNotificationCenter.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "Firebase.h"


@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
