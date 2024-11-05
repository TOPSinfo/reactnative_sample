import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import MapScreen from '@screens/Map';
import screen from '@HOCs/screen';
import Search from '@screens/Search';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import Sidebar from '@screens/Sidebar';
import Payment from '@screens/Payment';
import Profile from '@screens/Profile';
import Loading from '@screens/Loading';
import Vehicle from '@screens/Vehicle';
import Vehicles from '@screens/Vehicles';
import Sessions from '@screens/Sessions';
import Stalls from '@screens/Stalls'
import Gate from '@screens/Gate';
import Lot from '@screens/SubLot';
import withTopBar from '@HOCs/withTopBar';
import QrScanner from '@screens/QRScanner';
import CreditCard from '@screens/CreditCard';
import NewSession from '@screens/NewSession';
import EditProfile from '@screens/EditProfile';
import ChangePassword from '@screens/ChangePassword';
import ForgotPassword from '@screens/ForgotPassword';
import Invoice from '@screens/Invoice';
import TermsAndConditions from '@screens/TermsAndConditions';
import OverlayPopup from '@components/OverlayPopup';
import DeleteAccountOverlay from '@components/DeleteAccountOverlay';
import Loader from '@components/Loader';
import { NavigationScreenNames } from '@consts/navigation';
import ExtendSession from '@screens/ExtendSession';
import Checkout from '@screens/Checkout';
import OverlayItemPicker from '@components/OverlayItemPicker';
import NotificationOverlay from '@components/NotificationCards/overlay';
import OverlayMessage from '@components/OverlayMessage';
import HelpSupport from '@screens/HelpSupport';
import LanguageScreen from '@screens/Language';
import OverlayReactivate from '@components/OverlayReactivate';
import ZoneIDPopup from '@components/ZoneIDPopup';
import OverlaySession from '@components/OverlaySessionPopup';
import OverlayRatePopup from '@components/OverlayRatePopup';
import MapDirection from '@components/MapDirection';

