package com.example.hackabit;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Point;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.vision.barcode.Barcode;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {
     Button scan;
     int BARCODE_READER  =1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scan = (Button) findViewById(R.id.scan);
        scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), BarcodeCapture.class);
                startActivityForResult(intent, BARCODE_READER);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if(requestCode == BARCODE_READER){
            if(resultCode == CommonStatusCodes.SUCCESS){
                if(data!=null){
                    Barcode barcode = data.getParcelableExtra(BarcodeCapture.BarcodeObject);
                    Point[] p = barcode.cornerPoints;
                    Toast.makeText(this, barcode.displayValue + "success", Toast.LENGTH_SHORT).show();
//                    amount.setText("Amount Last Received: " + barcode.displayValue);
                    try{
                        getApi();
                    }catch (Exception e){
                        e.printStackTrace();
                    }


                }else {
                    Toast.makeText(this, "Fail", Toast.LENGTH_SHORT).show();
                }
            }else {
                Log.v("AAA", CommonStatusCodes.getStatusCodeString(resultCode));

            }
        }else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    void getApi(){
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://iterar-mapi-us.p.rapidapi.com/api/amoxicillin/substances.json")
                .get()
                .addHeader("x-rapidapi-host", "iterar-mapi-us.p.rapidapi.com")
                .addHeader("x-rapidapi-key", "a1c8ed372fmsh901e8630dcc0404p16bb80jsn41d38cb8b4c7")
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                final String resp = response.body().string();
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, resp, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
