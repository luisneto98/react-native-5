import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, Image, Text } from 'react-native'
import { AsyncStorage } from 'react-native';
import axios from 'axios'

export default Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        checklogin()
    }, [])

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const checklogin = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        if (user)
            props.navigation.navigate('Acceleration')
    }
    const handleClick = async () => {
        const { data } = await axios.post('https://api.codenation.dev/v1/user/auth', {
            email,
            password
        })
        await AsyncStorage.setItem('user', JSON.stringify(data))
        props.navigation.navigate('Acceleration')
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderBottomColor: '#7800ff',
                borderBottomWidth: 2,
                padding: 16,
                paddingTop: 55
            }}>
                <Image
                    style={{
                        height: 45,
                        width: 250
                    }}
                    source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
                />
            </View>
            <Text>Login</Text>
            <Text>E-mail</Text>
            <TextInput
                className={'email-input'}
                style={{ width: '100%', borderWidth: 1 }}
                autoCompleteType={'email'}
                keyboardType={'email-address'}
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <Text>Senha</Text>
            <TextInput
                className={'password-input'}
                style={{ width: '100%', borderWidth: 1, marginTop: 20, marginBottom: 20 }}
                autoCompleteType={'password'}
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button
                title="Entrar"
                disabled={!(validateEmail(email) && password.length > 0 && true)}
                onPress={handleClick}
            />
        </View>
    )

}