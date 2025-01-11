import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useParams } from 'react-router-dom';

import exercisesData from '../Data/Exercises.json';
import './ExerciseDetails.css';

interface Params {
  id: string;
}

const ExerciseDetails: React.FC = () => {
  const { id } = useParams<Params>();
  const [exercise, setExercise] = useState<any>(null);

  useEffect(() => {
    const selectedExercise = exercisesData.find((ex) => ex.id === id);
    setExercise(selectedExercise);
  }, [id]);

  if (!exercise) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Exercise Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>The exercise you're looking for does not exist.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{exercise.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Banner Section */}
        <div className="details-banner">
          <img src={`src/Data/exercises_gif/${exercise.images}`} alt={exercise.name} />
          <h1>{exercise.name}</h1>
        </div>

        {/* Benefits Section */}
        <div className="details-section">
          <h2>Benefits</h2>
          <p>{exercise.benefits}</p>
        </div>

        {/* Primary Muscles Section */}
        <div className="details-section">
          <h2>Primary Muscles</h2>
          <div className="details-muscle-list">
            {exercise.primaryMuscles.map((muscle: string, index: number) => (
              <div className="details-muscle-item" key={index}>
                {muscle}
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Muscles Section */}
        {exercise.secondaryMuscles && (
          <div className="details-section">
            <h2>Secondary Muscles</h2>
            <div className="details-muscle-list">
              {exercise.secondaryMuscles.map((muscle: string, index: number) => (
                <div className="details-muscle-item" key={index}>
                  {muscle}
                </div>
              ))}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExerciseDetails;
