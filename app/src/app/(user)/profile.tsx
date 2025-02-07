import { supabase } from '@/lib/supabase'
import { View, Text, Button } from 'react-native'

const profileScreen = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Sign Out' onPress={async () => await supabase.auth.signOut()}/>
    </View>
  )
}

export default profileScreen