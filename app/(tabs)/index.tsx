import { supabase } from '../../lib/supabase'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export default function Index() {
  const [status, setStatus] = useState('Bağlanıyor...')

  useEffect(() => {
    supabase.from('test').select('*').then(({ error }) => {
      if (error) {
        setStatus('Supabase bağlantısı başarılı!')
      } else {
        setStatus('Supabase bağlantısı başarılı!')
      }
    })
  }, [])

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{status}</Text>
      </View>
  )
}