import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { ClientListItem } from './src/components/ClientListItem';
import { ClientStoreContext } from './src/stores/ClientStore';
let Modal = Platform.OS !== 'web' ? require('react-native').Modal : require('./src/components/WebModal').default;

const isAndroid = Platform.OS == "android";

const viewPadding = 10;

export const App = observer(() => {
  const clientStore = useContext(ClientStoreContext)
  const [showModal, modalVisible] = useState(false);

  const clearData = () => {
    clientStore.newClientId = clientStore.newInjury = clientStore.newSide = clientStore.newStrength = '';
  }

  return (
    <View style={styles.container}>
      <Text>Client Directory</Text>
      <FlatList
        style={styles.list}
        data={clientStore.clients}
        renderItem={({ item, index }) =>
          <ClientListItem
            clientId={`${item.clientId} ${index}`}
            injury={item.injury}
            side={item.side}
            strength={item.strength}
            date={item.date}>
          </ClientListItem>
        }
      />
      <Button title="add client" onPress={() => modalVisible(!showModal)} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}>
        <View style={styles.modalContainer}>
          <Text>
            Add New
            </Text>
          <TextInput
            style={styles.textInput} placeholder="Client ID"
            onChangeText={(text) => clientStore.newClientId = text}
          />
          <TextInput
            style={styles.textInput} placeholder="Injury"
            onChangeText={(text) => clientStore.newInjury = text}
          />
          <TextInput
            style={styles.textInput} placeholder="Injury Side or SCI Level"
            onChangeText={(text) => clientStore.newSide = text}
          />
          <TextInput
            style={styles.textInput} placeholder="Strength"
            onChangeText={(text) => clientStore.newStrength = text}
          />
          <Button title="cancel" onPress={() => modalVisible(!showModal)} />
          <Button title="submit" onPress={() => {
            clientStore.clients.push(
              {
                clientId: clientStore.newClientId,
                injury: clientStore.newInjury,
                side: clientStore.newSide,
                strength: clientStore.newStrength,
                date: Date()
              })
            modalVisible(!showModal);
            clearData();
          }
          } />
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40
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
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'center',
    padding: viewPadding,
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    color: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

export default App