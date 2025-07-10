// @ts-nocheck
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, Image, View, Text } from 'react-native';

export default function CleanerSelection({ onCleanerSelected }) {
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const cleaners = [
    {
      id: '1',
      name: 'Maria Silva',
      rating: 4.9,
      experience: '5 anos',
      price: 25,
      avatar: '👩🏻‍💼',
      specialties: ['Limpeza geral', 'Organização'],
      reviews: 127,
      description: 'Profissional experiente e dedicada'
    },
    {
      id: '2',
      name: 'Ana Santos',
      rating: 4.8,
      experience: '3 anos',
      price: 22,
      avatar: '👩🏽‍💼',
      specialties: ['Limpeza profunda', 'Cozinha'],
      reviews: 89,
      description: 'Especialista em limpeza detalhada'
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      rating: 4.7,
      experience: '7 anos',
      price: 28,
      avatar: '👩🏾‍💼',
      specialties: ['Limpeza comercial', 'Escritórios'],
      reviews: 203,
      description: 'Experiente em ambientes comerciais'
    },
    {
      id: '4',
      name: 'Lucia Ferreira',
      rating: 4.9,
      experience: '4 anos',
      price: 24,
      avatar: '👩🏼‍💼',
      specialties: ['Limpeza residencial', 'Banheiros'],
      reviews: 156,
      description: 'Cuidadosa com detalhes'
    },
    {
      id: '5',
      name: 'Rosa Costa',
      rating: 4.6,
      experience: '6 anos',
      price: 26,
      avatar: '👩🏻‍💼',
      specialties: ['Limpeza pós-obra', 'Janelas'],
      reviews: 98,
      description: 'Especialista em limpezas pesadas'
    }
  ];

  const handleSelectCleaner = (cleaner) => {
    setSelectedCleaner(cleaner);
  };

  const handleConfirmSelection = () => {
    if (!selectedCleaner) {
      Alert.alert('Atenção', 'Por favor, selecione uma faxineira.');
      return;
    }
    onCleanerSelected(selectedCleaner);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    return stars.join('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Escolha sua Faxineira</Text>
        <Text style={styles.subtitle}>Selecione a profissional ideal para você</Text>
      </View>

      <ScrollView style={styles.cleanersList} showsVerticalScrollIndicator={false}>
        {cleaners.map((cleaner) => (
          <TouchableOpacity
            key={cleaner.id}
            style={[
              styles.cleanerCard,
              selectedCleaner?.id === cleaner.id && styles.selectedCard
            ]}
            onPress={() => handleSelectCleaner(cleaner)}
          >
            <View style={styles.cleanerHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{cleaner.avatar}</Text>
              </View>
              <View style={styles.cleanerInfo}>
                <Text style={styles.cleanerName}>{cleaner.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{renderStars(cleaner.rating)}</Text>
                  <Text style={styles.ratingText}>{cleaner.rating} ({cleaner.reviews} avaliações)</Text>
                </View>
                <Text style={styles.experience}>{cleaner.experience} de experiência</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>R$ {cleaner.price}</Text>
                <Text style={styles.priceUnit}>por hora</Text>
              </View>
            </View>

            <Text style={styles.description}>{cleaner.description}</Text>

            <View style={styles.specialtiesContainer}>
              <Text style={styles.specialtiesTitle}>Especialidades:</Text>
              <View style={styles.specialtiesList}>
                {cleaner.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>

            {selectedCleaner?.id === cleaner.id && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>✓ Selecionada</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedCleaner && styles.disabledButton]}
          onPress={handleConfirmSelection}
          disabled={!selectedCleaner}
        >
          <Text style={styles.confirmButtonText}>
            {selectedCleaner ? `Continuar com ${selectedCleaner.name}` : 'Selecione uma faxineira'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  cleanersList: {
    flex: 1,
    padding: 15,
  },
  cleanerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff5f5',
  },
  cleanerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    fontSize: 40,
  },
  cleanerInfo: {
    flex: 1,
  },
  cleanerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  specialtiesContainer: {
    marginBottom: 10,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 5,
  },
  specialtyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  selectedIndicator: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});