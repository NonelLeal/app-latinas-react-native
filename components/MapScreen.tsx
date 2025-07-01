import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Simulação de faxineiras próximas
const nearbyCleaners = [
  {
    id: '1',
    name: 'Maria González',
    rating: 4.9,
    distance: '0.8 km',
    price: 'R$ 25/hora',
    available: true,
    specialty: 'Residencial',
    photo: '👩🏽',
    eta: '15 min',
    completedJobs: 127
  },
  {
    id: '2', 
    name: 'Ana Rodriguez',
    rating: 4.8,
    distance: '1.2 km',
    price: 'R$ 28/hora',
    available: true,
    specialty: 'Comercial',
    photo: '👩🏻',
    eta: '20 min',
    completedJobs: 89
  },
  {
    id: '3',
    name: 'Carmen Silva',
    rating: 5.0,
    distance: '1.5 km', 
    price: 'R$ 30/hora',
    available: false,
    specialty: 'Pós-obra',
    photo: '👩🏾',
    eta: '45 min',
    completedJobs: 203
  },
  {
    id: '4',
    name: 'Lucia Santos',
    rating: 4.7,
    distance: '2.1 km',
    price: 'R$ 26/hora',
    available: true,
    specialty: 'Organização',
    photo: '👩🏽‍🦱',
    eta: '25 min',
    completedJobs: 156
  }
];

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState('Formosa, GO');
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  useEffect(() => {
    // Simula obtenção da localização
    Alert.alert('Localização', 'Localizando faxineiras próximas...');
  }, []);

  const handleSelectCleaner = (cleaner: any) => {
    setSelectedCleaner(cleaner);
    Alert.alert(
      `${cleaner.name}`,
      `Especialidade: ${cleaner.specialty}\nAvaliação: ${cleaner.rating}⭐\nDistância: ${cleaner.distance}\nPreço: ${cleaner.price}\nTempo: ${cleaner.eta}\n\n${cleaner.available ? 'Disponível agora!' : 'Ocupada'}`,
      [
        { text: 'Voltar', style: 'cancel' },
        { text: 'Ver Perfil', onPress: () => viewProfile(cleaner) },
        ...(cleaner.available ? [{ text: 'Solicitar', onPress: () => requestCleaner(cleaner) }] : [])
      ]
    );
  };

  const viewProfile = (cleaner: any) => {
    Alert.alert(
      `Perfil: ${cleaner.name}`,
      `${cleaner.photo} ${cleaner.name}\n\n⭐ ${cleaner.rating} (${cleaner.completedJobs} trabalhos)\n📍 ${cleaner.distance} de você\n💰 ${cleaner.price}\n🧹 Especialista em ${cleaner.specialty}\n\n"Trabalho com amor e dedicação há 5 anos. Sua casa será tratada como se fosse minha!"`
    );
  };

  const requestCleaner = (cleaner: any) => {
    Alert.alert(
      'Solicitação Enviada!',
      `${cleaner.name} foi notificada da sua solicitação.\n\nEla chegará em aproximadamente ${cleaner.eta}.\n\nVocê receberá atualizações em tempo real.`,
      [
        { text: 'OK', onPress: () => trackCleaner(cleaner) }
      ]
    );
  };

  const trackCleaner = (cleaner: any) => {
    Alert.alert(
      'Rastreamento Ativo',
      `📍 ${cleaner.name} está a caminho!\n\nStatus: Saindo de casa\nTempo estimado: ${cleaner.eta}\nDistância: ${cleaner.distance}\n\n💬 Chat ativo - você pode conversar com ela!`
    );
  };

  const renderCleaner = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.cleanerCard, !item.available && styles.unavailableCard]}
      onPress={() => handleSelectCleaner(item)}
    >
      <ThemedView style={styles.cleanerHeader}>
        <ThemedText style={styles.cleanerPhoto}>{item.photo}</ThemedText>
        <ThemedView style={styles.cleanerInfo}>
          <ThemedText style={styles.cleanerName}>{item.name}</ThemedText>
          <ThemedText style={styles.cleanerRating}>⭐ {item.rating} ({item.completedJobs} trabalhos)</ThemedText>
          <ThemedText style={styles.cleanerSpecialty}>🧹 {item.specialty}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.cleanerDetails}>
          <ThemedText style={styles.cleanerDistance}>📍 {item.distance}</ThemedText>
          <ThemedText style={styles.cleanerPrice}>{item.price}</ThemedText>
          <ThemedText style={[styles.cleanerStatus, item.available ? styles.available : styles.busy]}>
            {item.available ? `🟢 ${item.eta}` : '🔴 Ocupada'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header com localização */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Faxineiras Próximas 📍</ThemedText>
        <ThemedText style={styles.location}>📍 {userLocation}</ThemedText>
      </ThemedView>

      {/* Mapa simulado */}
      <ThemedView style={styles.mapContainer}>
        <ThemedText style={styles.mapText}>🗺️ MAPA INTERATIVO</ThemedText>
        <ThemedText style={styles.mapSubtext}>Sua localização e faxineiras disponíveis</ThemedText>
        <ThemedView style={styles.mapSimulation}>
          <ThemedText style={styles.mapPin}>📍 Você</ThemedText>
          <ThemedText style={styles.mapPin}>👩🏽 Maria (0.8km)</ThemedText>
          <ThemedText style={styles.mapPin}>👩🏻 Ana (1.2km)</ThemedText>
          <ThemedText style={styles.mapPin}>👩🏾 Carmen (1.5km)</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Lista de faxineiras */}
      <ThemedView style={styles.listHeader}>
        <ThemedText style={styles.listTitle}>Disponíveis Agora ({nearbyCleaners.filter(c => c.available).length})</ThemedText>
      </ThemedView>

      <FlatList
        data={nearbyCleaners}
        renderItem={renderCleaner}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* Botão de emergência */}
      <TouchableOpacity style={styles.emergencyButton}>
        <ThemedText style={styles.emergencyText}>🚨 Limpeza Urgente</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  mapContainer: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  mapSimulation: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mapPin: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  listHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cleanerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unavailableCard: {
    opacity: 0.6,
  },
  cleanerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cleanerPhoto: {
    fontSize: 32,
    marginRight: 12,
  },
  cleanerInfo: {
    flex: 1,
  },
  cleanerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cleanerRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cleanerSpecialty: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 2,
  },
  cleanerDetails: {
    alignItems: 'flex-end',
  },
  cleanerDistance: {
    fontSize: 12,
    color: '#666',
  },
  cleanerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 2,
  },
  cleanerStatus: {
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  available: {
    backgroundColor: '#e8f5e8',
    color: '#4CAF50',
  },
  busy: {
    backgroundColor: '#ffeaea',
    color: '#f44336',
  },
  emergencyButton: {
    backgroundColor: '#f44336',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  emergencyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});