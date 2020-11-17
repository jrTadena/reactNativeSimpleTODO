import React, { useReducer, useContext, createContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Switch,
} from 'react-native';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false,
        },
      ];
    }
  }
};

const DataContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <DataContext.Provider value={dispatch}>
      <View style={styles.container}>
        <Text>Simple TODO App</Text>
        <Button
          onPress={() => {
            dispatch({ type: 'add' });
          }}
          title='Add TODO'
        />
      </View>
      <View style={styles.container}>
        {state.map((item) => (
          <Text>{item.id}</Text>
        ))}
      </View>
    </DataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
