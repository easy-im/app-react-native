import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AntProvider } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import router from '@/router';
import store from '@/store';
import Storage from '@/storage/base';
import InitApp from '@/components/InitApp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userStr = await AsyncStorage.getItem('CURRENT_USER');
      const user = userStr ? JSON.parse(userStr) : null;
      SplashScreen.hide();
      if (user) {
        setCurrentUser(user);
      }
      setLoaded(true);
    })();
    return Storage.closeAll;
  }, []);

  const TabScreen = () => {
    const { tabBar } = router;
    const { screenOptions, tabBarOptions, list } = tabBar;
    return (
      <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
        {list.map((item, index) => {
          return <Tab.Screen key={index} name={item.name} component={item.component} options={item.options} />;
        })}
      </Tab.Navigator>
    );
  };

  const { pages } = router;
  const { screenOptions, list } = pages;
  const initialRouteName = currentUser ? 'TabNav' : 'Login';

  if (!loaded) {
    return null;
  }

  return (
    <AntProvider>
      <ReduxProvider store={store}>
        <InitApp />
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions} initialRouteName={initialRouteName}>
            <Stack.Screen
              name="TabNav"
              component={TabScreen}
              options={{
                headerShown: false,
              }}
            />
            {list.map((item, index) => {
              return <Stack.Screen key={index} name={item.name} component={item.component} options={item.options} />;
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </AntProvider>
  );
}
