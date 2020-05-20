import {AdMobInterstitial} from 'react-native-admob';
import adds from '../../config.adds.json';

const uniID = adds.addsID;
const testID = 'ca-app-pub-3940256099942544/1033173712';

export const requesAdds = async () => {
  try {
    try {
      await AdMobInterstitial.setAdUnitID(testID);
      await AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      await AdMobInterstitial.requestAd();
      await AdMobInterstitial.showAd();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
