import React, { useReducer, useMemo, useContext, createContext } from 'react';
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
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <DataContext.Provider value={value}>
      <View style={styles.container}>
        <Text>Simple TODO App</Text>
        <Button
          onPress={() => {
            value.dispatch({ type: 'add' });
          }}
          title='Add TODO'
        />
      </View>
      <View style={styles.container}>
        <ListTodos data={value.state} />
      </View>
    </DataContext.Provider>
  );
}

const ListTodos = ({ data }) => {
  return data.map((item) => <ItemTodos key={item.id} {...item} />);
};

const ItemTodos = ({ id, text, completed }) => {
  return (
    <View>
      <View>
        <Switch />
      </View>
      <View>
        <TextInput />
      </View>
      <View>
        <Button />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
