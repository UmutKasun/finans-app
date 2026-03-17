import { useState } from 'react'
import {
    View, Text, StyleSheet, SafeAreaView,
    TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'

const CATEGORIES = [
    { icon: '🛒', name: 'Market' },
    { icon: '🍽️', name: 'Yemek' },
    { icon: '☕', name: 'Kahve' },
    { icon: '🚗', name: 'Ulaşım' },
    { icon: '🏠', name: 'Kira' },
    { icon: '⚡', name: 'Fatura' },
    { icon: '👕', name: 'Giyim' },
    { icon: '🎮', name: 'Eğlence' },
    { icon: '💊', name: 'Sağlık' },
    { icon: '📚', name: 'Eğitim' },
    { icon: '💰', name: 'Maaş' },
    { icon: '📦', name: 'Diğer' },
]

export default function AddTransaction() {
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [type, setType] = useState<'expense' | 'income'>('expense')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSave() {
        if (!amount || !selectedCategory) {
            Alert.alert('Hata', 'Tutar ve kategori seçmek zorunlu')
            return
        }

        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase.from('transactions').insert({
            user_id: user?.id,
            amount: parseFloat(amount),
            type,
            category: selectedCategory,
            note,
            date: new Date().toISOString(),
        })

        if (error) {
            Alert.alert('Hata', error.message)
        } else {
            Alert.alert('Başarılı', 'İşlem eklendi!', [
                { text: 'Tamam', onPress: () => router.back() }
            ])
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backBtn}>← Geri</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>İşlem Ekle</Text>
                    <View style={{ width: 60 }} />
                </View>

                {/* Gelir / Gider Seçimi */}
                <View style={styles.typeRow}>
                    <TouchableOpacity
                        style={[styles.typeBtn, type === 'expense' && styles.typeBtnActive]}
                        onPress={() => setType('expense')}
                    >
                        <Text style={[styles.typeBtnText, type === 'expense' && styles.typeBtnTextActive]}>
                            📤 Gider
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveGreen]}
                        onPress={() => setType('income')}
                    >
                        <Text style={[styles.typeBtnText, type === 'income' && styles.typeBtnTextActive]}>
                            📥 Gelir
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tutar */}
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Tutar</Text>
                    <View style={styles.amountRow}>
                        <Text style={styles.currency}>₺</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholderTextColor="#ccc"
                        />
                    </View>
                </View>

                {/* Not */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Not (opsiyonel)</Text>
                    <TextInput
                        style={styles.noteInput}
                        placeholder="Örn: Akbank market alışverişi"
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                </View>

                {/* Kategori */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Kategori</Text>
                    <View style={styles.categoryGrid}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.name}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === cat.name && styles.categoryItemActive
                                ]}
                                onPress={() => setSelectedCategory(cat.name)}
                            >
                                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                <Text style={[
                                    styles.categoryName,
                                    selectedCategory === cat.name && styles.categoryNameActive
                                ]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Kaydet Butonu */}
            <TouchableOpacity
                style={[styles.saveBtn, loading && { opacity: 0.7 }]}
                onPress={handleSave}
                disabled={loading}
            >
                <Text style={styles.saveBtnText}>
                    {loading ? 'Kaydediliyor...' : '✓ Kaydet'}
                </Text>
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
    backBtn: { fontSize: 16, color: '#2ECC71', width: 60 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' },
    typeRow: {
        flexDirection: 'row', gap: 12, marginBottom: 16
    },
    typeBtn: {
        flex: 1, padding: 14, borderRadius: 12,
        backgroundColor: '#fff', alignItems: 'center',
        borderWidth: 2, borderColor: '#e0e0e0'
    },
    typeBtnActive: { borderColor: '#E74C3C', backgroundColor: '#fff5f5' },
    typeBtnActiveGreen: { borderColor: '#2ECC71', backgroundColor: '#f0fff4' },
    typeBtnText: { fontSize: 15, fontWeight: '600', color: '#999' },
    typeBtnTextActive: { color: '#1a1a2e' },
    amountCard: {
        backgroundColor: '#1a1a2e', borderRadius: 20,
        padding: 24, marginBottom: 16
    },
    amountLabel: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 },
    amountRow: { flexDirection: 'row', alignItems: 'center' },
    currency: { fontSize: 32, color: '#2ECC71', marginRight: 8 },
    amountInput: {
        fontSize: 48, fontWeight: 'bold', color: '#fff', flex: 1
    },
    card: {
        backgroundColor: '#fff', borderRadius: 16, padding: 16,
        marginBottom: 16, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3
    },
    cardLabel: { fontSize: 13, color: '#888', marginBottom: 10 },
    noteInput: {
        fontSize: 15, color: '#1a1a2e', minHeight: 40
    },
    categoryGrid: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 8
    },
    categoryItem: {
        alignItems: 'center', padding: 10, borderRadius: 12,
        borderWidth: 2, borderColor: '#e0e0e0',
        backgroundColor: '#fff', width: '22%'
    },
    categoryItemActive: {
        borderColor: '#2ECC71', backgroundColor: '#f0fff4'
    },
    categoryIcon: { fontSize: 22 },
    categoryName: { fontSize: 10, color: '#888', marginTop: 4, textAlign: 'center' },
    categoryNameActive: { color: '#2ECC71' },
    saveBtn: {
        position: 'absolute', bottom: 24, left: 24, right: 24,
        backgroundColor: '#2ECC71', borderRadius: 16,
        padding: 18, alignItems: 'center',
        shadowColor: '#2ECC71', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
    },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
})