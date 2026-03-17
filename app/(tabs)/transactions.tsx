import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'

type Transaction = {
    id: string
    amount: number
    type: string
    category: string
    note: string
    date: string
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)

    useEffect(() => {
        fetchTransactions()
    }, [])

    async function fetchTransactions() {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user?.id)
            .order('date', { ascending: false })

        if (data) {
            setTransactions(data)
            const income = data.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
            const expense = data.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
            setTotalIncome(income)
            setTotalExpense(expense)
        }
    }

    const categoryIcons: { [key: string]: string } = {
        'Market': '🛒', 'Yemek': '🍽️', 'Kahve': '☕',
        'Ulaşım': '🚗', 'Kira': '🏠', 'Fatura': '⚡',
        'Giyim': '👕', 'Eğlence': '🎮', 'Sağlık': '💊',
        'Eğitim': '📚', 'Maaş': '💰', 'Diğer': '📦',
    }

    function formatDate(dateStr: string) {
        const date = new Date(dateStr)
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>İşlemler</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Bu Ay</Text>
                    </TouchableOpacity>
                </View>

                {/* Özet */}
                <View style={styles.row}>
                    <View style={[styles.miniCard, { borderLeftColor: '#2ECC71' }]}>
                        <Text style={styles.miniLabel}>Toplam Gelir</Text>
                        <Text style={[styles.miniAmount, { color: '#2ECC71' }]}>
                            ₺{totalIncome.toLocaleString('tr-TR')}
                        </Text>
                    </View>
                    <View style={[styles.miniCard, { borderLeftColor: '#E74C3C' }]}>
                        <Text style={styles.miniLabel}>Toplam Gider</Text>
                        <Text style={[styles.miniAmount, { color: '#E74C3C' }]}>
                            ₺{totalExpense.toLocaleString('tr-TR')}
                        </Text>
                    </View>
                </View>

                {/* İşlem Listesi */}
                {transactions.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>💳</Text>
                        <Text style={styles.emptyTitle}>Henüz işlem yok</Text>
                        <Text style={styles.emptyText}>Aşağıdaki butona tıklayarak ilk işlemini ekle</Text>
                    </View>
                ) : (
                    <View style={styles.card}>
                        {transactions.map((tx, index) => (
                            <View key={tx.id} style={[
                                styles.txRow,
                                index < transactions.length - 1 && styles.txBorder
                            ]}>
                                <View style={styles.txLeft}>
                                    <Text style={styles.txIcon}>{categoryIcons[tx.category] || '📦'}</Text>
                                    <View>
                                        <Text style={styles.txTitle}>{tx.category}</Text>
                                        {tx.note ? <Text style={styles.txNote}>{tx.note}</Text> : null}
                                        <Text style={styles.txDate}>{formatDate(tx.date)}</Text>
                                    </View>
                                </View>
                                <Text style={[
                                    styles.txAmount,
                                    { color: tx.type === 'income' ? '#2ECC71' : '#E74C3C' }
                                ]}>
                                    {tx.type === 'income' ? '+' : '-'}₺{tx.amount.toLocaleString('tr-TR')}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-transaction')}>
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
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e' },
    filterBtn: {
        backgroundColor: '#fff', paddingHorizontal: 14,
        paddingVertical: 8, borderRadius: 20,
        borderWidth: 1, borderColor: '#e0e0e0'
    },
    filterText: { fontSize: 13, color: '#666' },
    row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    miniCard: {
        flex: 1, backgroundColor: '#fff', borderRadius: 16,
        padding: 16, borderLeftWidth: 4,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3
    },
    miniLabel: { fontSize: 12, color: '#888', marginBottom: 6 },
    miniAmount: { fontSize: 20, fontWeight: 'bold' },
    card: {
        backgroundColor: '#fff', borderRadius: 16,
        marginBottom: 16, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
        overflow: 'hidden'
    },
    txRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', padding: 16
    },
    txBorder: { borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
    txLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    txIcon: { fontSize: 24 },
    txTitle: { fontSize: 15, fontWeight: '500', color: '#1a1a2e' },
    txNote: { fontSize: 12, color: '#888', marginTop: 2 },
    txDate: { fontSize: 12, color: '#aaa', marginTop: 2 },
    txAmount: { fontSize: 15, fontWeight: '600' },
    empty: {
        alignItems: 'center', justifyContent: 'center', paddingVertical: 60
    },
    emptyIcon: { fontSize: 48, marginBottom: 16 },
    emptyTitle: { fontSize: 18, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
    emptyText: { fontSize: 14, color: '#888', textAlign: 'center' },
    fab: {
        position: 'absolute', bottom: 24, left: 24, right: 24,
        backgroundColor: '#2ECC71', borderRadius: 16,
        padding: 18, alignItems: 'center',
        shadowColor: '#2ECC71', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
    },
    fabText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
})