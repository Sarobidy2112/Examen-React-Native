import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ArticlesScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState([]); // ids des articles favoris
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des articles:', error);
        setLoading(false);
      });
  }, []);

  // Fonction pour ajouter/enlever un article des favoris
  function toggleFavorite(articleId) {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(articleId)) {
        return prevFavorites.filter((id) => id !== articleId);
      } else {
        return [...prevFavorites, articleId];
      }
    });
  }

  // Articles filtrés selon l’état du filtre
  const displayedArticles = showFavoritesOnly
    ? articles.filter((article) => favorites.includes(article.id))
    : articles;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Chargement des articles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des articles</Text>

      {/* Bouton pour filtrer */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          showFavoritesOnly && styles.filterButtonActive,
        ]}
        onPress={() => setShowFavoritesOnly((prev) => !prev)}
      >
        <Text
          style={[
            styles.filterButtonText,
            showFavoritesOnly && styles.filterButtonTextActive,
          ]}
        >
          {showFavoritesOnly ? 'Voir tous les articles' : 'Voir favoris seulement'}
        </Text>
      </TouchableOpacity>

      {displayedArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {showFavoritesOnly
              ? 'Aucun article favori.'
              : 'Aucun article à afficher.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayedArticles}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Link href={`/articles/${item.id}`} asChild>
              <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <Image
                  source={{ uri: `https://picsum.photos/400/200?random=${item.id}` }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.cardBody}>
                    {item.body}
                  </Text>

                  <View style={styles.cardFooter}>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleFavorite(item.id);
                      }}
                      style={[
                        styles.favoriteButton,
                        favorites.includes(item.id) && styles.favoriteButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.favoriteButtonText,
                          favorites.includes(item.id) && styles.favoriteButtonTextActive,
                        ]}
                      >
                        {favorites.includes(item.id) ? '♥ Favori' : '♡ Ajouter aux favoris'}
                      </Text>
                    </TouchableOpacity>

                    <Link href={`/articles/${item.id}`} asChild>
                      <TouchableOpacity style={styles.detailButton}>
                        <Text style={styles.detailButtonText}>Voir les détails</Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#111',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    marginHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  favoriteButtonActive: {
    backgroundColor: '#007bff',
  },
  favoriteButtonText: {
    color: '#007bff',
    fontWeight: '600',
  },
  favoriteButtonTextActive: {
    color: 'white',
  },
  detailButton: {
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  detailButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
