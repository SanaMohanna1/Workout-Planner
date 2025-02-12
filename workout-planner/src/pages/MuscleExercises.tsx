import React, { useEffect, useState } from 'react';
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
  IonImg,
} from '@ionic/react';
import { 
    IonBackButton, 
    IonButton,
    IonButtons, 
    IonIcon,
    IonMenuButton 
} from '@ionic/react';

import { useParams, useHistory } from 'react-router-dom';

import exercisesData from '../Data/Exercises.json';
import './MuscleExercises.css';

interface Params {
  muscle: string;
}

const MuscleExercises: React.FC = () => {
  const { muscle } = useParams<Params>();
  const [exercises, setExercises] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Filter exercises by the selected muscle
    const filtered = exercisesData.filter(
      (exercise) => exercise.primaryMuscles[0] === muscle 
    );
    setExercises(filtered);
  }, [muscle]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/library"  text="" mode="md"></IonBackButton>
        </IonButtons>
          <IonTitle>{muscle} Exercises</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="muscle-padding">
        <div className="muscle-grid">
          {exercises.map((exercise) => (
            <IonCard
              key={exercise.id}
              className={`muscle-card ${muscle === 'yoga full body' ? 'non-clickable' : ''}`}
              onClick={() => 
                muscle !== 'yoga full body' && history.push(`/library/${exercise.id}`)
              } // Navigate to Exercise Details Page
            >
              <IonImg
                src={`/exercises_gif/${exercise.images}`}
                alt={exercise.name}
              />
              <IonCardHeader>
                <IonCardTitle>{exercise.name}</IonCardTitle>
                <IonCardSubtitle>{exercise.category}</IonCardSubtitle>
                <IonCardSubtitle>     
                  <h4>Recommended:</h4>           
                  <p>{exercise.setsAndReps}</p> 
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MuscleExercises;
