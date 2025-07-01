import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export function LatinasLogo() {
  return (
    <View style={styles.logoContainer}>
      {/* Sparkles */}
      <View style={styles.sparklesContainer}>
        <View style={[styles.sparkle, styles.sparkle1]}>
          <ThemedText style={styles.sparkleText}>✨</ThemedText>
        </View>
        <View style={[styles.sparkle, styles.sparkle2]}>
          <ThemedText style={styles.sparkleText}>💫</ThemedText>
        </View>
        <View style={[styles.sparkle, styles.sparkle3]}>
          <ThemedText style={styles.sparkleText}>⭐</ThemedText>
        </View>
        <View style={[styles.sparkle, styles.sparkle4]}>
          <ThemedText style={styles.sparkleText}>🌟</ThemedText>
        </View>
      </View>

      {/* Bubbles */}
      <View style={styles.bubblesContainer}>
        <View style={[styles.bubble, styles.bubble1]} />
        <View style={[styles.bubble, styles.bubble2]} />
        <View style={[styles.bubble, styles.bubble3]} />
      </View>

      {/* Main Logo Content */}
      <View style={styles.mainContent}>
        {/* House */}
        <View style={styles.house}>
          <ThemedText style={styles.houseText}>🏠</ThemedText>
        </View>
        
        {/* Brush/Cleaning */}
        <View style={styles.brush}>
          <ThemedText style={styles.brushText}>🧹</ThemedText>
        </View>
      </View>

      {/* Logo Text */}
      <View style={styles.textContainer}>
        <ThemedText style={styles.logoTitle}>LATINAS</ThemedText>
        <ThemedText style={styles.logoSubtitle}>Limpeza & Cuidado</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 290,
    height: 178,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  sparklesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  sparkle: {
    position: 'absolute',
  },
  
  sparkle1: {
    top: 20,
    left: 30,
  },
  
  sparkle2: {
    top: 30,
    right: 40,
  },
  
  sparkle3: {
    bottom: 40,
    left: 50,
  },
  
  sparkle4: {
    bottom: 30,
    right: 30,
  },
  
  sparkleText: {
    fontSize: 16,
  },
  
  bubblesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  bubble: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  bubble1: {
    width: 12,
    height: 12,
    top: 50,
    left: 80,
  },
  
  bubble2: {
    width: 8,
    height: 8,
    top: 70,
    right: 90,
  },
  
  bubble3: {
    width: 15,
    height: 15,
    bottom: 60,
    left: 120,
  },
  
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
  },
  
  house: {
    alignItems: 'center',
  },
  
  houseText: {
    fontSize: 32,
  },
  
  brush: {
    alignItems: 'center',
  },
  
  brushText: {
    fontSize: 28,
  },
  
  textContainer: {
    alignItems: 'center',
  },
  
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 2,
  },
  
  logoSubtitle: {
    fontSize: 12,
    color: '#1976D2',
    fontStyle: 'italic',
  },
});