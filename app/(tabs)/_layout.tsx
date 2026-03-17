import { Tabs } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#2ECC71',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    height: 60,
                    paddingBottom: 8,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🏠</Text>,
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    title: 'İşlemler',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>💳</Text>,
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: 'Analitik',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>📊</Text>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Diğer',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>☰</Text>,
                }}
            />
        </Tabs>
    );
}