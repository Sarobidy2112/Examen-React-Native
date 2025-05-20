import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de l'article:", error);
        setLoading(false);
      });

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des commentaires:', error);
        setLoadingComments(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Chargement de l'article...</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image fictive de l'article */}
      <Image
        source={{ uri: `https://picsum.photos/800/400?random=${id}` }}
        style={styles.articleImage}
        resizeMode="cover"
      />

      {/* Contenu de l'article */}
      <View style={styles.articleContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.body}>{article.body}</Text>
      </View>

      {/* Commentaires */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>
          💬 Commentaires ({comments.length})
        </Text>

        {loadingComments ? (
          <ActivityIndicator size="small" style={styles.commentsLoading} />
        ) : comments.length > 0 ? (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                {/* Avatar généré fictivement */}
                <Image
                  source={{ uri: `https://i.pravatar.cc/100?u=${item.email}` }}
                  style={styles.avatar}
                />
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentName}>{item.name}</Text>
                  <Text style={styles.commentEmail}>{item.email}</Text>
                  <Text style={styles.commentBody}>{item.body}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noComments}>
            Aucun commentaire pour cet article.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  articleImage: {
    width: '100%',
    height: 220,
  },
  articleContainer: {
    padding: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 15,
    color: '#111',
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    lineHeight: 28,
    color: '#444',
  },
  commentsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  commentEmail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  noComments: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  commentsLoading: {
    marginTop: 20,
  },
});
