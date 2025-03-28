# Template setting

## Step 0: Note Keystore hashes.
Since this is a template and only going to be used for debugging, i will just use the default debug keystore.

For base64 format(kakao dev console),
```
keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64
```
For sha1 format(firebase)
```
keytool -list -v -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android | grep SHA1
```

## Step 1: Setup google

### 1-1: Android google-services.json
Go to [Firebase](https://firebase.google.com/?hl=ko), and make a project to start as android.
Note the package name from first row of MainActivity.kt.

### 1-2: Ios GoogleService-Info.plist
Go to [Firebase](https://firebase.google.com/?hl=ko), and make a project to start as ios.
Note the bundle name from Xcode.

## Step 2: Setup Kakao
Here is the best example of how to do this: [Kakao React Native](https://github.com/crossplatformkorea/react-native-kakao-login)

### 2-1. Make a app on kakao dev console
Dev console is [here](https://developers.kakao.com/console/app)