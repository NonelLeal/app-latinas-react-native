// app/(tabs)/index.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router'; // Importar o router para navegação

export default function MainServicesScreen() { // Nome do componente alterado para refletir a nova função
  // A lógica de estado 'currentScreen' e a navegação interna foram removidas.
  // O acesso a outras telas agora será feito puramente pelo Expo Router.

  const services = [
    { id: '1', name: 'Limpeza Residencial', price: 'R$ 80-150', icon: '🏠' },
    { id: '2', name: 'Limpeza Comercial', price: 'R$ 120-300', icon: '🏢' },
    { id: '3', name: 'Pós-Obra', price: 'R$ 200-400', icon: '🚧' },
    { id: '4', name: 'Organização', price: 'R$ 60-120', icon: '✨' }
  ];

  const selectService = (service: any) => {
    Alert.alert(
      service.name,
      `Preço: ${service.price}\n\nComo deseja prosseguir?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Faxineiras', onPress: () => router.push('/(app)/cleaners') }, // Rota corrigida
        { text: 'Fale com a Equipe', onPress: () => router.push('/(app)/sac') } // Rota corrigida
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.mapBg}>
        <ThemedText style={styles.mapBgText}>🗺️ Brasília, DF</ThemedText>
        <ThemedView style={styles.bgPins}>
          <ThemedText>📍</ThemedText>
          <ThemedText>👩🏽</ThemedText>
          <ThemedText>👩🏻</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.topBar}>
          <ThemedText style={styles.appTitle}>Latinas</ThemedText>
          <ThemedText style={styles.subtitle}>Serviços de Limpeza</ThemedText>
          <ThemedText>📍 Brasília, DF • 3 profissionais próximas</ThemedText>
          <TouchableOpacity style={styles.headerWhatsappBtn} onPress={() => router.push('/(app)/sac')}>
            <ThemedText style={styles.headerWhatsappText}>💬 Fale com nossa equipe</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.mainCard}>
          <ThemedText style={styles.cardTitle}>O que você precisa?</ThemedText>
          <ThemedText style={styles.cardSubtitle}>Toque para orçamento via chat</ThemedText>

          <ThemedView style={styles.grid}>
            {services.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceBtn}
                onPress={() => selectService(service)}
              >
                <ThemedText style={styles.icon}>{service.icon}</ThemedText>
                <ThemedText style={styles.serviceName}>{service.name}</ThemedText>
                <ThemedText style={styles.servicePrice}>{service.price}</ThemedText>
                <ThemedText style={styles.whatsappLabel}>💬 Chat</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedView style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push('/(app)/cleaners')} // Rota corrigida
            >
              <ThemedText style={styles.primaryText}>🗺️ Ver Faxineiras</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.whatsappBtn}
              onPress={() => router.push('/(app)/sac')} // Rota corrigida
            >
              <ThemedText style={styles.whatsappBtnText}>💬 Chat</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <TouchableOpacity
          style={styles.emergency}
          onPress={() => {
            Alert.alert(
              '🚨 Limpeza Urgente',
              'Você será direcionado(a) ao chat com nossa equipe para atendimento imediato!',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Chat Urgente', onPress: () => router.push('/(app)/sac') } // Rota corrigida
              ]
            );
          }}
        >
          <ThemedText style={styles.emergencyText}>🚨 Urgente</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mapBg: { position: 'absolute', width: '100%', height: '100%', backgroundColor: '#e8f4f8' },
  mapBgText: { position: 'absolute', top: 50, left: 20, fontSize: 16, fontWeight: 'bold' },
  bgPins: { position: 'absolute', top: 100, left: 100, gap: 20 },
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.95)' },
  topBar: { padding: 20, paddingTop: 50, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#2196F3', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 4 },
  headerWhatsappBtn: { backgroundColor: '#25D366', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  headerWhatsappText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  mainCard: { backgroundColor: 'white', margin: 20, borderRadius: 16, padding: 20, elevation: 5 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  serviceBtn: { width: '47%', backgroundColor: '#f8f9fa', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e3e3e3' },
  icon: { fontSize: 24, marginBottom: 8 },
  serviceName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  servicePrice: { fontSize: 12, color: '#4CAF50', fontWeight: '600', marginBottom: 4 },
  whatsappLabel: { fontSize: 10, color: '#25D366', fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 12 },
  primaryBtn: { flex: 1, backgroundColor: '#2196F3', padding: 16, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  whatsappBtn: { flex: 1, backgroundColor: '#25D366', padding: 16, borderRadius: 12, alignItems: 'center' },
  whatsappBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  emergency: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#f44336', padding: 16, borderRadius: 30, elevation: 8 },
  emergencyText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  // Estes estilos foram movidos ou alterados do original index.tsx e não são usados aqui, mas mantidos para a tela de faxineiras
  header: { backgroundColor: '#2196F3', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
  backBtn: { color: 'white', fontSize: 16, marginRight: 16 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', flex: 1 },
  whatsappHeaderBtn: { color: 'white', fontSize: 14, fontWeight: 'bold', backgroundColor: '#25D366', padding: 8, borderRadius: 6 },
  mapArea: { flex: 1, backgroundColor: '#e8f4f8', padding: 20 },
  mapTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  mapSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  pins: { gap: 10 },
  pin: { backgroundColor: 'white', padding: 8, borderRadius: 8, fontSize: 12 },
  listArea: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: 400 },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  cleanerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8f9fa', borderRadius: 12, marginBottom: 12 },
  cleanerName: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#4CAF50', fontWeight: 'bold' },
  cleanerActions: { alignItems: 'flex-end' },
  available: { fontSize: 12, color: '#4CAF50' },
  whatsappIcon: { fontSize: 12, color: '#25D366', fontWeight: 'bold', marginTop: 4 },
  centralWhatsappBtn: { backgroundColor: '#25D366', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  centralWhatsappText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  // Estilos que foram movidos ou alterados
  chatArea: { flex: 1, padding: 16 },
  aiMsg: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 16, alignSelf: 'flex-start', maxWidth: '85%' },
  userMsg: { backgroundColor: '#2196F3', padding: 16, borderRadius: 16, marginBottom: 16, alignSelf: 'flex-end', maxWidth: '85%' },
  aiName: { fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  // userText: { color: 'white' }, // Já existe na bolha de usuário
  quickActions: { flexDirection: 'row', padding: 16, gap: 12, backgroundColor: 'white' },
  quickBtn: { flex: 1, backgroundColor: '#e3f2fd', padding: 12, borderRadius: 8, alignItems: 'center' },
  whatsappQuickText: { color: '#25D366', fontWeight: 'bold' }
});