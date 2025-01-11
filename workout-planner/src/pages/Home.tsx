import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
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
  IonButton,
} from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import exercise_img from '../imgs/home_exercise_img.webp';
import motivation_img from '../imgs/motivation_homeP.webp';
import weeklyPrograss from '../imgs/weeklyPrograss_home.webp'
import readyHome from '../imgs/readyHome.jpg'
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
        <IonCard>
          <img alt="Workout illustration" src={exercise_img} />
          <IonCardHeader>
            <IonCardTitle>All Exercises</IonCardTitle>
            <IonCardSubtitle>Explore a variety of exercises</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Let’s see all the exercises and start planning your workout plan for the day.
          </IonCardContent>
          <IonButton fill="clear" routerLink="/library">
            Let's Go
          </IonButton>
        </IonCard>
               {/* Motivation Card */}
        <IonCard>
          <img alt="motivation_card" src={motivation_img}/>
          <IonCardHeader>
            <IonCardTitle>Motivation for Today</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            "The pain you feel today will be the strength you feel tomorrow."
          </IonCardContent>
        </IonCard>
               {/* Today's Workout Summary Card */}
         <IonCard>
          <img alt='readyWorkout' src={readyHome}/>
          <IonCardHeader>
            <IonCardTitle>Today's Workout</IonCardTitle>
            <IonCardSubtitle>Ready to get started?</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Your next workout is Cardio Blast at 6:00 PM. Duration: 45 mins.
          </IonCardContent>
        </IonCard>
               {/* Weekly Progress Card */}
        <IonCard>
        <img alt='weeklyP' src={weeklyPrograss}/>
          <IonCardHeader>
            <IonCardTitle>Weekly Progress</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            You've completed 3/5 workouts this week. Keep it up!
          </IonCardContent>
        </IonCard>
        </div>

    </IonContent>
  </IonPage>
  );
};

export default Home;
