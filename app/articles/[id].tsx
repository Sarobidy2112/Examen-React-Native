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
      {/* Image fictive */}
      <Image
        source={{ uri: `https://picsum.photos/600/300?random=${id}` }}
        style={styles.articleImage}
        resizeMode="cover"
      />

      {/* Article */}
      <View style={styles.articleContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.body}>{article.body}</Text>
      </View>

      {/* Commentaires */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>
          Commentaires ({comments.length})
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
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentEmail}>{item.email}</Text>
                <Text style={styles.commentBody}>{item.body}</Text>
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
    backgroundColor: '#ffffff',
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
    height: 200,
  },
  articleContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111',
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
  commentsSection: {
    paddingHorizontal: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 15,
  },
  commentContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  commentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  commentEmail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
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
