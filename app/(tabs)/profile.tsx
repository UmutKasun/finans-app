import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

export default function Profile() {

    async function handleSignOut() {
        Alert.alert('Çıkış Yap', 'Emin misin?', [
            { text: 'İptal', style: 'cancel' },
            {
                text: 'Çıkış Yap', style: 'destructive',
                onPress: async () => {
                    await supabase.auth.signOut()
                    router.replace('/login')
                }
            }
        ])
    }

    const menuItems = [
        { icon: '💰', title: 'Borç Yönetimi', subtitle: 'Borçlarını takip et', screen: 'debts' },
        { icon: '🎯', title: 'Hedefler', subtitle: 'Finansal hedeflerini yönet', screen: 'goals' },
        { icon: '📈', title: 'Yatırımlar', subtitle: 'Yatırımlarını takip et', screen: 'investments' },
        { icon: '🤖', title: 'AI Danışman', subtitle: 'Finansal koçun', screen: 'ai' },
        { icon: '🏦', title: 'Hesaplar', subtitle: 'Banka ve kart hesapları', screen: 'accounts' },
    ]

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Diğer</Text>
                </View>

                {/* Menü */}
                <View style={styles.card}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index < menuItems.length - 1 && styles.menuBorder
                            ]}
                        >
                            <Text style={styles.menuIcon}>{item.icon}</Text>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Çıkış */}
                <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
                    <Text style={styles.signOutText}>Çıkış Yap</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f4f6f8' },
    container: { flex: 1, padding: 16 },
    header: { marginBottom: 20, marginTop: 8 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e' },
    card: {
        backgroundColor: '#fff', borderRadius: 16,
        marginBottom: 16, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
        overflow: 'hidden'
    },
    menuItem: {
        flexDirection: 'row', alignItems: 'center',
        padding: 16, gap: 12
    },
    menuBorder: {
        borderBottomWidth: 1, borderBottomColor: '#f5f5f5'
    },
    menuIcon: { fontSize: 24 },
    menuText: { flex: 1 },
    menuTitle: { fontSize: 15, fontWeight: '600', color: '#1a1a2e' },
    menuSubtitle: { fontSize: 12, color: '#888', marginTop: 2 },
    menuArrow: { fontSize: 20, color: '#ccc' },
    signOutBtn: {
        backgroundColor: '#fff', borderRadius: 16,
        padding: 18, alignItems: 'center',
        borderWidth: 1, borderColor: '#E74C3C'
    },
    signOutText: { color: '#E74C3C', fontSize: 16, fontWeight: '600' },
})