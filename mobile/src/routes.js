import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Project from './pages/Project';
import Register from './pages/Register';
import LoggedOut from './pages/LoggedOut';
import Login from './pages/Login';
import RegisterProject from './pages/RegisterProject';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode="none"
                screenOptions={ {cardStyle: {backgroundColor:'#f0f0f5'} } }
            >
                <AppStack.Screen name="LoggedOut" component={LoggedOut} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Project" component={Project} />
                <AppStack.Screen name="RegisterProject" component={RegisterProject} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;