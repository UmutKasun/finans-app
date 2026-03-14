import 'react-native-url-polyfill/auto'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { signIn, signUp } from '../lib/auth'
import { router } from 'expo-router'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    async function handleAuth() {
        setLoading(true)
        const { error } = isSignUp
            ? await signUp(email, password)
            : await signIn(email, password)

        if (error) {
            Alert.alert('Hata', error.message)
        } else {
            router.replace('/(tabs)')
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>💰 Finans App</Text>
            <Text style={styles.subtitle}>{isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}</Text>

            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Bekle...' : isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.toggle}>
                    {isSignUp ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#1a1a2e',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32,
        color: '#666',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggle: {
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: 14,
    },
})