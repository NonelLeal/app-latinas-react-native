import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Sou a Sofia, assistente virtual da Latinas! 🌟\n\nComo posso ajudar você hoje?\n\n💡 Posso ajudar com:\n• Agendar limpeza\n• Encontrar faxineiras próximas\n• Explicar nossos serviços\n• Calcular orçamentos\n• Emergências de limpeza',
    isUser: false,
    timestamp: new Date(),
  }
];

const aiResponses = {
  'agendar': 'Perfeito! Vou te ajudar a agendar uma limpeza 📅\n\nQual tipo de limpeza você precisa?\n\n🏠 Residencial (R$ 80-150)\n🏢 Comercial (R$ 120-300)\n🚧 Pós-obra (R$ 200-400)\n✨ Organização (R$ 60-120)\n\nDigite o número ou nome do serviço!',
  'preço': 'Nossos preços são super justos! 💰\n\n🏠 Limpeza Residencial: R$ 80-150\n🏢 Limpeza Comercial: R$ 120-300\n🚧 Limpeza Pós-obra: R$ 200-400\n✨ Organização: R$ 60-120\n🪟 Limpeza de Vidros: R$ 40-80\n💪 Limpeza Pesada: R$ 150-250\n\nOs valores variam por tamanho do ambiente. Quer um orçamento específico?',
  'urgente': 'Entendi que é urgente! 🚨\n\nTemos faxineiras disponíveis AGORA:\n\n👩🏽 Maria González - 15 min (R$ 25/h)\n👩🏻 Ana Rodriguez - 20 min (R$ 28/h)\n\nQual você escolhe? Posso conectar você direto com ela!',
  'como': 'É super fácil! Vou explicar nosso processo: 📱\n\n1️⃣ Escolha o serviço no app\n2️⃣ Selecione data e horário\n3️⃣ Confirme localização\n4️⃣ Escolha a profissional\n5️⃣ Acompanhe em tempo real\n6️⃣ Pague direto no app\n7️⃣ Avalie o serviço\n\nQuer que eu te ajude com algum passo?',
  'horário': 'Trabalhamos todos os dias! ⏰\n\n🌅 Segunda a Sexta: 7h às 19h\n🌞 Sábados: 8h às 18h\n🌄 Domingos: 9h às 17h\n\n🚨 Para emergências, temos profissionais 24h!\n\nQue horário funciona melhor pra você?',
  'pagamento': 'Aceitamos várias formas de pagamento! 💳\n\n✅ Cartão de crédito/débito\n✅ PIX (5% desconto!)\n✅ Dinheiro\n✅ PayPal\n✅ PicPay\n\n💰 Pagamento seguro direto no app\n🔒 Dados protegidos\n\nPrefere qual forma?',
  'default': 'Hmm, não entendi muito bem... 🤔\n\nMas posso te ajudar com:\n\n📅 Agendar limpeza\n💰 Consultar preços\n🚨 Limpeza urgente\n📍 Encontrar faxineiras próximas\n💳 Formas de pagamento\n⏰ Horários de funcionamento\n\nO que você gostaria de saber?'
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('agendar') || msg.includes('marcar')) return aiResponses.agendar;
    if (msg.includes('preço') || msg.includes('valor') || msg.includes('custo')) return aiResponses.preço;
    if (msg.includes('urgente') || msg.includes('emergência') || msg.includes('agora')) return aiResponses.urgente;
    if (msg.includes('como') || msg.includes('funciona') || msg.includes('processo')) return aiResponses.como;
    if (msg.includes('horário') || msg.includes('hora') || msg.includes('quando')) return aiResponses.horário;
    if (msg.includes('pagamento') || msg.includes('pagar') || msg.includes('cartão')) return aiResponses.pagamento;
    
    return aiResponses.default;
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simula IA digitando
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { text: '📅 Agendar', action: () => setInputText('Quero agendar uma limpeza') },
    { text: '💰 Preços', action: () => setInputText('Quais são os preços?') },
    { text: '🚨 Urgente', action: () => setInputText('Preciso de limpeza urgente') },
    { text: '📍 Próximas', action: () => Alert.alert('Redirecionando', 'Abrindo mapa de faxineiras próximas...') }
  ];

  const renderMessage = ({ item }: { item: Message }) => (
    <ThemedView style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      {!item.isUser && (
        <ThemedText style={styles.aiName}>🤖 Sofia (IA)</ThemedText>
      )}
      <ThemedText style={[
        styles.messageText,
        item.isUser ? styles.userText : styles.aiText
      ]}>
        {item.text}
      </ThemedText>
      <ThemedText style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </ThemedText>
    </ThemedView>
  );

  const renderTyping = () => (
    isTyping ? (
      <ThemedView style={[styles.messageContainer, styles.aiMessage]}>
        <ThemedText style={styles.aiName}>🤖 Sofia (IA)</ThemedText>
        <ThemedText style={styles.typingText}>Sofia está digitando...</ThemedText>
      </ThemedView>
    ) : null
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>💬 Chat com IA</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Sofia - Assistente Virtual</ThemedText>
        <ThemedView style={styles.statusIndicator}>
          <ThemedText style={styles.statusText}>🟢 Online - Resposta instantânea</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Ações rápidas */}
      <ThemedView style={styles.quickActionsContainer}>
        {quickActions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.quickAction}
            onPress={action.action}
          >
            <ThemedText style={styles.quickActionText}>{action.text}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        ListFooterComponent={renderTyping}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <ThemedText style={styles.sendButtonText}>📤</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
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
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
  statusIndicator: {
    marginTop: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: 'white',
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  aiName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#2196F3',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    fontSize: 18,
  },
});