import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';

export function OrdersScreen() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('orders')}</Text>
        <View style={styles.onlineToggle}>
          <Text style={styles.onlineText}>
            {isOnline ? t('online') : t('offline')}
          </Text>
          <Switch value={isOnline} onValueChange={setIsOnline} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>{t('newOrders')}</Text>
        <Text style={styles.emptyText}>No new orders available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  onlineText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
