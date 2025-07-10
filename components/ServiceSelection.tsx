// @ts-nocheck
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, View, Text } from 'react-native';

export default function ServiceSelection({ onServiceSelected }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const services = [
    {
      id: '1',
      name: 'Limpeza Residencial',
      icon: '🏠',
      basePrice: 80,
      duration: '2-4 horas',
      description: 'Limpeza completa de residências, apartamentos e casas',
      includes: [
        'Limpeza de todos os cômodos',
        'Banheiros e cozinha',
        'Aspirar/varrer/passar pano',
        'Retirada do lixo'
      ],
      options: [
        { id: '1a', name: 'Limpeza de geladeira', price: 25, description: 'Limpeza interna e externa' },
        { id: '1b', name: 'Limpeza de forno', price: 20, description: 'Limpeza interna completa' },
        { id: '1c', name: 'Organização de armários', price: 30, description: 'Organizar roupas e utensílios' },
        { id: '1d', name: 'Limpeza de janelas', price: 15, description: 'Limpeza interna das janelas' }
      ]
    },
    {
      id: '2',
      name: 'Limpeza Comercial',
      icon: '🏢',
      basePrice: 120,
      duration: '3-6 horas',
      description: 'Limpeza de escritórios, lojas e estabelecimentos comerciais',
      includes: [
        'Limpeza de salas e escritórios',
        'Banheiros corporativos',
        'Áreas comuns',
        'Limpeza de mesas e equipamentos'
      ],
      options: [
        { id: '2a', name: 'Limpeza de carpetes', price: 40, description: 'Aspiração profunda de carpetes' },
        { id: '2b', name: 'Limpeza de vidros externos', price: 35, description: 'Fachada e janelas externas' },
        { id: '2c', name: 'Desinfecção COVID-19', price: 50, description: 'Desinfecção com produtos específicos' },
        { id: '2d', name: 'Limpeza noturna', price: 30, description: 'Adicional para horário noturno' }
      ]
    },
    {
      id: '3',
      name: 'Pós-Obra',
      icon: '🚧',
      basePrice: 200,
      duration: '4-8 horas',
      description: 'Limpeza pesada após reformas e construções',
      includes: [
        'Remoção de poeira de obra',
        'Limpeza de respingos de tinta',
        'Limpeza profunda de pisos',
        'Limpeza de esquadrias'
      ],
      options: [
        { id: '3a', name: 'Remoção de cola/adesivos', price: 60, description: 'Remoção de resíduos de cola' },
        { id: '3b', name: 'Limpeza de azulejos', price: 45, description: 'Remoção de cimento e rejunte' },
        { id: '3c', name: 'Enceramento de pisos', price: 80, description: 'Enceramento e lustração' },
        { id: '3d', name: 'Limpeza de luminária', price: 35, description: 'Limpeza de lustres e luminárias' }
      ]
    },
    {
      id: '4',
      name: 'Organização',
      icon: '✨',
      basePrice: 60,
      duration: '2-3 horas',
      description: 'Organização de ambientes e otimização de espaços',
      includes: [
        'Organização de móveis',
        'Arrumação de objetos',
        'Otimização de espaços',
        'Dicas de organização'
      ],
      options: [
        { id: '4a', name: 'Organização de closet', price: 40, description: 'Organização completa de roupas' },
        { id: '4b', name: 'Organização de cozinha', price: 35, description: 'Utensílios e despensa' },
        { id: '4c', name: 'Organização infantil', price: 25, description: 'Quarto e brinquedos das crianças' },
        { id: '4d', name: 'Personal organizer', price: 100, description: 'Consultoria completa de organização' }
      ]
    }
  ];

  const toggleOption = (option) => {
    setSelectedOptions(prev => {
      const exists = prev.find(item => item.id === option.id);
      if (exists) {
        return prev.filter(item => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const optionsTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);
    return selectedService.basePrice + optionsTotal;
  };

  const handleContinue = () => {
    if (selectedService) {
      const total = calculateTotal();
      Alert.alert(
        'Serviço Selecionado! ✅',
        `${selectedService.name}\nTotal: R$ ${total}\n\nPróximo: Escolher profissional`,
        [
          { text: 'Voltar', style: 'cancel' },
          { text: 'Continuar', onPress: () => onServiceSelected(selectedService, selectedOptions, total) }
        ]
      );
    }
  };

  if (selectedService) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedService(null)}>
            <Text style={styles.backBtn}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{selectedService.icon} {selectedService.name}</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.baseServiceCard}>
            <Text style={styles.cardTitle}>Serviço Base</Text>
            <Text style={styles.serviceDescription}>{selectedService.description}</Text>
            <Text style={styles.duration}>⏱️ Duração: {selectedService.duration}</Text>
            <Text style={styles.basePrice}>R$ {selectedService.basePrice}</Text>
            
            <Text style={styles.includesTitle}>✅ Incluso:</Text>
            {selectedService.includes.map((item, index) => (
              <Text key={index} style={styles.includeItem}>• {item}</Text>
            ))}
          </View>

          <View style={styles.optionsCard}>
            <Text style={styles.cardTitle}>Serviços Adicionais</Text>
            <Text style={styles.optionsSubtitle}>Selecione os extras que desejar:</Text>
            
            {selectedService.options.map(option => {
              const isSelected = selectedOptions.find(item => item.id === option.id);
              return (
                <TouchableOpacity 
                  key={option.id}
                  style={[styles.optionItem, isSelected && styles.optionSelected]}
                  onPress={() => toggleOption(option)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionInfo}>
                      <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
                        {option.name}
                      </Text>
                      <Text style={styles.optionDescription}>{option.description}</Text>
                    </View>
                    <View style={styles.optionPrice}>
                      <Text style={[styles.optionPriceText, isSelected && styles.optionPriceSelected]}>
                        +R$ {option.price}
                      </Text>
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📋 Resumo do Pedido</Text>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{selectedService.name}</Text>
              <Text style={styles.summaryValue}>R$ {selectedService.basePrice}</Text>
            </View>
            
            {selectedOptions.map(option => (
              <View key={option.id} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>+ {option.name}</Text>
                <Text style={styles.summaryValue}>R$ {option.price}</Text>
              </View>
            ))}
            
            <View style={[styles.summaryItem, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>R$ {calculateTotal()}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueBtnText}>
              Continuar - R$ {calculateTotal()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧹 Escolha o Serviço</Text>
        <Text style={styles.subtitle}>Selecione o tipo de limpeza que precisa</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {services.map(service => (
          <TouchableOpacity 
            key={service.id}
            style={styles.serviceCard}
            onPress={() => setSelectedService(service)}
          >
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <View style={styles.servicePricing}>
                <Text style={styles.servicePrice}>R$ {service.basePrice}+</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
            </View>
            
            <View style={styles.serviceIncludes}>
              <Text style={styles.includesLabel}>Inclui:</Text>
              <Text style={styles.includesText}>
                {service.includes.slice(0, 2).join(' • ')}...
              </Text>
            </View>
            
            <View style={styles.serviceFooter}>
              <Text style={styles.viewDetailsText}>👆 Toque para ver detalhes</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#2196F3', padding: 20, paddingTop: 60 },
  backBtn: { color: 'white', fontSize: 16, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  subtitle: { fontSize: 16, color: 'white', opacity: 0.9 },
  content: { flex: 1, padding: 16 },
  serviceCard: { backgroundColor: 'white', borderRadius: 16, marginBottom: 16, padding: 20, elevation: 3 },
  serviceHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  serviceIcon: { fontSize: 32, marginRight: 16 },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  serviceDescription: { fontSize: 14, color: '#666', lineHeight: 20 },
  servicePricing: { alignItems: 'flex-end' },
  servicePrice: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
  serviceDuration: { fontSize: 12, color: '#666', marginTop: 2 },
  serviceIncludes: { backgroundColor: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 12 },
  includesLabel: { fontSize: 12, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  includesText: { fontSize: 12, color: '#666' },
  serviceFooter: { alignItems: 'center' },
  viewDetailsText: { fontSize: 12, color: '#2196F3', fontWeight: '500' },
  baseServiceCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  duration: { fontSize: 14, color: '#666', marginBottom: 8 },
  basePrice: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 16 },
  includesTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  includeItem: { fontSize: 14, color: '#666', marginBottom: 4 },
  optionsCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16 },
  optionsSubtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  optionItem: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, marginBottom: 12 },
  optionSelected: { borderColor: '#2196F3', backgroundColor: '#f3f8ff' },
  optionContent: { flexDirection: 'row', alignItems: 'center' },
  optionInfo: { flex: 1 },
  optionName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  optionNameSelected: { color: '#2196F3' },
  optionDescription: { fontSize: 12, color: '#666' },
  optionPrice: { alignItems: 'flex-end' },
  optionPriceText: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50', marginBottom: 8 },
  optionPriceSelected: { color: '#2196F3' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  summaryCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, color: '#333', fontWeight: '500' },
  summaryTotal: { borderTopWidth: 1, borderTopColor: '#eee', marginTop: 8, paddingTop: 12 },
  summaryTotalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  summaryTotalValue: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
  footer: { padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee' },
  continueBtn: { backgroundColor: '#2196F3', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  continueBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});