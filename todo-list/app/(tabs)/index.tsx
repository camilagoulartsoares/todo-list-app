import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);

  function addTask() {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite uma tarefa"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="Adicionar" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.task}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  task: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
});
