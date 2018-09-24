package com.example.vthotigar.currentlocation;

import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.support.annotation.NonNull;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Checking Permissions.
        getLocationPermission();

        LocationManager lm = (LocationManager)getSystemService(Context.LOCATION_SERVICE);
        Location myLocation = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);

        // If Location is Null, Set Accuracy and set the Last Known Location using Criteria.
        if (myLocation == null) {
            setLastLocation(myLocation,lm);
        }

        if(myLocation!=null){
            showCurrentLocation(myLocation);
        }
    }
    private void showCurrentLocation(Location myLocation){
        // Latitude, Longitude setting in LatLng Class.
        LatLng userLocation = new LatLng(myLocation.getLatitude(), myLocation.getLongitude());

        // Creating Marker with userLocation and a Title.
        MarkerOptions currentLocationMarker = new MarkerOptions()
                .position(userLocation)
                .title("Lat: "+myLocation.getLatitude()+ " Long: "+myLocation.getLongitude());


        // Always show the Marker by using Show Info Window
        mMap.addMarker(currentLocationMarker).showInfoWindow();
        // Zooming the Camera [Input Params: userLocation,width,height,Padding
        mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(userLocation, 14), 1500, null);
    }

    private void setLastLocation(Location myLocation,LocationManager lm){
        Criteria criteria = new Criteria();
        criteria.setAccuracy(Criteria.ACCURACY_COARSE);
        String provider = lm.getBestProvider(criteria, true);
        myLocation = lm.getLastKnownLocation(provider);
    }

    // Prompts the user for permission to use the device location.
    private void getLocationPermission() {
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
        {
            ActivityCompat.requestPermissions(this,new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }
        if(!mMap.isMyLocationEnabled()) {
            // Enable Map if Location is disabled.
            mMap.setMyLocationEnabled(true);
        }
    }
    //Handles the result of the request for location permissions.
    @Override
    public void onRequestPermissionsResult(int requestCode,@NonNull String permissions[],@NonNull int[] grantResults) {
        if (requestCode == 1) {
            // If request is cancelled, the result arrays are empty.
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                LocationManager lm = (LocationManager)getSystemService(Context.LOCATION_SERVICE);
                Location myLocation = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                // If Location is Null, Set Accuracy and set the Last Known Location using Criteria.
                if (myLocation == null) {
                    setLastLocation(myLocation,lm);
                }
                if(myLocation!=null){
                    showCurrentLocation(myLocation);
                }
            }
        }
    }
}