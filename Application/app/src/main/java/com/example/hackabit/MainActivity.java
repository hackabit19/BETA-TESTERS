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
}
