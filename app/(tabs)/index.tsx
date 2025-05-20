import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/400/300?grayscale&blur=1' }}
        style={styles.heroImage}
      />

      <Text style={styles.title}>Bienvenue sur le Mini Blog 📝</Text>
      <Text style={styles.subtitle}>Découvrez des articles passionnants et les avis des lecteurs.</Text>

      <Link href="/articles" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voir les articles</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
