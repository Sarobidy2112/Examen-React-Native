import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur le mini blog !</Text>
      <Link href="/articles" style={{ marginTop: 20, color: 'blue' }}>
        Voir les articles
      </Link>
    </View>
  );
}
