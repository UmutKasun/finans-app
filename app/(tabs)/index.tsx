import 'react-native-url-polyfill/auto'
import { useEffect, useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, SafeAreaView
} from 'react-native'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [userName, setUserName] = useState('')
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setUserName(user.email.split('@')[0])
    })
  }, [])

  const monthlyIncome = 15000
  const monthlyExpense = 8400
  const netPosition = 42500
  const spendingLimit = 12000
  const spendingPercent = (monthlyExpense / spendingLimit) * 100

  const recentTransactions = [
    { id: 1, title: 'Market', amount: -320, category: '🛒', date: 'Bugün' },
    { id: 2, title: 'Maaş', amount: 15000, category: '💰', date: 'Dün' },
    { id: 3, title: 'Kira', amount: -4500, category: '🏠', date: '15 Ara' },
    { id: 4, title: 'Kahve', amount: -85, category: '☕', date: '14 Ara' },
    { id: 5, title: 'Fatura', amount: -320, category: '⚡', date: '13 Ara' },
  ]

  return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Merhaba, {userName} 👋</Text>
              <Text style={styles.date}>{today}</Text>
            </View>
          </View>

          {/* Net Pozisyon */}
          <View style={styles.netCard}>
            <Text style={styles.netLabel}>Net Finansal Pozisyon</Text>
            <Text style={styles.netAmount}>₺{netPosition.toLocaleString('tr-TR')}</Text>
            <Text style={styles.netSub}>Varlıklar − Borçlar</Text>
          </View>

          {/* Gelir / Gider */}
          <View style={styles.row}>
            <View style={[styles.miniCard, { borderLeftColor: '#2ECC71' }]}>
              <Text style={styles.miniLabel}>Aylık Gelir</Text>
              <Text style={[styles.miniAmount, { color: '#2ECC71' }]}>
                ₺{monthlyIncome.toLocaleString('tr-TR')}
              </Text>
              <Text style={styles.miniSub}>↑ Bu ay</Text>
            </View>
            <View style={[styles.miniCard, { borderLeftColor: '#E74C3C' }]}>
              <Text style={styles.miniLabel}>Aylık Gider</Text>
              <Text style={[styles.miniAmount, { color: '#E74C3C' }]}>
                ₺{monthlyExpense.toLocaleString('tr-TR')}
              </Text>
              <Text style={styles.miniSub}>↓ Bu ay</Text>
            </View>
          </View>

          {/* Harcama Limiti */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Bu Ay Harcama</Text>
              <Text style={styles.cardValue}>
                ₺{monthlyExpense.toLocaleString('tr-TR')} / ₺{spendingLimit.toLocaleString('tr-TR')}
              </Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${spendingPercent}%` }]} />
            </View>
            <Text style={styles.progressLabel}>%{spendingPercent.toFixed(0)} kullanıldı</Text>
          </View>

          {/* Son İşlemler */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Son İşlemler</Text>
            {recentTransactions.map(tx => (
                <View key={tx.id} style={styles.txRow}>
                  <View style={styles.txLeft}>
                    <Text style={styles.txIcon}>{tx.category}</Text>
                    <View>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDate}>{tx.date}</Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.txAmount,
                    { color: tx.amount > 0 ? '#2ECC71' : '#E74C3C' }
                  ]}>
                    {tx.amount > 0 ? '+' : ''}₺{Math.abs(tx.amount).toLocaleString('tr-TR')}
                  </Text>
                </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Hızlı Ekle Butonu */}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+ İşlem Ekle</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f6f8' },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20, marginTop: 8
  },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e' },
  date: { fontSize: 13, color: '#888', marginTop: 2 },
  netCard: {
    backgroundColor: '#2ECC71', borderRadius: 20,
    padding: 24, marginBottom: 16, alignItems: 'center',
    shadowColor: '#2ECC71', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6
  },
  netLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  netAmount: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  netSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  miniCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16,
    padding: 16, borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3
  },
  miniLabel: { fontSize: 12, color: '#888', marginBottom: 6 },
  miniAmount: { fontSize: 20, fontWeight: 'bold' },
  miniSub: { fontSize: 11, color: '#aaa', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    marginBottom: 16, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a2e' },
  cardValue: { fontSize: 13, color: '#666' },
  progressBg: {
    height: 10, backgroundColor: '#f0f0f0',
    borderRadius: 10, overflow: 'hidden'
  },
  progressFill: {
    height: '100%', backgroundColor: '#2ECC71', borderRadius: 10
  },
  progressLabel: { fontSize: 12, color: '#888', marginTop: 6 },
  txRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5'
  },
  txLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  txIcon: { fontSize: 24 },
  txTitle: { fontSize: 15, fontWeight: '500', color: '#1a1a2e' },
  txDate: { fontSize: 12, color: '#aaa', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '600' },
  fab: {
    position: 'absolute', bottom: 24, left: 24, right: 24,
    backgroundColor: '#2ECC71', borderRadius: 16,
    padding: 18, alignItems: 'center',
    shadowColor: '#2ECC71', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
  },
  fabText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
})