import { Alert, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

export const _checkAppVersion = () => {
    VersionCheck.needUpdate().then((res: any) => {    
        if(res?.isNeeded){
           return true
        }else{
           return false
        }
    });
}
