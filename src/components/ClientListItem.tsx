// import * as moment from 'moment';
import * as React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
const moment = require('moment');

interface Props {
    clientId: string;
    injury: string;
    side: string;
    strength: string;
    date: Date;
};

export const ClientListItem: React.FC<Props> = (
    {
        clientId,
        injury,
        side,
        strength,
        date 
    }) => {
    const formatedDate = moment(date).format('DD/MM/YYYY HH:mm');
    return (
        <View>
            <View style={styles.listItemCont}>
                <View>
                    <Text style={styles.listItem}>
                        ID: {clientId}
                    </Text>
                    <Text>Injury: {injury} </Text>
                </View>
                <View>
                    <Text>Injury side or SCCI level: {side} </Text>
                    <Text>Strength: {strength} </Text>
                    <Text>{formatedDate}</Text>
                </View>
                <Button title="x" onPress={() => Alert.alert('this.deleteItem(index)')} />
            </View>
            <View style={styles.hr} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
    list: {
        width: "100%"
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18
    },
    hr: {
        height: 1,
        backgroundColor: "gray"
    },
    listItemCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});