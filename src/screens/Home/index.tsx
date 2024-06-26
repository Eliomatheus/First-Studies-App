import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        
        const trimmedName = participantName.trim();
        if(participants.includes(trimmedName)){
           return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome.'); 
        }

        setParticipants(prevState => [...prevState, trimmedName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string){
        Alert.alert('Remover', `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))

            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])


    }

    return(
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>

            <Text style={styles.eventDate}>
                Sabado, 30 de Março de 2024
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor={'#6B6B6B'}
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                        key={item} 
                        name={item} 
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguem Chegou no evento ainda? Adcione participante a sua lista de presença;
                    </Text>
                )}
            
            />
            
        </View>
    );
}