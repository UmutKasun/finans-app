import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

export default function Analytics() {
    const healthScore = 72

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Analitik</Text>
                    <Text style={styles.subtitle}>Aralık 2024</Text>
                </View>

                {/* Finansal Sağlık Skoru */}
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreLabel}>Finansal Sağlık Skoru</Text>
                    <Text style={styles.scoreValue}>{healthScore}</Text>
                    <Text style={styles.scoreMax}>/100</Text>
                    <View style={styles.progressBg}>
                        <View style={[styles.progressFill, { width: `${healthScore}%` }]} />
                    </View>
                    <Text style={styles.scoreComment}>İyi gidiyorsun, biraz daha tasarruf yapabilirsin 💪</Text>
                </View>

                {/* Kategori Dağılımı */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Kategori Dağılımı</Text>
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>📊</Text>
                        <Text style={styles.emptyText}>İşlem eklendikçe burada görünecek</Text>
                    </View>
                </View>

                {/* Aylık Karşılaştırma */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Aylık Karşılaştırma</Text>
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>📈</Text>
                        <Text style={styles.emptyText}>Yeterli veri eklendikçe burada görünecek</Text>
                    </View>
                </View>

                {/* Gelir / Gider Oranı */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Gelir / Gider Oranı</Text>
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>⚖️</Text>
                        <Text style={styles.emptyText}>İşlem eklendikçe burada görünecek</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
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
    subtitle: { fontSize: 14, color: '#888' },
    scoreCard: {
        backgroundColor: '#1a1a2e', borderRadius: 20,
        padding: 24, marginBottom: 16, alignItems: 'center',
    },
    scoreLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 8 },
    scoreValue: { fontSize: 56, fontWeight: 'bold', color: '#2ECC71' },
    scoreMax: { fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: -8, marginBottom: 16 },
    progressBg: {
        width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10, overflow: 'hidden', marginBottom: 12
    },
    progressFill: {
        height: '100%', backgroundColor: '#2ECC71', borderRadius: 10
    },
    scoreComment: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
    card: {
        backgroundColor: '#fff', borderRadius: 16, padding: 16,
        marginBottom: 16, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3
    },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a2e', marginBottom: 12 },
    empty: { alignItems: 'center', paddingVertical: 24 },
    emptyIcon: { fontSize: 32, marginBottom: 8 },
    emptyText: { fontSize: 13, color: '#aaa', textAlign: 'center' },
})