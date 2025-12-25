import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';

export function SettingsScreen() {
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Language</Text>
        <Text style={styles.settingValue}>Uzbek</Text>
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
});
