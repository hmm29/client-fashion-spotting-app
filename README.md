# Eyespot

Eyespot lets users discover quality fashion products through a community-driven, visual magazine.

# Most recent snapshot: Discover page in the works

![Screenshot](discover-page-snapshot.png?raw=true "Discover page screenshot")

## Running this app

Before running the app, make sure you ran:

    git clone https://github.com/CelenaConsortium/eyespot.git
    cd eyespot
    npm install

### Running on iOS

Mac OS and Xcode are required.

- Open `ios/Eyespot.xcodeproj` to open the project in Xcode
- Hit the Run button (or press Cmd + R)

See [Running on device](https://facebook.github.io/react-native/docs/running-on-device-ios.html) in the React Native Docs if you want to test on a physical device. This will involve (1) changing the JavaScript code location IP address in the AppDelegate.m file and (2) choosing a different target device in XCode.

To check out the Waffle.io project organizer go to [https://waffle.io/CelenaConsortium/eyespot](https://waffle.io/CelenaConsortium/eyespot).

## Functional Specification
						
#### Email Login & User Profiles
Username, email, password
						
#### Facebook Login
Profile picture imported from FB
Uses Firebase Fb Authentication
						
#### Social Sharing
Facebook, Twitter, Email, Text
						
#### Camera & Photos
Front, back, upload from library
						
#### Geolocation
Google Maps Api, places, long/lat
						
#### Map Views
Enable markers
						
#### Search
Search with parameters
					
#### In-app Notifications
Real-time notifications			
	
#### Analytics		
Unimited reporting for up to 10 custom events,

Basic Firebase analytics that come with Firebase setup:
* Active users
* Retention cohort
* User engagement
* Location
* Demographics
