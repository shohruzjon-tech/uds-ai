import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export function StatisticsScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('statistics')}</Text>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Total Rides</Text>
        <Text style={styles.statValue}>0</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Total Deliveries</Text>
        <Text style={styles.statValue}>0</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Rating</Text>
        <Text style={styles.statValue}>5.0 ⭐</Text>
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});
