import AdMobInterstitial from 'react-native-admob/RNAdMobInterstitial';
import adds from '../../config.adds.json';

const uniID = adds.addsID2;
const testID = 'ca-app-pub-3940256099942544/1033173712';

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
