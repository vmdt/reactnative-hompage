import * as React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const profile = {
  name: 'Vo Minh Dat',
  studentId: '21110822',
  email: 'vmdt03@gmail.com',
  github: 'https://github.com/vmdt',
  summary: "I am a Backend Developer 😊",
}

let timerId = null;

function HomeScreen({ navigation }) {
  useFocusEffect(() => { // this hook runs the effect when the screen is focused
    timerId = setTimeout(() => {
      navigation.navigate('Details', { profile });
    }, 5000);

    return () => { clearTimeout(timerId) }
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to my journey!</Text>
      <Text>Now, let's see what my information is</Text>
      <Text>Waiting for 5s</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { profile } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.profileContainer}>
        <Image
          source={require('./assets/pig_cry.jpg')}
          style={styles.profilePicture}
        />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileInfo}>Student ID: {profile.studentId}</Text>
        <Text style={styles.profileInfo}>Email: {profile.email}</Text>
        <Text style={styles.profileInfo} onPress={() => Linking.openURL(profile.github)}>
          GitHub: {profile.github}
        </Text>
        <Text style={styles.profileSummary}>{profile.summary}</Text>
      </View>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );

}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  profileSummary: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default App;