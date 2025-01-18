import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonSearchbar,
  IonImg,
} from '@ionic/react';
import { home, create } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';

import './Library.css';
import exercisesData from '../Data/Exercises.json';

const Library: React.FC = () => {
  const [muscleGroups, setMuscleGroups] = useState<{ [muscle: string]: any[] }>({});
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Group exercises by first primary muscle
    const grouped = exercisesData.reduce((acc: { [key: string]: any[] }, exercise) => {
      const primaryMuscle = exercise.primaryMuscles[0];
      if (!acc[primaryMuscle]) {
        acc[primaryMuscle] = [];
      }
      acc[primaryMuscle].push(exercise);
      return acc;
    }, {});

    setMuscleGroups(grouped);
  }, []);

  // Filter muscle groups by search text
  const filteredMuscles = Object.keys(muscleGroups).filter((muscle) =>
    muscle.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <div className="header-container">
      {/* Icons on the left */}
      <div className="header-icons">
        <IonButton fill="clear" routerLink="/home">
          <IonIcon icon={home} slot="icon-only" />
        </IonButton>
        <IonButton fill="clear" routerLink="/create">
          <IonIcon icon={create} slot="icon-only" />
        </IonButton>
      </div>

      {/* Title in the center */}
      <IonTitle>Workout Library</IonTitle>
    </div>
        </IonToolbar>

      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          placeholder="Search by muscle group"
          value={searchText}
          onIonInput={(e: any) => setSearchText(e.target.value)}
        ></IonSearchbar>

        {/* Display Muscle Images */}
        <div className="muscle-grid">
            {filteredMuscles.map((muscle) => (
              <div
                key={muscle}
                className="muscle-item"
                onClick={() => history.push(`/library/muscle/${muscle}`)}
              >
                <img
                  src={`/imgs/${muscle}.jpg`}
                  alt={muscle}
                  className="muscle-img" /* Updated styles will apply here */
                />
                <p className="muscle-label">{muscle} ({muscleGroups[muscle].length} Exercises)</p>
              </div>
            ))}
          </div>

      </IonContent>
    </IonPage>
  );
};

export default Library;
