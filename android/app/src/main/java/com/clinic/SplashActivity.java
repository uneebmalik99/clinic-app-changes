package com.clinic;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_screen);
        Handler handler=new Handler();
        Runnable runnable=new Runnable() {
            @Override
            public void run() {
                requestCameraPermission();
            }
        };
        handler.postDelayed(runnable,2000);
    }

    private static final int PERMISSION_REQUEST_CAMERA = 0;

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        // BEGIN_INCLUDE(onRequestPermissionsResult)
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CAMERA) {
            if (grantResults.length == 1 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission has been granted. Start camera preview Activity.

                startAct();
            } else {
                // Permission request was denied.
                startAct();
            }
        }
        // END_INCLUDE(onRequestPermissionsResult)
    }


    private void startAct(){
        Intent intent=new Intent(SplashActivity.this,MainActivity.class);
        // this line is necessary to open notification when app is closed
        intent.putExtras(this.getIntent());
        startActivity(intent);
        finish();

    }
    private void showCameraPreview() {
        // BEGIN_INCLUDE(startCamera)
        // Check if the Camera permission has been granted
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED) {
            // Permission is already available, start camera preview
           startAct();
        } else {
            // Permission is missing and must be requested.
            requestCameraPermission();
        }
        // END_INCLUDE(startCamera)
    }

    /**
     * Requests the {@link android.Manifest.permission#CAMERA} permission.
     * If an additional rationale should be displayed, the user has to launch the request from
     * a SnackBar that includes additional information.
     */
    String permission[]=new String[]{Manifest.permission.CAMERA,Manifest.permission.RECORD_AUDIO,Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.WRITE_EXTERNAL_STORAGE};
    private void requestCameraPermission() {
        // Permission has not been granted and must be requested.
        if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                Manifest.permission.CAMERA)) {
            // Provide an additional rationale to the user if the permission was not granted
            // and the user would benefit from additional context for the use of the permission.
            // Display a SnackBar with cda button to request the missing permission.
            ActivityCompat.requestPermissions(SplashActivity.this,
                    permission,
                    PERMISSION_REQUEST_CAMERA);
        } else {

            ActivityCompat.requestPermissions(this,
                    permission , PERMISSION_REQUEST_CAMERA);

        }
    }


}
