import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

export default function Transactions() {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>

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
                        <Text style={[styles.miniAmount, { color: '#2ECC71' }]}>₺0</Text>
                    </View>
                    <View style={[styles.miniCard, { borderLeftColor: '#E74C3C' }]}>
                        <Text style={styles.miniLabel}>Toplam Gider</Text>
                        <Text style={[styles.miniAmount, { color: '#E74C3C' }]}>₺0</Text>
                    </View>
                </View>

                {/* Boş durum */}
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>💳</Text>
                    <Text style={styles.emptyTitle}>Henüz işlem yok</Text>
                    <Text style={styles.emptyText}>Aşağıdaki butona tıklayarak ilk işlemini ekle</Text>
                </View>

            </ScrollView>

            {/* Hızlı Ekle */}
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
    empty: {
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 60
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