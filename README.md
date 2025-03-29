# Template setting

## Step 0: Notes.
Since this is a template and only going to be used for debugging, i will just use the default debug keystore.

### 0-1. Note your Android `package name`.
It's usually under AndroidManifest.xml or MainActivity.kt.

### 0-2. Note your Android `keystore hash`.
For base64 format(kakao dev console),
```
keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64
```
For sha1 format(firebase)
```
keytool -list -v -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | grep SHA1
```

### 0-3. Note your iOS `bundle name`.
You need to get or set this information from Xcode.

## Step 1: Setup Google

### 1-1. Make [Firebase](https://firebase.google.com/) project.
You should acquire two files, **`google-services.json`** for Android, **`GoogleService-Info.plist`** for iOS\

First, add a new Android app, and input both android `package name` and android debug sha1 `keystore hash`. download **`google-services.json`**.\
Second, add a new iOS app, and input iOS `bundle name`, download the **`GoogleService-Info.plist`**.\

### 1-2. Make [Cloud Proejct](https://console.cloud.google.com/) OAuth Client for Android / iOS / Web respectively.

First, while making Android project, input both android `package name` and android debug sha1 `keystore hash`.\
Second, while making Web project, just input any URI(`http://localhost` is fine.), and then retrieve the client id.\
Finally, Second, while making iOS project, input your iOS `buneld name`, and then retrieve the client id, and update .env file as\

.env
```
GOOGLE_WEB_OAUTH=[your web ouath client id]
GOOGLE_IOS_OAUTH=[your ios ouath client id]
```

## Step 2: Setup Kakao
Here is the best example of how to do this: [Kakao React Native](https://github.com/crossplatformkorea/react-native-kakao-login)

### 2-1. Make a app on kakao dev console
Dev console is [here](https://developers.kakao.com/console/app)