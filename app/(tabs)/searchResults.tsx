import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import SearchHeader from './searchHeader';

const SearchResults = () => {
  const { query } = useLocalSearchParams();
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const mockResults = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(mockResults);
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchHeader />
      <View style={{ marginTop: 150, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
          Resultados para: {query}
        </Text>

        {results.length === 0 ? (
          <Text style={{ fontSize: 16, color: '#666' }}>
            Nenhum resultado encontrado para: <Text style={{ fontWeight: 'bold' }}>{query}</Text>
          </Text>
        ) : (
          <FlatList
            data={results}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            )}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default SearchResults;
