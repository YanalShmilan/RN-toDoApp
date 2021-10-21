import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Task from './Components/Task';
const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Tell Yanal something nice',
    },
    {
      id: 2,
      text: 'Tell Yanal something nice again',
    },
  ]);
  const [task, setTask] = useState({id: 0, text: ''});
  const handleSubmit = () => {
    if (tasks.length === 0) {
      task.id = 1;
    } else {
      task.id = tasks[tasks.length - 1].id + 1;
    }
    setTasks([...tasks, task]);
    setTask({id: 0, text: ''});
  };
  const handleDelete = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };
  const tasksList = tasks.map(task => (
    <Task key={task.id} task={task} handleDelete={handleDelete} />
  ));
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Your tasks</Text>

        <View style={styles.items}>
          <ScrollView>{tasksList}</ScrollView>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          onChangeText={text => setTask({...task, text: text})}
          value={task.text}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  items: {
    marginTop: 30,
    height: '75%',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: 'black',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addText: {
    color: 'black',
    fontSize: 30,
  },
});

export default App;
