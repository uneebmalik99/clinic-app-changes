package com.clinic.notification;

import android.content.Intent;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class RNFirebaseMessagingService extends FirebaseMessagingService {
    private static final String TAG = "RNFMessagingService";
    public static final String MESSAGE_EVENT = "messaging-message";
    public static final String NEW_TOKEN_EVENT = "messaging-token-refresh";
    public static final String REMOTE_NOTIFICATION_EVENT = "notifications-remote-notification";

    @Override
    public void onNewToken(String token) {
        Log.e(TAG, "onNewToken event received");
        Intent newTokenEvent = new Intent(NEW_TOKEN_EVENT);
        LocalBroadcastManager
                .getInstance(this)
                .sendBroadcast(newTokenEvent);
    }
    @Override
    public void onMessageReceived(RemoteMessage message) {
        Log.d(TAG, "onMessageReceived event received");
        Intent notificationEvent = new Intent(REMOTE_NOTIFICATION_EVENT);
        notificationEvent.putExtra("notification", message);
        // Broadcast it to the (foreground) RN Application
        LocalBroadcastManager
                .getInstance(this)
                .sendBroadcast(notificationEvent);
    }
}