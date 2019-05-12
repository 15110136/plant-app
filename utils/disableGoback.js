import { NavigationActions, StackActions } from 'react-navigation';

const disableGoBack = (routerName, navigation, role) => {
  const resetAction = StackActions.reset({
    index: 0,
    key: role,
    actions: [
      navigation.navigate(NavigationActions.navigate({
        routeName: role,
        action: NavigationActions.navigate({ routeName: routerName })
      }))
    ]
  });
  navigation.dispatch(resetAction);
}

export { disableGoBack }