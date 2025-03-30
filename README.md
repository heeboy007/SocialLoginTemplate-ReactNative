# SocialLoginTemplate
소셜 로그인 세팅법을 정리한 React Native(Android / iOS)입니다. 여기에 나와있는 개인 프로젝트 Credentials들은 이용하지 말아주시고, 본인의 새로운 프로젝트를 만들어서 사용해주시면 정말 감사하겠습니다.

여기서 `변수 이름`처럼 하이라이팅 되어있거나 {변수 이름} 감싸져 있는 것은 실제로 그런 변수로 그 값을 치환하시면 되겠습니다.\
(당연히 따옴표나 중괄호는 생략하시리라 믿습니다.)

## Step 1: 이름 설정

### 1-1. 앱 이름 : `your app name`.
1. In `app.json`
```diff
{
+  "name": "{your app name}",
+  "displayName": "{your app name}"
}
```

2. In `android/app/src/main/java/{package directory}/MainActivity.kt`
```diff
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
+  override fun getMainComponentName(): String = "{your app name}"
```

### 1-2. 안드로이드 패키지 이름 : `package name`
여기서는 아래와 같은 패키지 이름으로 되어있습니다.
```
com.slrn.template.reenag
```
이걸 다른 값으로 바꾸셔야, 제대로 앱을 만들 수 있습니다.
```
com.whatever.wala
```
이렇게 대충 앞에 com 붙어 있으면 인식하는 듯 하므로 원하는 대로 정하시면 되겠습니다.\
우선, 정하셨다면 다음 내용들을 바꿔주세요.

`android/app/src/main/java/com/slrn/template/reenag/MainActivity.kt` 의 첫째 줄
```diff
+package {package name}
```

`android/app/src/main/java/com/slrn/template/reenag/MainApplication.kt` 의 첫째 줄
```diff
+package {package name}
```

In : `android/app/build.gradle`
```diff
+   namespace "{package name}"
    defaultConfig {
+       applicationId "{package name}"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
```

이렇게 하신 뒤, 실제로 `MainApplication.kt`와 `MainActivity.kt`를 패키지 이름에 맞게 디렉토리를 변경해주셔야합니다.
```
com.slrn.template.reenag -> com/slrn/template/reenag
```
`android/app/src/main/java/{package directoy}/Main~~~.kt`처럼, 중간 디렉토리를 수정하시면 되겠습니다.

### 1-2. 안드로이드 키스토어 해시 : `keystore hash`

여기서는 리액트 네이티브의 기본 제공 debug.keystore의 해시 값을 이용합니다. 하지만 release를 한다거나 debug를 할때, 다른 keystore를 생성하셔야 합니다.
다음과 같이 2종류의 해쉬 값을 메모합니다.

#### Base64 포맷(kakao dev console)
```
keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64
```
혹은
```
keytool -exportcert -alias {키 스토어 alias} -keystore {키 스토어 실제 경로} -storepass {스토어 비밀번호} -keypass {키 비밀번호} | openssl sha1 -binary | openssl base64
```

#### SHA1 포맷(firebase)
```
keytool -list -v -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | grep SHA1
```
혹은
```
keytool -exportcert -alias {키 스토어 alias} -keystore {키 스토어 실제 경로} -storepass {스토어 비밀번호} -keypass {키 비밀번호} | grep SHA1
```

### 1-3. iOS 번들 이름 : `bundle name`
이 정보는 XCode에서 다음과 같이 세팅하면 됩니다.
TODO : photo

## Step 2: 구글 로그인 세팅하기

### 2-1. [Firebase](https://firebase.google.com/) 프로젝트를 생성
파일 두 개를 만들어서 다운로드 하시는게 이번 목표입니다. **`google-services.json`** 는 안드로이드, **`GoogleService-Info.plist`** 는 iOS 세팅에 쓰입니다.

우선, Android 앱을 새로 세팅합니다. 앞에서 세팅한 `package name`, `keystore hash`를 입력하시면 됩니다. 거기서 **`google-services.json`** 를 다운로드 합니다.\
TODO : Photo

두번째로, iOS 앱을 새로 세팅합니다. 앞에서 세팅한 `bundle name`을 입력하시면 됩니다. 거기서 **`GoogleService-Info.plist`** 를 다운로드 합니다.\
TODO : Photo

이제 다음 경로에 가서 파일들을 바꿔치기 하시면 됩니다.\
**`GoogleService-Info.plist`** -> `ios/social_login_template_react_native/GoogleService-Info.plist`\
**`google-services.json`** -> `android/app/google-services.json`

### 2-2. 구글 클라우드 콘솔 설정 
[Cloud Proejct](https://console.cloud.google.com/)에서 Android / iOS / Web의 OAuth Client를 각각 생성하셔야합니다.

우선 Android 클라이언트를 새로 세팅합니다. 앞에서 세팅한 `package name`, `keystore hash`를 입력하시면 됩니다.(이번엔 생성만 하셔도 됩니다.)\
TODO : Photo

두번째로, 웹 클라이언트를 새로 세팅합니다. 만들때 그냥 아무런 URI(`http://localhost`도 괜찮습니다.)를 넣고, 생성한 뒤 `google Web OAuth client id`를 메모합니다.\
이 값은 차후에 idToken값을 가져오기 위해서 쓰입니다.\
TODO : Photo

마지막으로, iOS 클라이언트를 새로 세팅합니다. 앞에서 세팅한 `bundle name`을 입력하시면 됩니다. 이후 `google iOS OAuth client id`를 메모합니다.\
(이 `google iOS OAuth client id` 는 차후 4-1에서도 쓰이므로 따로 메모해두시는 걸 추천해드립니다.)

두개의 id를 .env파일을 생성하여 다음과 같이 적어 넣습니다.
.env
```diff
+GOOGLE_WEB_OAUTH=[google Web OAuth client id]
+GOOGLE_IOS_OAUTH=[google iOS OAuth client id]
```

## Step 2: [Kakao React Native](https://github.com/crossplatformkorea/react-native-kakao-login) 세팅하기

### 2-1. 카카오톡 개발자 콘솔([kakao dev console](https://developers.kakao.com/console/app))에서 새로운 앱을 생성합니다.
생성한 후, `kakao native key`를 메모합니다.

### 2-2. Android 활성화(`package name`, `keystore hash`)
TODO : photo

### 2-3. iOS 활성화(`bundle name`)
TODO : photo

### 2-4. 로그인 활성화 ([kakao login prerequisite](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite))
여기서 로그인 활성화와, OpenID Connect 활성화 설정을 둘다 ON으로 설정하시면 되겠습니다.

## Step 4. 각종 키 취합

### 4-1. iOS `ios/social_login_template_react_native/Info.plist`

다음과 같이 수정합니다 :
```diff
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
+				<string>kakao{kakao native key}</string>
+				<string>{google iOS OAuth client id}</string>
			</array>
		</dict>
	</array>
	<key>CFBundleVersion</key>
	<string>$(CURRENT_PROJECT_VERSION)</string>
	<key>KAKAO_APP_KEY</key>
+	<string>{kakao native key}</string>
```

### 4-2. `android/app/src/main/res/values/strings.xml`

다음과 같이 수정합니다.
```diff
<resources>
+   <string name="app_name">{your app name}</string>
+   <string name="kakao_app_key">{kakao native key}</string>
</resources>
```
