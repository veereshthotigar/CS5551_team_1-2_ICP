package tutorial.cs5551.com.translateapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class TranslateActivity extends AppCompatActivity {

    String API_URL = "https://api.fullcontact.com/v2/person.json?";
    String API_KEY = "b29103a702edd6a";
    String sourceText;
    TextView outputTextView;
    Context mContext;
    Spinner dropdownSrc;
    Spinner dropdownDest;
    String[] lang = {"Spanish","Japanese","Kannada","English"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_translate);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        outputTextView = (TextView) findViewById(R.id.txt_Result);
        dropdownSrc = (Spinner) findViewById(R.id.spinnerSrc);
        ArrayAdapter adap1 = new ArrayAdapter(this,android.R.layout.simple_spinner_dropdown_item,lang);
        adap1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        dropdownSrc.setAdapter(adap1);

        dropdownDest = (Spinner) findViewById(R.id.spinnerDest);
        ArrayAdapter adap2 = new ArrayAdapter(this,android.R.layout.simple_spinner_dropdown_item,lang);
        adap2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        dropdownDest.setAdapter(adap2);

    }
    public void logOut(View v){
        Intent i = new Intent(TranslateActivity.this, LoginActivity.class);
        startActivity(i);
    }
    public void translateText(View v) {
        TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);
        String sourceLang = dropdownSrc.getSelectedItem().toString();
        String destineLang = dropdownDest.getSelectedItem().toString();
        String langCodeSrc = "en";
        String langCodeDest = "en";
        switch (sourceLang) {
            case "Spanish":
                langCodeSrc = "es";break;
            case "Japanese":
                langCodeSrc = "ja";break;
            case "Kannada":
                langCodeSrc = "kn";break;
            case "English":
                langCodeSrc = "en";break;
            default:
                langCodeSrc = "en";
        }
        switch (destineLang) {
            case "Spanish":
                langCodeDest = "es";break;
            case "Japanese":
                langCodeDest = "ja";break;
            case "Kannada":
                langCodeDest = "kn";break;
            case "English":
                langCodeDest = "en";break;
            default:
                langCodeDest = "en";
        }
        sourceText = sourceTextView.getText().toString();
        String getURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e." +
                "c0b0a88bea31ba51f72504cc0cc42cf891ed90d2&text=" + sourceText +"&" +
                "lang="+langCodeSrc+"-"+langCodeDest+"&[format=plain]&[options=1]&[callback=set]";//The API service URL
        final String response1 = "";
        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(getURL)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResult;
                    final String result = response.body().string();
                    try {
                        jsonResult = new JSONObject(result);
                        JSONArray convertedTextArray = jsonResult.getJSONArray("text");
                        final String convertedText = convertedTextArray.get(0).toString();
                        Log.d("okHttp", jsonResult.toString());
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText(convertedText);
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });


        } catch (Exception ex) {
            outputTextView.setText(ex.getMessage());

        }

    }
}
