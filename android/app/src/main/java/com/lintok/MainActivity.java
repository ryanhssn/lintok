package com.lintok;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.ReactActivity;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.ianlin.RNFirebaseCrashReport.RNFirebaseCrashReportPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;

public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback {

	 private PermissionListener listener; // <- add this attribute
  // Your methods here

  // Copy from here

  @Override
  public void setPermissionListener(PermissionListener listener)
  {
    this.listener = listener;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  {
    if (listener != null)
    {
      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "lintok";
    }

}
