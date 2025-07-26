import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);

  function addTask() {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask('');
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Ionicons name="trash" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: Platform.OS === 'android' ? 50 : 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  list: {
    paddingBottom: 40,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
});
