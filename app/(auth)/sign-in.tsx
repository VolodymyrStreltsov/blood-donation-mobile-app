import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { PageWrapper, Text } from '../../components'
import { useAuth } from '../../context'

export default function SignIn() {
    const [state, onChangeState] = useState<string>('')
    const { signIn } = useAuth()
    return (
        <PageWrapper>
            <TextInput
                mode='outlined'
                label='name'
                onChangeText={onChangeState}
                value={state}
                placeholder='your name'
            />
            <Text onPress={() => signIn({ name: state, email: '1@gm.com' })} align='center' style={{ marginTop: 40 }}>
                Sign In
            </Text>
        </PageWrapper>
    )
}
