import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export function EarningsScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('earnings')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t('todayEarnings')}</Text>
        <Text style={styles.cardAmount}>0 UZS</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t('totalEarnings')}</Text>
        <Text style={styles.cardAmount}>0 UZS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#007AFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
