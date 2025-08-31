import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router'; // Importar o router para navegação

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function SACScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Sou a assistente virtual Latinas. Como posso ajudar hoje? 😊', sender: 'ai' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newUserMessage: Message = {
        id: String(messages.length + 1),
        text: inputText.trim(),
        sender: 'user',
      };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputText('');

      // Simulação de resposta da IA (muito básica)
      setTimeout(() => {
        const aiResponse: Message = {
          id: String(messages.length + 2),
          text: `Entendi que você perguntou sobre: "${newUserMessage.text}". No momento, minhas respostas são limitadas. Por favor, especifique sua dúvida ou tente uma pergunta mais simples.`,
          sender: 'ai',
        };
        if (newUserMessage.text.toLowerCase().includes('preço') || newUserMessage.text.toLowerCase().includes('custo')) {
          aiResponse.text = 'Nossos preços para serviços de limpeza variam de R$80 a R$400, dependendo do tipo de serviço (residencial, comercial, pós-obra, organização). Para um orçamento detalhado, por favor, clique em "Ver Faxineiras" na tela inicial ou na aba "Explore" para ver mais informações sobre cada tipo de serviço.';
        } else if (newUserMessage.text.toLowerCase().includes('faxineira') || newUserMessage.text.toLowerCase().includes('contratar')) {
          aiResponse.text = 'Para contratar uma faxineira, você pode ir na tela "Ver Faxineiras" e escolher a profissional mais próxima. Ou, para agendamento, entre em contato com nossa equipe de suporte (clique no botão "Fale com nossa equipe" para a Central de Atendimento).';
        } else if (newUserMessage.text.toLowerCase().includes('localização')) {
            aiResponse.text = 'No momento, estamos atendendo apenas em Brasília, DF.';
        } else if (newUserMessage.text.toLowerCase().includes('urgente')) {
            aiResponse.text = 'Para serviços urgentes, por favor, vá na tela inicial e clique no botão "🚨 Urgente" para ser direcionado ao atendimento prioritário.';
        }
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <ThemedView style={styles.fullContainer}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={styles.backBtn}>← Voltar</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>💬 Fale com nossa equipe</ThemedText>
        <View style={styles.headerRightPlaceholder} /> {/* Espaçador para centralizar o título */}
      </ThemedView>

      <ScrollView contentContainerStyle={styles.chatArea}>
        {messages.map((msg) => (
          <ThemedView
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <ThemedText style={msg.sender === 'user' ? styles.userText : styles.aiText}>
              {msg.text}
            </ThemedText>
          </ThemedView>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <ThemedText style={styles.sendButtonText}>Enviar</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2196F3', // Cor do cabeçalho da sua tela de mapa/chat
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para distribuir os itens
  },
  backBtn: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRightPlaceholder: { // Novo estilo para preencher o espaço e centralizar
    width: 60, // Ajuste para o tamanho do botão "voltar"
  },
  chatArea: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-end', // Alinha as mensagens ao fundo
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    minHeight: 40,
    maxHeight: 120, // Limita a altura do input
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});