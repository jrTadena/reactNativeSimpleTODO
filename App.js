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
    case 'delete': {
      return state.filter((item) => item.id !== action.payload);
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
          color='gray'
        />
      </View>
      <View style={styles.container}>
        <ListTodos dataState={value.state} />
      </View>
    </DataContext.Provider>
  );
}

const ListTodos = ({ dataState }) => {
  return dataState.map((item) => <ItemTodos key={item.id} {...item} />);
};

const ItemTodos = ({ id, text, completed }) => {
  const dispatch = useContext(DataContext);
  const value = useMemo(() => dispatch, dispatch);
  return (
    <View style={styles.listTodosContainer}>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: 'lightgray', true: 'magenta' }}
          thumbColor={completed ? 'magenta' : 'lightgray'}
          ios_backgroundColor='lightgray'
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholder='To Do' />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color='magenta'
          title='Delete'
          onPress={() => value.dispatch({ type: 'delete', payload: id })}
        />
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
  listTodosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  switchContainer: {
    marginRight: 5,
    paddingTop: 5,
  },
  textInputContainer: {
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 8,
  },
  textInput: {
    color: 'gray',
  },
  buttonContainer: {
    marginLeft: 5,
  },
});
