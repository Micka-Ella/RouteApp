import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonText, IonBackButton, IonButtons
} from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      history.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="register-container">
          <h1>Créer un compte</h1>

          <form onSubmit={handleRegister}>
            <IonItem>
              <IonLabel position="floating">Prénom</IonLabel>
              <IonInput 
                type="text" 
                value={formData.firstName} 
                onIonChange={(e) => handleChange('firstName', e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
              <IonInput 
                type="text" 
                value={formData.lastName} 
                onIonChange={(e) => handleChange('lastName', e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Email *</IonLabel>
              <IonInput 
                type="email" 
                value={formData.email} 
                onIonChange={(e) => handleChange('email', e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Mot de passe *</IonLabel>
              <IonInput 
                type="password" 
                value={formData.password} 
                onIonChange={(e) => handleChange('password', e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Confirmer le mot de passe *</IonLabel>
              <IonInput 
                type="password" 
                value={formData.confirmPassword} 
                onIonChange={(e) => handleChange('confirmPassword', e.detail.value!)}
                required
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p className="error-message">{error}</p>
              </IonText>
            )}

            <IonButton 
              expand="block" 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              <IonIcon slot="start" icon={personAdd} />
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
