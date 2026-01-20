// Android WebView 기반 간단한 앱
// Android Studio에서 새 프로젝트 생성 후 이 코드로 교체

package com.apc.gap.record

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        webView = findViewById(R.id.webview)
        
        // WebView 설정
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false
        }
        
        // WebViewClient 설정 (앱 내에서만 동작)
        webView.webViewClient = WebViewClient()
        
        // 서버 URL 로드
        // 로컬 네트워크: http://192.168.0.100:8787
        // 또는 온라인 배포 URL
        val serverUrl = "http://192.168.0.100:8787"  // 여기에 서버 주소 입력
        
        webView.loadUrl(serverUrl)
    }
    
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
