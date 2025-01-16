import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { home, list, calendar, person, create } from 'ionicons/icons';
import Home from '../pages/Home';
import Library from '../pages/Library';
import ExerciseDetails from '../pages/ExerciseDetails';
import CreateEditWorkout from '../pages/Create';
import MuscleExercises from '../pages/MuscleExercises';
const Tabs: React.FC = () => {
  return (
    <IonTabs>
      {/* Routing Logic */}
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/library/:id" component={ExerciseDetails} />
        <Route exact path="/library/muscle/:muscle" component={MuscleExercises} />
        <Route exact path="/create" component={CreateEditWorkout} />
        <Route exact path="/edit/:id" component={CreateEditWorkout} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>

      {/* Tab Bar */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="library" href="/library">
          <IonIcon icon={list} />
          <IonLabel>Library</IonLabel>
        </IonTabButton>
        <IonTabButton tab="create" href="/create">
          <IonIcon icon={create} />
          <IonLabel>Create</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
