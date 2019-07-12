import { createStackNavigator, createAppContainer, createSwitchNavigator, NavigationScreenProps, createDrawerNavigator } from "react-navigation";
import Login from "./components/Login"
import Main from "./components/Main"
import Drawer from "./components/Drawer"
import Detalle from "./components/Detalle"

const AppNavigator = createStackNavigator({
  Main1: {
    screen: Main
  },
  Detalle: {
    screen: Detalle
  }
});

const DrawerNav = createDrawerNavigator({
  Main: AppNavigator
}, {
  contentComponent: Drawer
})

const SwitchNavigator = createSwitchNavigator({
  Logged: DrawerNav,
  NotLogged: Login
}, {
  initialRouteName: "NotLogged"
});

export default createAppContainer(SwitchNavigator);