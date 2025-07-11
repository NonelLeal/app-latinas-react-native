// @ts-nocheck
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

export default function HomeScreen() {
  // Estados para controlar o fluxo da aplicação
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  // Estados para o AuthScreen
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Estados para o LocationService
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  // Estados para o ServiceSelection
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceTotal, setServiceTotal] = useState(0);
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');

  // Estados para o CleanerSelection
  const [selectedCleanerId, setSelectedCleanerId] = useState(null);

  // Dados das faxineiras
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
      description: 'Profissional experiente e dedicada',
      available: true
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
      description: 'Especialista em limpeza detalhada',
      available: true
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
      description: 'Experiente em ambientes comerciais',
      available: false
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
      description: 'Cuidadosa com detalhes',
      available: true
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
      description: 'Especialista em limpezas pesadas',
      available: true
    }
  ];

  // Dados dos serviços
  const services = [
    {
      id: '1a',
      name: 'Limpeza de geladeira',
      price: 25,
      description: 'Limpeza interna e externa',
    },
    {
      id: '1b',
      name: 'Limpeza de forno',
      price: 20,
      description: 'Limpeza interna completa',
    },
    {
      id: '1c',
      name: 'Organização de armários',
      price: 30,
      description: 'Organizar roupas e utensílios',
    },
    {
      id: '1d',
      name: 'Limpeza de janelas',
      price: 15,
      description: 'Limpeza interna das janelas',
    },
  ];

  const commercialServices = [
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
    },
  ];

  const additionalServices = [
    {
      id: '2a',
      name: 'Limpeza de carpetes',
      price: 40,
      description: 'Aspiração profunda de carpetes',
    },
    {
      id: '2b',
      name: 'Limpeza de vidros externos',
      price: 35,
      description: 'Fachada e janelas externas',
    },
    {
      id: '2c',
      name: 'Desinfecção COVID-19',
      price: 50,
      description: 'Desinfecção com produtos específicos',
    },
    {
      id: '2d',
      name: 'Limpeza noturna',
      price: 30,
      description: 'Adicional para horário noturno',
    },
  ];

  // Funções do AuthScreen
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório';
      }

      if (!formData.phone) {
        newErrors.phone = 'Telefone é obrigatório';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = {
        id: 'user_' + Date.now(),
        name: isLogin ? formData.email.split('@')[0] : formData.name,
        email: formData.email,
        phone: formData.phone || '(11) 99999-9999'
      };

      setUserData(user);
      setIsLoggedIn(true);
      setCurrentScreen('home');

      Alert.alert(
        isLogin ? 'Login realizado!' : 'Cadastro realizado!',
        `Bem-vindo${isLogin ? ' de volta' : ''}, ${user.name}!`
      );

    } catch (error) {
      Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: formData.email,
      password: '',
      name: '',
      phone: '',
      confirmPassword: ''
    });
  };

  // Funções do LocationService
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    setTimeout(() => {
      const mockLocation = {
        address: 'Setor Comercial Sul, Brasília - DF',
        coordinates: { lat: -15.7942, lng: -47.8822 },
        city: 'Brasília',
        state: 'DF'
      };
      
      setCurrentLocation(mockLocation);
      setLocationLoading(false);
    }, 2000);
  };

  const handleManualLocation = () => {
    if (!manualAddress.trim()) {
      Alert.alert('Erro', 'Por favor, digite um endereço.');
      return;
    }

    const location = {
      address: manualAddress,
      coordinates: { lat: -15.7942, lng: -47.8822 },
      city: 'Brasília',
      state: 'DF'
    };

    setUserLocation(location);
    setCurrentScreen('home');
    Alert.alert('Sucesso!', 'Localização definida com sucesso!');
  };

  const handleLocationConfirm = () => {
    if (!currentLocation) {
      Alert.alert('Erro', 'Por favor, obtenha sua localização primeiro.');
      return;
    }

    setUserLocation(currentLocation);
    setCurrentScreen('home');
    Alert.alert('Sucesso!', 'Localização confirmada!');
  };

  // Funções do ServiceSelection
  const toggleService = (service) => {
    const isSelected = selectedServices.find(s => s.id === service.id);
    let newServices;
    
    if (isSelected) {
      newServices = selectedServices.filter(s => s.id !== service.id);
    } else {
      newServices = [...selectedServices, service];
    }
    
    setSelectedServices(newServices);
    
    const total = newServices.reduce((sum, s) => sum + s.price, 0);
    setServiceTotal(total);
  };

  const handleServiceConfirm = () => {
    if (selectedServices.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um serviço.');
      return;
    }

    if (!serviceDate || !serviceTime) {
      Alert.alert('Atenção', 'Selecione data e horário para o serviço.');
      return;
    }

    const serviceData = {
      services: selectedServices,
      total: serviceTotal,
      date: serviceDate,
      time: serviceTime
    };

    setSelectedService(serviceData);
    setCurrentScreen('cleaner');
    
    Alert.alert(
      'Serviços Selecionados!',
      `${selectedServices.length} serviço(s) - Total: R$ ${serviceTotal}`
    );
  };

  // Funções do CleanerSelection
  const handleSelectCleaner = (cleanerId) => {
    setSelectedCleanerId(cleanerId);
  };

  const handleCleanerConfirm = () => {
    if (!selectedCleanerId) {
      Alert.alert('Atenção', 'Por favor, selecione uma faxineira.');
      return;
    }

    const cleaner = cleaners.find(c => c.id === selectedCleanerId);
    setSelectedCleaner(cleaner);
    setCurrentScreen('chat');
    
    Alert.alert(
      'Faxineira Selecionada!',
      `${cleaner.name} foi selecionada. Você pode conversar com ela agora!`
    );
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

  // Componente AuthScreen inline
  const renderAuthScreen = () => (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.authHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.authTitle}>
            {isLogin ? 'Bem-vindo de volta!' : 'Criar conta'}
          </Text>
          <Text style={styles.authSubtitle}>
            {isLogin ? 'Faça login para continuar' : 'Cadastre-se para começar'}
          </Text>
        </View>

        <View style={styles.authForm}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Digite seu email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha *</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Digite sua senha"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {!isLogin && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar senha *</Text>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone *</Text>
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              </View>
            </>
          )}

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButton} onPress={toggleMode}>
            <Text style={styles.switchButtonText}>
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
              <Text style={styles.switchButtonHighlight}>
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // Componente LocationService inline
  const renderLocationScreen = () => (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.authTitle}>Sua Localização</Text>
        <Text style={styles.authSubtitle}>Para encontrar faxineiras próximas a você</Text>
      </View>

      <ScrollView style={styles.authForm}>
        <View style={styles.locationSection}>
          <Text style={styles.locationSectionTitle}>🎯 Localização Automática</Text>
          <Text style={styles.locationDescription}>
            Permita o acesso à sua localização para encontrar faxineiras próximas
          </Text>
          
          <TouchableOpacity 
            style={[styles.locationButton, locationLoading && styles.submitButtonDisabled]}
            onPress={getCurrentLocation}
            disabled={locationLoading}
          >
            <Text style={styles.locationButtonText}>
              {locationLoading ? 'Obtendo localização...' : '📍 Obter Minha Localização'}
            </Text>
          </TouchableOpacity>

          {currentLocation && (
            <View style={styles.locationResult}>
              <Text style={styles.locationResultTitle}>✅ Localização encontrada:</Text>
              <Text style={styles.locationResultText}>{currentLocation.address}</Text>
              <TouchableOpacity 
                style={styles.confirmLocationButton}
                onPress={handleLocationConfirm}
              >
                <Text style={styles.confirmLocationText}>Confirmar Localização</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.locationSection}>
          <Text style={styles.locationSectionTitle}>📝 Digite Manualmente</Text>
          <Text style={styles.locationDescription}>
            Digite seu endereço, bairro ou cidade
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Asa Norte, Brasília - DF"
              value={manualAddress}
              onChangeText={setManualAddress}
              multiline
            />
          </View>

          <TouchableOpacity 
            style={styles.locationButton}
            onPress={handleManualLocation}
          >
            <Text style={styles.locationButtonText}>📍 Definir Localização</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationSection}>
          <Text style={styles.locationSectionTitle}>🌟 Localizações Populares</Text>
          
          {[
            'Asa Norte, Brasília - DF',
            'Asa Sul, Brasília - DF', 
            'Águas Claras, Brasília - DF',
            'Taguatinga, Brasília - DF',
            'Ceilândia, Brasília - DF'
          ].map((location, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestedLocation}
              onPress={() => {
                const locationData = {
                  address: location,
                  coordinates: { lat: -15.7942, lng: -47.8822 },
                  city: 'Brasília',
                  state: 'DF'
                };
                setUserLocation(locationData);
                setCurrentScreen('home');
                Alert.alert('Sucesso!', `Localização definida: ${location}`);
              }}
            >
              <Text style={styles.suggestedLocationText}>📍 {location}</Text>
              <Text style={styles.suggestedLocationArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  // Componente ServiceSelection inline
  const renderServiceScreen = () => (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.authTitle}>Escolha os Serviços</Text>
        <Text style={styles.authSubtitle}>Selecione o que precisa ser feito</Text>
      </View>

      <ScrollView style={styles.authForm}>
        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryTitle}>🏠 Serviços Residenciais</Text>
          
          {services.map((service) => {
            const isSelected = selectedServices.find(s => s.id === service.id);
            return (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceOption,
                  isSelected && styles.serviceOptionSelected
                ]}
                onPress={() => toggleService(service)}
              >
                <View style={styles.serviceOptionContent}>
                  <View style={styles.serviceOptionInfo}>
                    <Text style={styles.serviceOptionName}>{service.name}</Text>
                    <Text style={styles.serviceOptionDescription}>{service.description}</Text>
                  </View>
                  <View style={styles.serviceOptionRight}>
                    <Text style={styles.serviceOptionPrice}>R$ {service.price}</Text>
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryTitle}>⭐ Serviços Adicionais</Text>
          
          {additionalServices.map((service) => {
            const isSelected = selectedServices.find(s => s.id === service.id);
            return (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceOption,
                  isSelected && styles.serviceOptionSelected
                ]}
                onPress={() => toggleService(service)}
              >
                <View style={styles.serviceOptionContent}>
                  <View style={styles.serviceOptionInfo}>
                    <Text style={styles.serviceOptionName}>{service.name}</Text>
                    <Text style={styles.serviceOptionDescription}>{service.description}</Text>
                  </View>
                  <View style={styles.serviceOptionRight}>
                    <Text style={styles.serviceOptionPrice}>R$ {service.price}</Text>
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryTitle}>📅 Data e Horário</Text>
          
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <Text style={styles.label}>Data do Serviço</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={serviceDate}
                onChangeText={setServiceDate}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.dateTimeItem}>
              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={serviceTime}
                onChangeText={setServiceTime}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.suggestedTimesTitle}>⏰ Horários Populares:</Text>
          <View style={styles.suggestedTimes}>
            {['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  serviceTime === time && styles.timeButtonSelected
                ]}
                onPress={() => setServiceTime(time)}
              >
                <Text style={[
                  styles.timeButtonText,
                  serviceTime === time && styles.timeButtonTextSelected
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedServices.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>📋 Resumo do Pedido</Text>
            
            {selectedServices.map((service) => (
              <View key={service.id} style={styles.summaryItem}>
                <Text style={styles.summaryItemName}>{service.name}</Text>
                <Text style={styles.summaryItemPrice}>R$ {service.price}</Text>
              </View>
            ))}
            
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalText}>Total: R$ {serviceTotal}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[
            styles.confirmButton,
            selectedServices.length === 0 && styles.confirmButtonDisabled
          ]}
          onPress={handleServiceConfirm}
          disabled={selectedServices.length === 0}
        >
          <Text style={styles.confirmButtonText}>
            {selectedServices.length === 0 
              ? 'Selecione pelo menos um serviço'
              : `Continuar com ${selectedServices.length} serviço(s) - R$ ${serviceTotal}`
            }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Componente CleanerSelection inline completo
  const renderCleanerScreen = () => (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('service')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.authTitle}>Escolha sua Faxineira</Text>
        <Text style={styles.authSubtitle}>Selecione a profissional ideal para você</Text>
      </View>

      <ScrollView style={styles.authForm} showsVerticalScrollIndicator={false}>
        {cleaners.map((cleaner) => (
          <View key={cleaner.id} style={styles.cleanerCard}>
            <TouchableOpacity
              style={[
                styles.cleanerCardContent,
                selectedCleanerId === cleaner.id && styles.cleanerCardSelected,
                !cleaner.available && styles.cleanerCardUnavailable
              ]}
              onPress={() => cleaner.available && handleSelectCleaner(cleaner.id)}
              disabled={!cleaner.available}
            >
              <View style={styles.cleanerHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{cleaner.avatar}</Text>
                  {!cleaner.available && (
                    <View style={styles.unavailableBadge}>
                      <Text style={styles.unavailableText}>Indisponível</Text>
                    </View>
                  )}
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
                  <Text style={styles.priceValue}>R$ {cleaner.price}</Text>
                  <Text style={styles.priceUnit}>por hora</Text>
                </View>
              </View>

              <Text style={styles.cleanerDescription}>{cleaner.description}</Text>

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

              {selectedCleanerId === cleaner.id && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedText}>✓ Selecionada</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}

        {/* Resumo do Serviço */}
        {selectedService && (
          <View style={styles.serviceResumeContainer}>
            <Text style={styles.serviceResumeTitle}>📋 Resumo do Seu Pedido</Text>
            
            <View style={styles.serviceResumeItem}>
              <Text style={styles.serviceResumeLabel}>Serviços:</Text>
              <Text style={styles.serviceResumeValue}>
                {selectedServices.length} serviço(s) - R$ {serviceTotal}
              </Text>
            </View>
            
            <View style={styles.serviceResumeItem}>
              <Text style={styles.serviceResumeLabel}>Data:</Text>
              <Text style={styles.serviceResumeValue}>{serviceDate}</Text>
            </View>
            
            <View style={styles.serviceResumeItem}>
              <Text style={styles.serviceResumeLabel}>Horário:</Text>
              <Text style={styles.serviceResumeValue}>{serviceTime}</Text>
            </View>

            {selectedCleanerId && (
              <View style={styles.serviceResumeItem}>
                <Text style={styles.serviceResumeLabel}>Faxineira:</Text>
                <Text style={styles.serviceResumeValue}>
                  {cleaners.find(c => c.id === selectedCleanerId)?.name}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Botão Confirmar */}
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            !selectedCleanerId && styles.confirmButtonDisabled
          ]}
          onPress={handleCleanerConfirm}
          disabled={!selectedCleanerId}
        >
          <Text style={styles.confirmButtonText}>
            {selectedCleanerId 
              ? `Continuar com ${cleaners.find(c => c.id === selectedCleanerId)?.name}`
              : 'Selecione uma faxineira'
            }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Renderizar a tela atual
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return renderAuthScreen();
      case 'location':
        return renderLocationScreen();
      case 'service':
        return renderServiceScreen();
      case 'cleaner':
        return renderCleanerScreen();
      case 'chat':
        return renderChatScreen();
      default:
        return renderHomeScreen();
    }
  };

  // Componente Chat inline (temporário)
  const renderChatScreen = () => (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('cleaner')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.authTitle}>Chat com {selectedCleaner?.name}</Text>
        <Text style={styles.authSubtitle}>Em breve - chat em tempo real</Text>
      </View>
      
      <View style={styles.authForm}>
        <View style={styles.locationSection}>
          <Text style={styles.locationSectionTitle}>💬 Chat</Text>
          <Text style={styles.locationDescription}>
            Funcionalidade de chat será implementada na próxima fase
          </Text>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.locationButtonText}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Tela inicial (home)
  const renderHomeScreen = () => (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#ff6b6b" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latinas</Text>
        <Text style={styles.headerSubtitle}>Serviços de Limpeza</Text>
        
        {!isLoggedIn && (
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => setCurrentScreen('auth')}
          >
            <Text style={styles.loginButtonText}>Entrar / Cadastrar</Text>
          </TouchableOpacity>
        )}
        
        {isLoggedIn && userData && (
          <View>
            <Text style={styles.welcomeText}>Bem-vindo, {userData.name}! 👋</Text>
            <Text style={styles.emailText}>{userData.email}</Text>
            
            {userLocation && (
              <Text style={styles.infoText}>📍 {userLocation.address}</Text>
            )}
            
            {selectedService && (
              <Text style={styles.infoText}>🎯 {selectedServices.length || 0} serviço(s) - R$ {serviceTotal || selectedService.total || selectedService.price || 0}</Text>
            )}
            
            {selectedCleaner && (
              <Text style={styles.infoText}>👩‍💼 {selectedCleaner.name}</Text>
            )}
            
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={[styles.smallButton, {marginRight: 5}]} 
                onPress={() => setCurrentScreen('location')}
              >
                <Text style={styles.smallButtonText}>📍</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, {marginRight: 5}]} 
                onPress={() => setCurrentScreen('service')}
              >
                <Text style={styles.smallButtonText}>🎯</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.smallButton, {marginRight: 5}]} 
                onPress={() => setCurrentScreen('cleaner')}
              >
                <Text style={styles.smallButtonText}>👩‍💼</Text>
              </TouchableOpacity>
              
              {selectedCleaner && (
                <TouchableOpacity 
                  style={[styles.smallButton, {marginRight: 5}]} 
                  onPress={() => setCurrentScreen('chat')}
                >
                  <Text style={styles.smallButtonText}>💬</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.smallButton} 
                onPress={() => {
                  setIsLoggedIn(false);
                  setUserData(null);
                  setUserLocation(null);
                  setSelectedService(null);
                  setSelectedCleaner(null);
                }}
              >
                <Text style={styles.smallButtonText}>🚪</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços Residenciais</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => {
                if (isLoggedIn) {
                  setCurrentScreen('service');
                } else {
                  setCurrentScreen('auth');
                }
              }}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>R$ {service.price}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços Comerciais</Text>
        {commercialServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.commercialCard}
            onPress={() => {
              if (isLoggedIn) {
                setCurrentScreen('service');
              } else {
                setCurrentScreen('auth');
              }
            }}
          >
            <View style={styles.commercialHeader}>
              <Text style={styles.commercialIcon}>{service.icon}</Text>
              <View style={styles.commercialInfo}>
                <Text style={styles.commercialName}>{service.name}</Text>
                <Text style={styles.commercialDuration}>{service.duration}</Text>
              </View>
              <Text style={styles.commercialPrice}>R$ {service.basePrice}</Text>
            </View>
            <Text style={styles.commercialDescription}>{service.description}</Text>
            <View style={styles.includesList}>
              {service.includes.map((item, index) => (
                <Text key={index} style={styles.includesItem}>• {item}</Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços Adicionais</Text>
        <View style={styles.servicesGrid}>
          {additionalServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => {
                if (isLoggedIn) {
                  setCurrentScreen('service');
                } else {
                  setCurrentScreen('auth');
                }
              }}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>R$ {service.price}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pós-Obra</Text>
        <TouchableOpacity
          style={styles.posObraCard}
          onPress={() => {
            if (isLoggedIn) {
              setCurrentScreen('service');
            } else {
              setCurrentScreen('auth');
            }
          }}
        >
          <Text style={styles.posObraIcon}>🔨</Text>
          <Text style={styles.posObraName}>Pós-Obra</Text>
          <Text style={styles.posObraDescription}>Limpeza completa após obras e reformas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>💝 Feito com amor para facilitar sua vida</Text>
        <Text style={styles.footerSubtext}>
          {isLoggedIn ? `Logado como: ${userData?.name}` : 'Faça login para acessar todos os recursos!'}
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.appContainer}>
      {renderCurrentScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  emailText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 3,
    opacity: 0.9,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  smallButtonText: {
    color: 'white',
    fontSize: 16,
  },

  // Auth Screen Styles
  authHeader: {
    backgroundColor: '#ff6b6b',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  authForm: {
    padding: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  switchButtonText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  switchButtonHighlight: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },

  // Location Screen Styles
  locationSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  locationButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationResult: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  locationResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  locationResultText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  confirmLocationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmLocationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestedLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  suggestedLocationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  suggestedLocationArrow: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },

  // Service Selection Styles
  serviceCategory: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceOption: {
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  serviceOptionSelected: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff5f5',
  },
  serviceOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceOptionInfo: {
    flex: 1,
  },
  serviceOptionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceOptionDescription: {
    fontSize: 14,
    color: '#666',
  },
  serviceOptionRight: {
    alignItems: 'center',
  },
  serviceOptionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  suggestedTimesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  suggestedTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginRight: 8,
    marginBottom: 8,
  },
  timeButtonSelected: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeButtonTextSelected: {
    color: 'white',
  },
  summaryContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  summaryItemName: {
    fontSize: 14,
    color: '#333',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  summaryTotal: {
    paddingTop: 15,
    alignItems: 'center',
  },
  summaryTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  confirmButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Cleaner Selection Styles
  cleanerCard: {
    marginBottom: 15,
  },
  cleanerCardContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cleanerCardSelected: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff5f5',
  },
  cleanerCardUnavailable: {
    opacity: 0.6,
    backgroundColor: '#f8f9fa',
  },
  cleanerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 15,
    position: 'relative',
  },
  avatar: {
    fontSize: 40,
  },
  unavailableBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unavailableText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
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
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
  },
  cleanerDescription: {
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
  serviceResumeContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  serviceResumeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceResumeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  serviceResumeLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  serviceResumeValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },

  // Other styles
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
  commercialCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commercialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commercialIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  commercialInfo: {
    flex: 1,
  },
  commercialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commercialDuration: {
    fontSize: 14,
    color: '#666',
  },
  commercialPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  commercialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  includesList: {
    marginTop: 5,
  },
  includesItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  posObraCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posObraIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  posObraName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  posObraDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});