import {useEffect} from 'react';
import {Platform, Keyboard} from 'react-native';

export function useKeyboard(
  onShow: CallableFunction,
  onHide: CallableFunction
) {
  useEffect(() => {
    const keyboardAction = Platform.OS === 'ios' ? 'Will' : 'Did';
    //@ts-ignore
    Keyboard.addListener(`keyboard${keyboardAction}Show`, onShow);
    //@ts-ignore
    Keyboard.addListener(`keyboard${keyboardAction}Hide`, onHide);

    return () => {
      Keyboard.removeAllListeners(`keyboard${keyboardAction}Show`);
      Keyboard.removeAllListeners(`keyboard${keyboardAction}Hide`);
    };
  });
}
