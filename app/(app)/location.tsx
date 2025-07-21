// app/(app)/location.tsx
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator, View, Text } from 'react-native';
import { router } from 'expo-router'; // Importar o router para navegação

// Esta é a sua nova tela de localização
export default function LocationScreen() { // Renomeado de LocationService para LocationScreen
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableCities = [
    { id: '1', name: 'Brasília', state: 'DF', coords: { lat: -15.7942, lng: -47.8822 } },
    { id: '2', name: 'Goiânia', state: 'GO', coords: { lat: -16.6869, lng: -49.2648 } },
    { id: '3', name: 'Anápolis', state: 'GO', coords: { lat: -16.3267, lng: -48.9531 } },
    { id: '4', name: 'Formosa', state: 'GO', coords: { lat: -15.5372, lng: -47.3343 } },
    { id: '5', name: 'Águas Claras', state: 'DF', coords: { lat: -15.8342, lng: -48.0262 } }
  ];

  const getCurrentLocation = async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay de rede

      const mockLocation = {
        latitude: -15.7942,
        longitude: -47.8822,
        address: 'SQN 410, Bloco A, Asa Norte',
        city: 'Brasília',
        state: 'DF'
      };

      setCurrentLocation(mockLocation);
      // Futuramente: aqui você salvaria a localização no Firebase para o usuário logado
      Alert.alert(
        'Localização encontrada! 📍',
        `${mockLocation.address}\n${mockLocation.city}, ${mockLocation.state}`
      );

    } catch (error) {
      Alert.alert(
        'Erro na localização',
        'Não foi possível obter sua localização. Selecione manualmente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectCity = (city: any) => {
    const selectedLocation = {
      latitude: city.coords.lat,
      longitude: city.coords.lng,
      address: `Centro de ${city.name}`,
      city: city.name,
      state: city.state
    };

    setCurrentLocation(selectedLocation);
    // Futuramente: aqui você salvaria a localização no Firebase para o usuário logado
    Alert.alert(
      'Localização selecionada! ✅',
      `${selectedLocation.city}, ${selectedLocation.state}`
    );
  };

  const requestLocationPermission = () => {
    Alert.alert(
      'Permissão de Localização 📍',
      'Permitir que o app acesse sua localização para encontrar faxineiras próximas?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Permitir', onPress: getCurrentLocation }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📍 Sua Localização</Text>
        <Text style={styles.subtitle}>
          {currentLocation
            ? `${currentLocation.city}, ${currentLocation.state}`
            : 'Selecione sua localização para encontrar faxineiras próximas'
          }
        </Text>
      </View>

      {currentLocation && (
        <View style={styles.currentLocationCard}>
          <Text style={styles.currentLocationTitle}>📍 Localização Atual</Text>
          <Text style={styles.currentLocationText}>
            {currentLocation.address}
          </Text>
          <Text style={styles.currentLocationCity}>
            {currentLocation.city}, {currentLocation.state}
          </Text>

          <TouchableOpacity
            style={styles.changeLocationBtn}
            onPress={() => setCurrentLocation(null)}
          >
            <Text style={styles.changeLocationText}>Alterar localização</Text>
          </TouchableOpacity>
        </View>
      )}

      {!currentLocation && (
        <View style={styles.locationOptions}>
          <TouchableOpacity
            style={styles.gpsBtn}
            onPress={requestLocationPermission}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.gpsBtnText}>🛰️ Usar GPS</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>ou</Text>

          <Text style={styles.manualTitle}>Selecionar manualmente:</Text>

          <View style={styles.citiesGrid}>
            {availableCities.map(city => (
              <TouchableOpacity
                key={city.id}
                style={styles.cityBtn}
                onPress={() => selectCity(city)}
              >
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityState}>{city.state}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.coverageInfo}>
        <Text style={styles.coverageTitle}>🌟 Cidades atendidas:</Text>
        <Text style={styles.coverageText}>
          Brasília (DF) • Goiânia (GO) • Anápolis (GO) • Formosa (GO) • Águas Claras (DF)
        </Text>
        <Text style={styles.coverageNote}>
          💡 Sua cidade não está na lista? Entre em contato conosco!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#2196F3', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  subtitle: { fontSize: 16, color: 'white', opacity: 0.9, textAlign: 'center' },
  currentLocationCard: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  currentLocationTitle: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginBottom: 8 },
  currentLocationText: { fontSize: 16, color: '#333', marginBottom: 4 },
  currentLocationCity: { fontSize: 14, color: '#666', marginBottom: 12 },
  changeLocationBtn: { alignSelf: 'flex-start' },
  changeLocationText: { color: '#2196F3', fontSize: 14, textDecorationLine: 'underline' },
  locationOptions: { padding: 20 },
  gpsBtn: { backgroundColor: '#4CAF50', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  gpsBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  orText: { textAlign: 'center', fontSize: 16, color: '#666', marginBottom: 20 },
  manualTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  citiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cityBtn: { backgroundColor: 'white', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', minWidth: '45%', alignItems: 'center' },
  cityName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cityState: { fontSize: 12, color: '#666', marginTop: 2 },
  coverageInfo: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#e3f2fd' },
  coverageTitle: { fontSize: 16, fontWeight: 'bold', color: '#2196F3', marginBottom: 8 },
  coverageText: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 12 },
  coverageNote: { fontSize: 12, color: '#666', fontStyle: 'italic' },
});