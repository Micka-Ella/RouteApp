import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { map, navigate, location } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>RouteApp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">RouteApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="home-container">
          <h1>Bienvenue sur RouteApp</h1>
          <p>Votre application de gestion d'itinéraires</p>
          
          <div className="features-grid">
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={map} size="large" color="primary" />
                <IonCardTitle>Créer des routes</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Planifiez vos itinéraires facilement
              </IonCardContent>
            </IonCard>
            
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={navigate} size="large" color="primary" />
                <IonCardTitle>Navigation</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Suivez vos routes en temps réel
              </IonCardContent>
            </IonCard>
            
            <IonCard>
              <IonCardHeader>
                <IonIcon icon={location} size="large" color="primary" />
                <IonCardTitle>Points d'intérêt</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Marquez vos lieux favoris
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
