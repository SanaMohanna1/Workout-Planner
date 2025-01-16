import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import exercise_img from '../imgs/workoutLibrary.jpg';
import motivation_img from '../imgs/motivation_homeP.webp';
import create_img from '../imgs/create Workout.jpg';
import yoga_img from '../imgs/yoga home.jpg';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <FontAwesomeIcon icon={faDumbbell} className="fa-dumbbell" />
          <IonTitle>Workout Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to Your Workout Planner</h1>
          <p>Track your workouts, plan your schedule, and achieve your fitness goals!</p>
        </div>
        <div className="card-grid">
          {/* All Exercises Card */}
          <IonCard routerLink="/library" className="clickable-card">
            <img alt="Workout illustration" src={exercise_img} />
            <IonCardHeader>
              <IonCardTitle>All Exercises</IonCardTitle>
              <IonCardSubtitle>Explore a variety of exercises</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Let’s see all the exercises and start planning your workout plan for the day.
            </IonCardContent>
          </IonCard>
          
          {/* Create Workout Card */}
          <IonCard routerLink="/create" className="clickable-card">
            <img alt="Create Workout" src={create_img} />
            <IonCardHeader>
              <IonCardTitle>Create Workout</IonCardTitle>
              <IonCardSubtitle>Ready to get started?</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Design your personalized workout plan with selected exercises.
            </IonCardContent>
          </IonCard>

          {/* Yoga Exercises Card */}
          <IonCard routerLink="/library/muscle/yoga full body" className="clickable-card">
            <img alt="Yoga Exercises" src={yoga_img} />
            <IonCardHeader>
              <IonCardTitle>Yoga Full Body</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Relax and strengthen your body with yoga exercises tailored for full-body workouts.
            </IonCardContent>
          </IonCard>
          
          
          
          {/* Motivation Card */}
          <IonCard className="clickable-card">
            <img alt="Motivation for Today" src={motivation_img} />
            <IonCardHeader>
              <IonCardTitle>Motivation for Today</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              "The pain you feel today will be the strength you feel tomorrow."
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
