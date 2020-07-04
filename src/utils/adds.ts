//@ts-ignore
import AdMobInterstitial from 'react-native-admob/RNAdMobInterstitial';
//@ts-ignore
import adds from '../../config.adds.json';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  TestIds,
} from '@react-native-firebase/admob';

const uniID = adds.addsIDdodi;
const testID = 'ca-app-pub-3940256099942544/1033173712';
const addUnitID = __DEV__ ? TestIds.INTERSTITIAL : uniID;

export const requesAdds = async () => {
  try {
    await AdMobInterstitial.setAdUnitID(uniID);
    await AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    await AdMobInterstitial.requestAd();
    await AdMobInterstitial.showAd();
  } catch (err) {
    console.log(err);
  }
};

export const fireAdds = async () => {
  admob()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
    .then(respons => {
      // Request config successfully set!
      console.log(respons);
    });
};

export const fireAddsIn = InterstitialAd.createForAdRequest(addUnitID);
