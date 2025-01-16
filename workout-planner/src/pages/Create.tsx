import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { addCircleOutline, trashOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './Create.css';
import exercisesData from '../Data/Exercises.json';

const Create: React.FC = () => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<{ [muscle: string]: any[] }>({});
  const [lastModified, setLastModified] = useState<number | null>(null);

  // Group exercises by muscle
  const muscleGroups = exercisesData.reduce((acc: { [muscle: string]: any[] }, exercise) => {
    const primaryMuscle = exercise.primaryMuscles[0];
    if (!acc[primaryMuscle]) {
      acc[primaryMuscle] = [];
    }
    acc[primaryMuscle].push(exercise);
    return acc;
  }, {});

  // Load exercises and timestamp from localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem('selectedExercises');
    const savedTimestamp = localStorage.getItem('lastModified');

    if (savedExercises) {
      setSelectedExercises(JSON.parse(savedExercises));
    }

    if (savedTimestamp) {
      const savedTime = parseInt(savedTimestamp, 10);
      setLastModified(savedTime);

      // Check if 24 hours have passed
      const now = Date.now();
      if (now - savedTime > 24 * 60 * 60 * 1000) {
        // Clear the list if 24 hours have passed
        clearExercises();
      }
    }
  }, []);

  // Save exercises and timestamp to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));
    if (lastModified) {
      localStorage.setItem('lastModified', lastModified.toString());
    }
  }, [selectedExercises, lastModified]);

  // Handle selecting an exercise
  const selectExercise = (exercise: any) => {
    const muscle = exercise.primaryMuscles[0];
    setSelectedExercises((prev) => {
      if (prev[muscle]?.find((ex) => ex.id === exercise.id)) {
        return prev; // Prevent duplicates
      }
      setLastModified(Date.now()); // Update timestamp
      return {
        ...prev,
        [muscle]: [...(prev[muscle] || []), { ...exercise, done: false }],
      };
    });
  };

  // Handle deleting an exercise
  const deleteExercise = (muscle: string, exerciseId: string) => {
    setSelectedExercises((prev) => {
      const updatedMuscleGroup = prev[muscle].filter((exercise) => exercise.id !== exerciseId);

      // Remove the muscle group if empty
      if (updatedMuscleGroup.length === 0) {
        const { [muscle]: _, ...remaining } = prev;
        return remaining;
      }

      return {
        ...prev,
        [muscle]: updatedMuscleGroup,
      };
    });
  };

  // Handle marking an exercise as done
  const markAsDone = (muscle: string, exerciseId: string) => {
    setSelectedExercises((prev) => ({
      ...prev,
      [muscle]: prev[muscle].map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, done: !exercise.done } : exercise
      ),
    }));
  };

  // Clear all exercises and remove from localStorage
  const clearExercises = () => {
    setSelectedExercises({});
    setLastModified(null);
    localStorage.removeItem('selectedExercises');
    localStorage.removeItem('lastModified');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Create Icon */}
        {!showLibrary && (
          <div className="create-icon">
            <IonButton fill="clear" onClick={() => setShowLibrary(true)}>
              <IonIcon icon={addCircleOutline} style={{ fontSize: '80px' }} />
            </IonButton>
            <p>Click to start creating your workout</p>
          </div>
        )}

        {/* Library View */}
        {showLibrary && (
          <div className="library-view">
            <h2>Select Exercises</h2>
            {Object.keys(muscleGroups).map((muscle) => (
              <div key={muscle} className="muscle-group">
                <h3>{muscle}</h3>
                {muscleGroups[muscle].map((exercise) => (
                  <IonItem key={exercise.id} lines="full">
                    <IonImg
                      slot="start"
                      src={`src/Data/exercises_gif/${exercise.images}`}
                      className="exercise-img"
                      alt={exercise.name}
                    />
                    <IonLabel>
                      <h2>{exercise.name}</h2>
                      <p>{exercise.category}</p>
                    </IonLabel>
                    {!selectedExercises[muscle]?.find((ex) => ex.id === exercise.id) && (
                      <IonIcon
                        icon={addCircleOutline}
                        slot="end"
                        size="large"
                        color="primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => selectExercise(exercise)}
                      />
                    )}
                    {selectedExercises[muscle]?.find((ex) => ex.id === exercise.id) && (
                      <IonIcon
                        icon={trashOutline}
                        slot="end"
                        size="large"
                        color="danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteExercise(muscle, exercise.id)}
                      />
                    )}
                  </IonItem>
                ))}
              </div>
            ))}
            <IonButton expand="block" color="primary" onClick={() => setShowLibrary(false)}>
              Done Selecting
            </IonButton>
          </div>
        )}

        {/* Selected Exercises */}
        {!showLibrary && Object.keys(selectedExercises).length > 0 && (
          <div className="selected-exercises">
            <h2>Selected Exercises</h2>
            {Object.keys(selectedExercises).map((muscle) => (
              <div key={muscle} className="muscle-group">
                <h3>{muscle}</h3>
                <IonList>
                  {selectedExercises[muscle].map((exercise) => (
                    <IonItem key={exercise.id} lines="full">
                      <IonImg
                        slot="start"
                        src={`src/Data/exercises_gif/${exercise.images}`}
                        className="exercise-img"
                        alt={exercise.name}
                      />
                      <IonLabel>
                        <h2
                          style={{
                            textDecoration: exercise.done ? 'line-through' : 'none',
                            color: exercise.done ? 'green' : 'inherit',
                          }}
                        >
                          {exercise.name}
                        </h2>
                      </IonLabel>
                      {/* Mark as Done Icon */}
                      <IonIcon
                        icon={checkmarkCircleOutline}
                        slot="end"
                        size="large"
                        color={exercise.done ? 'success' : 'medium'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => markAsDone(muscle, exercise.id)}
                      />
                      {/* Delete Icon */}
                      <IonIcon
                        icon={trashOutline}
                        slot="end"
                        size="large"
                        color="danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteExercise(muscle, exercise.id)}
                      />
                    </IonItem>
                  ))}
                </IonList>
              </div>
            ))}
            <IonButton expand="block" color="danger" onClick={clearExercises}>
              Clear All Exercises
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Create;