export const activeScreenSet = new Set<string>();
export const registerScreens = () => {
  Navigation.registerComponent(NavigationScreenNames.MAP,
    () => screen(MapScreen),
    () => gestureHandlerRootHOC(MapScreen)
  );

  Navigation.registerComponent(NavigationScreenNames.QR_SCANNER,
    () => screen(QrScanner),
    () => gestureHandlerRootHOC(QrScanner)
  );

  Navigation.registerComponent(NavigationScreenNames.SIDEBAR,
    () => screen(Sidebar),
    () => gestureHandlerRootHOC(Sidebar)
  );

  Navigation.registerComponent(NavigationScreenNames.SEARCH,
    () => screen(Search, withTopBar()),
    () => gestureHandlerRootHOC(Search)
  );

  Navigation.registerComponent(NavigationScreenNames.VEHICLES,
    () => screen(Vehicles, withTopBar()),
    () => gestureHandlerRootHOC(Vehicles),
  );

  Navigation.registerComponent(NavigationScreenNames.PAYMENT,
    () => screen(Payment, withTopBar()),
    () => gestureHandlerRootHOC(Payment)
  );

  Navigation.registerComponent(NavigationScreenNames.PROFILE,
    () => screen(Profile, withTopBar()),
    () => gestureHandlerRootHOC(Profile),
  );

  Navigation.registerComponent(NavigationScreenNames.SESSIONS,
    () => screen(Sessions, withTopBar()),
    () => gestureHandlerRootHOC(Sessions),
  );

  Navigation.registerComponent(NavigationScreenNames.STALLS,
    () => screen(Stalls, withTopBar('overlay')),
    () => gestureHandlerRootHOC(Stalls),
  );

  Navigation.registerComponent(NavigationScreenNames.GATES,
    () => screen(Gate, withTopBar('overlay')),
    () => gestureHandlerRootHOC(Gate),
  );

  Navigation.registerComponent(NavigationScreenNames.LOT,
    () => screen(Lot, withTopBar('overlay')),
    () => gestureHandlerRootHOC(Lot)
  );

  Navigation.registerComponent(NavigationScreenNames.LOADING,
    () => screen(Loading),
    () => gestureHandlerRootHOC(Loading)
  );

  Navigation.registerComponent(NavigationScreenNames.SIGN_IN,
    () => screen(SignIn, withTopBar('overlay')),
    () => gestureHandlerRootHOC(SignIn),
  );

  Navigation.registerComponent(NavigationScreenNames.SIGN_UP,
    () => screen(SignUp, withTopBar('overlay')),
    () => gestureHandlerRootHOC(SignUp),
  );

  Navigation.registerComponent(NavigationScreenNames.FORGOT_PASSWORD,
    () => screen(ForgotPassword, withTopBar('overlay')),
    () => gestureHandlerRootHOC(ForgotPassword)
  );

  Navigation.registerComponent(NavigationScreenNames.PROFILE_EDIT,
    () => screen(EditProfile, withTopBar('overlay')),
    () => gestureHandlerRootHOC(EditProfile)
  );

  Navigation.registerComponent(NavigationScreenNames.CHANGE_PASSWORD,
    () => screen(ChangePassword, withTopBar('overlay')),
    () => gestureHandlerRootHOC(ChangePassword)
  );

  Navigation.registerComponent(NavigationScreenNames.NEW_SESSION,
    () => screen(NewSession, withTopBar('overlay')),
    () => gestureHandlerRootHOC(NewSession)
  );

  Navigation.registerComponent(NavigationScreenNames.VEHICLE,
    () => screen(Vehicle, withTopBar('overlay')),
    () => gestureHandlerRootHOC(Vehicle)
  );

  Navigation.registerComponent(NavigationScreenNames.CREDIT_CARD,
    () => screen(CreditCard, withTopBar('overlay')),
    () => gestureHandlerRootHOC(CreditCard)
  );

  Navigation.registerComponent(NavigationScreenNames.LOADER,
    () => Loader,
    () => gestureHandlerRootHOC(Loader)
  );

  Navigation.registerComponent(NavigationScreenNames.EXTEND_SESSION,
    () => screen(ExtendSession, withTopBar('overlay')),
    () => gestureHandlerRootHOC(ExtendSession),
  );

  Navigation.registerComponent(NavigationScreenNames.HELP_SUPPORT,
    () => screen(HelpSupport, withTopBar('overlay')),
    () => gestureHandlerRootHOC(HelpSupport)
  );

  Navigation.registerComponent(NavigationScreenNames.SESSION_OVERLAY,
    () => OverlaySession,
    () => gestureHandlerRootHOC(OverlaySession)
  );

  Navigation.registerComponent(NavigationScreenNames.CHECKOUT,
    () => screen(Checkout, withTopBar('overlay')),
    () => gestureHandlerRootHOC(Checkout)
  );

  Navigation.registerComponent(NavigationScreenNames.MAP_DIRECTION,
    () => screen(MapDirection, withTopBar('overlay')),
    () => gestureHandlerRootHOC(MapDirection)
  );

  Navigation.registerComponent(
    NavigationScreenNames.INVOICE,
    () => Invoice,
    () => gestureHandlerRootHOC(Invoice)
  );

  Navigation.registerComponent(
    NavigationScreenNames.OVERLAY_ITEM_PICKER_SCREEN,
    () => OverlayItemPicker,
    () => gestureHandlerRootHOC(OverlayItemPicker),
  );

  Navigation.registerComponent(
    NavigationScreenNames.NOTIFICATION_OVERLAY_SCREEN,
    () => NotificationOverlay,
    () => gestureHandlerRootHOC(NotificationOverlay),
  );

  Navigation.registerComponent(
    NavigationScreenNames.OVERLAY_POPUP,
    () => OverlayPopup,
    () => gestureHandlerRootHOC(OverlayPopup),
  );

  Navigation.registerComponent(
    NavigationScreenNames.DELETE_OVERLAY,
    () => DeleteAccountOverlay,
    () => gestureHandlerRootHOC(DeleteAccountOverlay),
  );

  Navigation.registerComponent(
    NavigationScreenNames.OVERLAY_MESSAGE,
    () => OverlayMessage,
    () => gestureHandlerRootHOC(OverlayMessage),
  );

  Navigation.registerComponent(
    NavigationScreenNames.ZONEID_POPUP,
    () => ZoneIDPopup,
    () => gestureHandlerRootHOC(ZoneIDPopup),
  );


  Navigation.registerComponent(
    NavigationScreenNames.RATE_OVERLAY,
    () => OverlayRatePopup,
    () => gestureHandlerRootHOC(OverlayRatePopup),
  );

  Navigation.registerComponent(
    NavigationScreenNames.OVERLAY_REACTIVATE,
    () => OverlayReactivate,
    () => gestureHandlerRootHOC(OverlayReactivate),
  );

  Navigation.registerComponent(
    NavigationScreenNames.HELP_SUPPORT,
    () => HelpSupport,
    () => gestureHandlerRootHOC(HelpSupport),
  );

  Navigation.registerComponent(
    NavigationScreenNames.TERMS_AND_CONDITIONS_SCREEN,
    () => screen(TermsAndConditions, withTopBar('overlay')),
    () => gestureHandlerRootHOC(TermsAndConditions)
  );

  Navigation.registerComponent(NavigationScreenNames.LANGUAGE_SCREEN,
    () => screen(LanguageScreen, withTopBar('overlay')),
    () => gestureHandlerRootHOC(LanguageScreen),
  );

};