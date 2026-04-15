# App Store Deployment Checklist

## 1. App Store Connect Setup
- [ ] Create App Record in App Store Connect.
- [ ] Set Primary Language (English).
- [ ] Define App Category (Health & Fitness / Lifestyle).
- [ ] Set Pricing and Availability (Free with In-App Purchases).
- [ ] Configure In-App Purchases (CluWell Premium - Monthly & Annual).

## 2. Assets & Metadata
- [ ] App Icon (1024x1024 px, no transparency).
- [ ] Screenshots (6.5-inch, 5.5-inch, and 12.9-inch iPad displays). Must highlight:
  - Fully responsive UI across all devices
  - Emotional Fingerprint Onboarding
  - Aria Chat Interface
  - Rituals & Insights (Premium features)
- [ ] App Preview Video (15-30 seconds, 120fps UI capture).
- [ ] Promotional Text (170 characters).
- [ ] Description (Highlighting "Not a medical device" disclaimer).
- [ ] Keywords (e.g., wellness, ai companion, journal, mental health, habits).

## 3. Privacy & Security
- [ ] Complete App Privacy Questionnaire in App Store Connect.
- [ ] Generate `PrivacyInfo.xcprivacy` (Privacy Manifest).
  - Declare data collection: HealthKit (if used), Analytics, Crash Data.
  - Declare reasons for required APIs (e.g., UserDefaults).
- [ ] Ensure Privacy Policy URL is active and accessible.
- [ ] Ensure Terms of Service URL is active and accessible.
- [ ] Verify "Delete Account" functionality is fully operational (App Store requirement).

## 4. Build & Code Signing
- [ ] Update Build Number and Version String in Xcode (e.g., Version 1.0.0, Build 1).
- [ ] Ensure Production Provisioning Profile is selected.
- [ ] Verify Entitlements:
  - Push Notifications
  - HealthKit (if biometrics are enabled)
  - In-App Purchase
  - Siri/Speech Recognition (for Voice Mode)
- [ ] Run final Release Build (Archive).
- [ ] Validate Archive via Xcode Organizer.

## 5. TestFlight & QA
- [ ] Upload build to App Store Connect.
- [ ] Distribute to Internal Testers (QA Team).
- [ ] Distribute to External Testers (Beta Group).
- [ ] Verify Haptics (`CHHapticEngine`) on physical devices.
- [ ] Verify 120fps ProMotion scrolling on iPhone 13/14/15 Pro models.
- [ ] Test offline behavior (graceful degradation).

## 6. Final Submission
- [ ] Select the verified build in App Store Connect.
- [ ] Provide Review Notes for Apple (Include test account credentials if required).
- [ ] Submit for Review.
