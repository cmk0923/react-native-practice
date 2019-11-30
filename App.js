import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(courrentGoals => [
      ...courrentGoals
      , {uid: Math.random().toString(), value: goalTitle}]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.uid !== goalId);
    });
  };

  const cancelGoalAddHandler = () => {
    setIsAddMode(false);
  };


  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAddHandler} />
      <FlatList 
        keyExtractor={(item, index) => item.uid}
        data={courseGoals} 
        renderItem={itemData => (
          <GoalItem id={itemData.item.uid}  title={itemData.item.value} onDelete={removeGoalHandler.bind(this, itemData.item.uid)} />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    padding: 30
  }
});
