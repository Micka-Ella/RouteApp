import { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonFab, IonFabButton, IonSpinner, IonRefresher, IonRefresherContent
} from '@ionic/react';
import { add, chevronForward } from 'ionicons/icons';
import axios from 'axios';
import './Routes.css';

interface Route {
  id: string;
  name: string;
  description: string;
}

const Routes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/api/routes');
      setRoutes(response.data.routes);
    } catch (error) {
      console.error('Erreur lors du chargement des routes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchRoutes();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mes Routes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading ? (
          <div className="loading-container">
            <IonSpinner name="crescent" color="primary" />
          </div>
        ) : routes.length === 0 ? (
          <div className="empty-container">
            <p>Aucune route trouvée</p>
            <IonButton color="primary">
              <IonIcon slot="start" icon={add} />
              Créer une route
            </IonButton>
          </div>
        ) : (
          <IonList>
            {routes.map((route) => (
              <IonItem key={route.id} button detail>
                <IonLabel>
                  <h2>{route.name}</h2>
                  <p>{route.description}</p>
                </IonLabel>
                <IonIcon slot="end" icon={chevronForward} />
              </IonItem>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Routes;
