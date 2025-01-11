import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSearchbar,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './Library.css';
import exercisesData from '../Data/Exercises.json';

const Library: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  useEffect(() => {
    setExercises(exercisesData);
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.primaryMuscles.some((muscle: string) =>
        muscle.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.category.LoweCase().includes(searchText.toLowerCase())
      )
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          placeholder="Search by name or primary muscles or category"
          value={searchText}
          onIonInput={(e: any) => setSearchText(e.target.value)}
        ></IonSearchbar>

        {/* Grid Container */}
        <div className="library-grid">
          {filteredExercises.map((exercise) => (
            <IonCard
              key={exercise.id}
              className="library-card"
              onClick={() => history.push(`/library/${exercise.id}`)}
            >
              <IonImg
                src={`src/Data/exercises_gif/${exercise.images}`}
                alt={exercise.name}
              />
              <IonCardHeader>
                <IonCardTitle>{exercise.name}</IonCardTitle>
                <IonCardSubtitle>
                  {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)} |{' '}
                  {exercise.primaryMuscles.join(', ')}
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Library;
