package com.clinic.webview;
import android.content.Context;
import android.os.Build;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.PermissionRequest;
import android.webkit.WebSettings;


import androidx.annotation.RequiresApi;


public class PermissionWebviewView extends WebView{
    private Context context;
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    public PermissionWebviewView(Context context) {
        super(context);
        this.context = context;
        this.setWebViewClient(new WebViewClient());
        WebSettings webSettings = this.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setUseWideViewPort(true);
        webSettings.setDomStorageEnabled(true);
        this.setWebChromeClient(new WebChromeClient() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                request.grant(request.getResources());
            }
        });
    }
}