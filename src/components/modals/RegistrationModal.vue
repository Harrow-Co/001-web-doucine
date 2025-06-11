<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Bulletin d'adhésion</h2>
        <button class="close-btn" @click="closeModal" aria-label="Fermer">×</button>
      </div>
      <div class="modal-body">
        <div class="registration-header">
          <h3>Association DOUCINÉ</h3>
          <p>17, rue du Vieux puit - Lotissement la Rhumerie – Cogneau Lamirande</p>
          <p>97351 Matoury</p>
          <p>Numéro de SIRET : 924 265 051 00012</p>
          <p>Tél : 0694 20 52 31 Mail : Doucine97351@gmail.com</p>
          <h3 class="session-title">BULLETIN D'ADHESION - Session 2025</h3>
        </div>
        
        <form @submit.prevent="submitForm" class="registration-form" ref="registrationForm">
          <div class="form-row">
            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input 
                type="text" 
                id="prenom" 
                v-model="formData.prenom" 
                required
                pattern="[A-Za-z\-' ]{2,50}"
                title="Le prénom doit contenir entre 2 et 50 caractères (lettres, espaces, tirets et apostrophes uniquement)"
              >
              <small v-if="errors.prenom" class="error-message">{{ errors.prenom }}</small>
            </div>
            <div class="form-group">
              <label for="nom">Nom</label>
              <input 
                type="text" 
                id="nom" 
                v-model="formData.nom" 
                required
                pattern="[A-Za-z\-' ]{2,50}"
                title="Le nom doit contenir entre 2 et 50 caractères (lettres, espaces, tirets et apostrophes uniquement)"
              >
              <small v-if="errors.nom" class="error-message">{{ errors.nom }}</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="date_naissance">Date de naissance</label>
            <input type="date" id="date_naissance" v-model="formData.dateNaissance" required>
          </div>
          
          <div class="form-group">
            <label for="adresse">Adresse</label>
            <input type="text" id="adresse" v-model="formData.adresse" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="code_postal">Code postal</label>
              <input type="text" id="code_postal" v-model="formData.codePostal" required>
            </div>
            <div class="form-group">
              <label for="ville">Ville</label>
              <input type="text" id="ville" v-model="formData.ville" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input 
              type="tel" 
              id="telephone" 
              v-model="formData.telephone" 
              required
              pattern="0[0-9]{9}"
              title="Veuillez entrer un numéro de téléphone valide à 10 chiffres (ex: 0694123456)"
            >
            <small v-if="errors.telephone" class="error-message">{{ errors.telephone }}</small>
          </div>
          
          <div class="form-group">
            <label for="email">Adresse mail</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Veuillez entrer une adresse email valide"
            >
            <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
          </div>
          
          <div class="form-group radio-group">
            <label>Type d'adhésion :</label>
            <div class="radio-options">
              <div class="radio-option">
                <input type="radio" id="ca" value="ca" v-model="formData.typeAdhesion" required>
                <label for="ca">Membre du conseil d'administration (30 €)</label>
              </div>
              <div class="radio-option">
                <input type="radio" id="membre" value="membre" v-model="formData.typeAdhesion">
                <label for="membre">Membre (30 €)</label>
              </div>
              <div class="radio-option">
                <input type="radio" id="association" value="association" v-model="formData.typeAdhesion">
                <label for="association">Associations (30 €)</label>
              </div>
            </div>
          </div>
          
          <div class="form-group radio-group">
            <label>Mode de paiement :</label>
            <div class="radio-options">
              <div class="radio-option">
                <input type="radio" id="especes" value="especes" v-model="formData.modePaiement" required>
                <label for="especes">Espèces</label>
              </div>
              <div class="radio-option">
                <input type="radio" id="cheque" value="cheque" v-model="formData.modePaiement">
                <label for="cheque">Chèque</label>
              </div>
              <div class="radio-option">
                <input type="radio" id="virement" value="virement" v-model="formData.modePaiement">
                <label for="virement">Virement</label>
              </div>
            </div>
          </div>
          
          <div class="form-group" v-if="formData.modePaiement === 'virement'">
            <p class="iban-info">IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX</p>
          </div>
          
          <div class="form-group declaration">
            <p>Je déclare par la présente souhaiter devenir membre de l'association Douciné.</p>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading-spinner"></span>
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer et télécharger le récapitulatif' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="closeModal" :disabled="isSubmitting">Annuler</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Élement invisible pour la génération du PDF -->
    <div class="pdf-container" ref="pdfTemplate" v-show="false">
      <div class="pdf-header">
        <h2>Association DOUCINÉ</h2>
        <p>17, rue du Vieux puit - Lotissement la Rhumerie – Cogneau Lamirande</p>
        <p>97351 Matoury</p>
        <p>Numéro de SIRET : 924 265 051 00012</p>
        <p>Tél : 0694 20 52 31 Mail : Doucine97351@gmail.com</p>
        <h3>RÉCAPITULATIF D'ADHÉSION - Session 2025</h3>
      </div>
      <div class="pdf-content" v-if="formData">
        <h3>Informations personnelles</h3>
        <table>
          <tbody>
          <tr>
            <td><strong>Prénom :</strong></td>
            <td>{{ formData.prenom }}</td>
          </tr>
          <tr>
            <td><strong>Nom :</strong></td>
            <td>{{ formData.nom }}</td>
          </tr>
          <tr>
            <td><strong>Date de naissance :</strong></td>
            <td>{{ formatDate(formData.dateNaissance) }}</td>
          </tr>
          <tr>
            <td><strong>Adresse :</strong></td>
            <td>{{ formData.adresse }}</td>
          </tr>
          <tr>
            <td><strong>Code postal :</strong></td>
            <td>{{ formData.codePostal }}</td>
          </tr>
          <tr>
            <td><strong>Ville :</strong></td>
            <td>{{ formData.ville }}</td>
          </tr>
          <tr>
            <td><strong>Téléphone :</strong></td>
            <td>{{ formData.telephone }}</td>
          </tr>
          <tr>
            <td><strong>Email :</strong></td>
            <td>{{ formData.email }}</td>
          </tr>
          <tr>
            <td><strong>Type d'adhésion :</strong></td>
            <td>{{ getTypeAdhesion }} (30 €)</td>
          </tr>
          <tr>
            <td><strong>Mode de paiement :</strong></td>
            <td>{{ getModePaiement }}</td>
          </tr>
          </tbody>
        </table>
        
        <div class="pdf-footer">
          <p>Date : {{ getCurrentDate() }}</p>
          <p>Je déclare par la présente souhaiter devenir membre de l'association Douciné.</p>
          <div class="signature-area">
            <p>Signature :</p>
            <div class="signature-box"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logoUrl from '@/assets/logo_doucine.png';

export default {
  name: 'RegistrationModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        prenom: '',
        nom: '',
        dateNaissance: '',
        adresse: '',
        codePostal: '',
        ville: '',
        telephone: '',
        email: '',
        typeAdhesion: 'membre',
        modePaiement: 'cheque'
      },
      errors: {
        prenom: '',
        nom: '',
        telephone: '',
        email: ''
      },
      scrollPosition: 0,
      validationPatterns: {
        nom: /^[A-Za-z\-' ]{2,50}$/,
        prenom: /^[A-Za-z\-' ]{2,50}$/,
        telephone: /^0[0-9]{9}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      logoBase64: null,
      isSubmitting: false
    }
  },
  computed: {
    getTypeAdhesion() {
      const types = {
        'ca': 'Membre du conseil d\'administration',
        'membre': 'Membre',
        'association': 'Association'
      };
      return types[this.formData.typeAdhesion] || '';
    },
    getModePaiement() {
      const modes = {
        'especes': 'Espèces',
        'cheque': 'Chèque',
        'virement': 'Virement'
      };
      return modes[this.formData.modePaiement] || '';
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    }
  },
  mounted() {
    // Charger le logo en base64 pour le PDF
    this.loadLogoBase64();
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      // Réinitialiser les erreurs
      this.resetErrors();
      
      // Valider le formulaire
      if (!this.validateForm()) {
        // Si le formulaire n'est pas valide, ne pas continuer
        return;
      }
      
      // Définir l'état de soumission à true
      this.isSubmitting = true;
      
      // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
      // Par exemple, une requête API vers votre backend
      console.log('Données du formulaire:', this.formData);
      
      // Générer le PDF (mais ne pas le télécharger directement)
      this.generatePDF(true);
    },
    validateForm() {
      let isValid = true;
      
      // Valider le prénom
      if (!this.validationPatterns.prenom.test(this.formData.prenom)) {
        this.errors.prenom = "Le prénom doit contenir entre 2 et 50 caractères (lettres, espaces, tirets et apostrophes uniquement)";
        isValid = false;
      }
      
      // Valider le nom
      if (!this.validationPatterns.nom.test(this.formData.nom)) {
        this.errors.nom = "Le nom doit contenir entre 2 et 50 caractères (lettres, espaces, tirets et apostrophes uniquement)";
        isValid = false;
      }
      
      // Valider le téléphone
      if (!this.validationPatterns.telephone.test(this.formData.telephone)) {
        this.errors.telephone = "Veuillez entrer un numéro de téléphone valide à 10 chiffres";
        isValid = false;
      }
      
      // Valider l'email
      if (!this.validationPatterns.email.test(this.formData.email)) {
        this.errors.email = "Veuillez entrer une adresse email valide";
        isValid = false;
      }
      
      return isValid;
    },
    resetErrors() {
      this.errors = {
        prenom: '',
        nom: '',
        telephone: '',
        email: ''
      };
    },
    loadLogoBase64() {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Permet de charger des images depuis d'autres domaines
      img.src = logoUrl;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        this.logoBase64 = canvas.toDataURL('image/png');
      };
      
      img.onerror = (error) => {
        console.error('Erreur lors du chargement du logo:', error);
      };
    },
    generatePDF(forEmail = false) {
      // Créer un document PDF directement sans utiliser html2canvas
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      const lineHeight = 8;
      let currentY; // Déclarer la variable en dehors des blocs conditionnels
      
      // Ajouter l'en-tête
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, 297, 'F');
      
      // Ajouter le logo s'il est disponible
      if (this.logoBase64) {
        const logoWidth = 30; // Largeur du logo en mm
        const logoHeight = 30; // Hauteur approximative (aspect ratio sera préservé)
        
        // Centrer le logo horizontalement
        const logoX = (pageWidth - logoWidth) / 2;
        
        // Ajouter le logo
        pdf.addImage(this.logoBase64, 'PNG', logoX, margin, logoWidth, logoHeight);
        
        // Ajuster la position de départ du texte pour qu'il soit sous le logo
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(18);
        pdf.text('Association DOUCINÉ', pageWidth / 2, margin + logoHeight + 10, { align: 'center' });
        
        pdf.setTextColor(42, 48, 64); // #2A3040
        pdf.setFontSize(11);
        pdf.text('17, rue du Vieux puit - Lotissement la Rhumerie – Cogneau Lamirande', pageWidth / 2, margin + logoHeight + 20, { align: 'center' });
        pdf.text('97351 Matoury', pageWidth / 2, margin + logoHeight + 25, { align: 'center' });
        pdf.text('Numéro de SIRET : 924 265 051 00012', pageWidth / 2, margin + logoHeight + 30, { align: 'center' });
        pdf.text('Tél : 0694 20 52 31 Mail : Doucine97351@gmail.com', pageWidth / 2, margin + logoHeight + 35, { align: 'center' });
        
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(14);
        pdf.text('RÉCAPITULATIF D\'ADHÉSION - Session 2025', pageWidth / 2, margin + logoHeight + 45, { align: 'center' });
        
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, margin + logoHeight + 50, pageWidth - margin, margin + logoHeight + 50);
        
        // Informations personnelles
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(14);
        pdf.text('Informations personnelles', margin, margin + logoHeight + 60);
        
        pdf.setTextColor(42, 48, 64); // #2A3040
        pdf.setFontSize(11);
        
        const startY = margin + logoHeight + 70;
        
        // Fonction pour ajouter une ligne au tableau
        const addTableRow = (label, value, posY) => {
          pdf.setFont(undefined, 'bold');
          pdf.text(label, margin, posY);
          pdf.setFont(undefined, 'normal');
          pdf.text(value || '', margin + 50, posY);
          return posY + lineHeight;
        };
        
        currentY = startY;
        
        currentY = addTableRow('Prénom :', this.formData.prenom, currentY);
        currentY = addTableRow('Nom :', this.formData.nom, currentY);
        currentY = addTableRow('Date de naissance :', this.formatDate(this.formData.dateNaissance), currentY);
        currentY = addTableRow('Adresse :', this.formData.adresse, currentY);
        currentY = addTableRow('Code postal :', this.formData.codePostal, currentY);
        currentY = addTableRow('Ville :', this.formData.ville, currentY);
        currentY = addTableRow('Téléphone :', this.formData.telephone, currentY);
        currentY = addTableRow('Email :', this.formData.email, currentY);
        currentY = addTableRow('Type d\'adhésion :', this.getTypeAdhesion + ' (30 €)', currentY);
        currentY = addTableRow('Mode de paiement :', this.getModePaiement, currentY);
      } else {
        // Fallback si le logo n'est pas disponible
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(18);
        pdf.text('Association DOUCINÉ', pageWidth / 2, margin, { align: 'center' });
        
        pdf.setTextColor(42, 48, 64); // #2A3040
        pdf.setFontSize(11);
        pdf.text('17, rue du Vieux puit - Lotissement la Rhumerie – Cogneau Lamirande', pageWidth / 2, margin + 10, { align: 'center' });
        pdf.text('97351 Matoury', pageWidth / 2, margin + 15, { align: 'center' });
        pdf.text('Numéro de SIRET : 924 265 051 00012', pageWidth / 2, margin + 20, { align: 'center' });
        pdf.text('Tél : 0694 20 52 31 Mail : Doucine97351@gmail.com', pageWidth / 2, margin + 25, { align: 'center' });
        
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(14);
        pdf.text('RÉCAPITULATIF D\'ADHÉSION - Session 2025', pageWidth / 2, margin + 35, { align: 'center' });
        
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, margin + 40, pageWidth - margin, margin + 40);
        
        // Informations personnelles
        pdf.setTextColor(235, 26, 58); // #EB1A3A
        pdf.setFontSize(14);
        pdf.text('Informations personnelles', margin, margin + 50);
        
        pdf.setTextColor(42, 48, 64); // #2A3040
        pdf.setFontSize(11);
        
        const startY = margin + 60;
        
        // Fonction pour ajouter une ligne au tableau
        const addTableRow = (label, value, posY) => {
          pdf.setFont(undefined, 'bold');
          pdf.text(label, margin, posY);
          pdf.setFont(undefined, 'normal');
          pdf.text(value || '', margin + 50, posY);
          return posY + lineHeight;
        };
        
        currentY = startY;
        
        currentY = addTableRow('Prénom :', this.formData.prenom, currentY);
        currentY = addTableRow('Nom :', this.formData.nom, currentY);
        currentY = addTableRow('Date de naissance :', this.formatDate(this.formData.dateNaissance), currentY);
        currentY = addTableRow('Adresse :', this.formData.adresse, currentY);
        currentY = addTableRow('Code postal :', this.formData.codePostal, currentY);
        currentY = addTableRow('Ville :', this.formData.ville, currentY);
        currentY = addTableRow('Téléphone :', this.formData.telephone, currentY);
        currentY = addTableRow('Email :', this.formData.email, currentY);
        currentY = addTableRow('Type d\'adhésion :', this.getTypeAdhesion + ' (30 €)', currentY);
        currentY = addTableRow('Mode de paiement :', this.getModePaiement, currentY);
      }
      
      // Suite du PDF commun aux deux cas
      currentY += 10;
      
      // Pied de page
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;
      
      pdf.text('Date : ' + this.getCurrentDate(), margin, currentY);
      currentY += 10;
      
      pdf.text('Je déclare par la présente souhaiter devenir membre de l\'association Douciné.', margin, currentY);
      currentY += 20;
      
      pdf.text('Signature :', margin, currentY);
      currentY += 5;
      
      // Rectangle pour la signature
      pdf.setDrawColor(200, 200, 200);
      pdf.rect(margin, currentY, contentWidth, 30);
      
      // Nom du fichier
      const filename = `adhesion_doucine_${this.formData.nom.toLowerCase()}_${this.formData.prenom.toLowerCase()}.pdf`;
      
      if (forEmail) {
        // Simuler l'envoi par email (dans une vraie application, ceci serait géré par le backend)
        this.simulateEmailSending(pdf, filename);
      } else {
        // Télécharger le PDF directement
        pdf.save(filename);
      }
    },
    simulateEmailSending(pdf, filename) {
      // Convertir le PDF en blob pour l'envoi
      const pdfData = pdf.output('blob');
      
      // Créer un objet FormData pour l'envoi multipart
      const formData = new FormData();
      formData.append('pdf', pdfData, filename);
      formData.append('email', this.formData.email);
      formData.append('name', `${this.formData.prenom} ${this.formData.nom}`);
      formData.append('telephone', this.formData.telephone);
      formData.append('adresse', this.formData.adresse);
      formData.append('codePostal', this.formData.codePostal);
      formData.append('ville', this.formData.ville);
      formData.append('dateNaissance', this.formData.dateNaissance);
      formData.append('typeAdhesion', this.formData.typeAdhesion);
      formData.append('modePaiement', this.formData.modePaiement);
      
      // URL de l'API depuis les variables d'environnement
      // En production: https://api.association-doucine.fr/api/v2
      // En développement: http://localhost:3000/api/v2
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://api.association-doucine.fr/api/v2';
      
      // Déterminer si nous sommes en production
      const isProduction = import.meta.env.MODE === 'production';
      console.log(isProduction);  
      console.log(`Environnement: ${import.meta.env.MODE}`);
      console.log(`Envoi de l'adhésion à: ${apiBaseUrl}/adhesions`);
      
      // Timeout pour la requête (10 secondes)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Délai d'attente dépassé")), 10000);
      });
      
      // Envoyer les données au serveur avec un timeout
      Promise.race([
        fetch(`${apiBaseUrl}/adhesions`, {
          method: 'POST',
          body: formData,
          // Ne pas définir Content-Type, il sera automatiquement défini avec le boundary pour FormData
          credentials: 'include', // Envoyer les cookies pour l'authentification si nécessaire
        }),
        timeoutPromise
      ])
      .then(response => {
        this.isSubmitting = false;
        
        // Vérifier le statut de la réponse
        if (!response.ok) {
          // Si le statut est 401 ou 403, problème d'authentification
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Erreur d'authentification. Veuillez vous reconnecter.`);
          }
          
          // Pour les autres erreurs
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        // Traitement en cas de succès
        console.log('Réponse du serveur:', data);
        
        // Masquer partiellement l'email pour la confidentialité
        const emailMask = this.formData.email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
        
        // Afficher un message de confirmation
        let successMessage = `Votre demande d'adhésion a été enregistrée avec succès ! \n\n`;
        
        // Si l'email a été envoyé avec succès ou si nous sommes en développement
        if (data.emailStatus && data.emailStatus.member) {
          successMessage += `Un email contenant le récapitulatif de votre adhésion a été envoyé à l'adresse ${emailMask}. \n\n`;
        } 
        // Si l'adhésion est enregistrée mais l'email a échoué
        else if (data.emailError) {
          successMessage += `Nous n'avons pas pu envoyer l'email de confirmation à ${emailMask}. \n\n`;
          successMessage += `Raison: ${data.emailError}\n\n`;
          // Télécharger le PDF localement comme solution de secours
          pdf.save(filename);
          successMessage += `Le récapitulatif a été téléchargé sur votre appareil.\n\n`;
        }
        // Mode développement ou autre cas
        else if (isProduction) {
          successMessage += `Un email contenant le récapitulatif de votre adhésion a été envoyé à l'adresse ${emailMask}. \n\n`;
        } else {
          // En développement, indiquer que l'email n'est pas réellement envoyé
          successMessage += `[MODE DÉVELOPPEMENT] L'email aurait été envoyé à l'adresse ${emailMask} en production. \n\n`;
        }
        
        successMessage += `Vous recevrez bientôt une confirmation de la part de notre équipe.`;
        
        alert(successMessage);
        
        // Fermer le modal et réinitialiser le formulaire
        this.resetForm();
        this.closeModal();
      })
      .catch(error => {
        this.isSubmitting = false;
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        
        // En cas d'erreur, télécharger le PDF localement comme solution de secours
        pdf.save(filename);
        
        // Message d'erreur personnalisé selon le type d'erreur
        let errorMessage = `Une erreur est survenue lors de l'envoi de votre demande d'adhésion. \n\n`;
        
        // Personnaliser le message d'erreur selon le type d'erreur
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          errorMessage += `Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.\n\n`;
        } else if (error.message.includes("Délai d'attente dépassé")) {
          errorMessage += `Le serveur met trop de temps à répondre. Il pourrait être surchargé.\n\n`;
        } else if (error.message) {
          errorMessage += `Détail: ${error.message}\n\n`;
        }
        
        // Ajouter des instructions pour la récupération
        errorMessage += `Le récapitulatif de votre adhésion a été téléchargé sur votre appareil. \n\nVous pouvez l'envoyer directement par email à harrowjeanmichel@gmail.com ou nous contacter par téléphone au 0694 20 52 31 pour finaliser votre adhésion.`;
        
        // Afficher le message d'erreur
        alert(errorMessage);
        
        // Fermer le modal
        this.closeModal();
      });
    },
    resetForm() {
      this.formData = {
        prenom: '',
        nom: '',
        dateNaissance: '',
        adresse: '',
        codePostal: '',
        ville: '',
        telephone: '',
        email: '',
        typeAdhesion: 'membre',
        modePaiement: 'cheque'
      };
      
      this.errors = {
        prenom: '',
        nom: '',
        telephone: '',
        email: ''
      };
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR');
    },
    getCurrentDate() {
      return new Date().toLocaleDateString('fr-FR');
    },
    disableBodyScroll() {
      // Sauvegarde la position actuelle du défilement
      this.scrollPosition = window.pageYOffset;
      // Applique la position fixe au body avec la position actuelle
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.scrollPosition}px`;
      document.body.style.width = '100%';
    },
    enableBodyScroll() {
      // Restaure le défilement
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Retourne à la position précédente
      window.scrollTo(0, this.scrollPosition);
    }
  },
  beforeDestroy() {
    // S'assurer que le défilement est réactivé si le composant est détruit
    this.enableBodyScroll();
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 30px;
  overflow-y: auto;
}

.modal-container {
  background-color: white;
  border-radius: 15px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-header {
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  color: #EB1A3A;
  margin: 0;
  font-size: 24px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #666;
  line-height: 1;
}

.modal-body {
  padding: 30px;
}

.registration-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
}

.registration-header h3 {
  margin: 10px 0;
  color: #2A3040;
}

.registration-header p {
  margin: 5px 0;
  font-size: 14px;
}

.session-title {
  margin-top: 20px;
  font-weight: 600;
  color: #EB1A3A;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
  width: 100%;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  font-size: 14px;
  color: #2A3040;
}

.form-group input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #FBB018;
}

.radio-group {
  margin-top: 10px;
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio-option input[type="radio"] {
  accent-color: #EB1A3A;
}

.iban-info {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 16px;
  word-break: break-all;
}

.declaration {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #FBB018;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  color: white;
}

.btn-secondary {
  background-color: #eaeaea;
  color: #333;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Styles pour le PDF */
.pdf-container {
  width: 210mm;
  padding: 20mm;
  background-color: white;
}

.pdf-header {
  text-align: center;
  margin-bottom: 20mm;
}

.pdf-header h2 {
  color: #EB1A3A;
  margin-bottom: 5mm;
}

.pdf-header p {
  margin: 2mm 0;
}

.pdf-header h3 {
  margin-top: 10mm;
  color: #2A3040;
  border-bottom: 1px solid #ddd;
  padding-bottom: 3mm;
}

.pdf-content {
  font-size: 12pt;
}

.pdf-content h3 {
  margin-top: 10mm;
  margin-bottom: 5mm;
  color: #EB1A3A;
}

.pdf-content table {
  width: 100%;
  border-collapse: collapse;
}

.pdf-content table tr {
  border-bottom: 1px solid #eee;
}

.pdf-content table td {
  padding: 3mm;
}

.pdf-footer {
  margin-top: 20mm;
}

.signature-area {
  margin-top: 10mm;
}

.signature-box {
  height: 30mm;
  border: 1px solid #ddd;
  margin-top: 5mm;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .modal-container {
    max-width: 95%;
  }
  
  .modal-body {
    padding: 20px;
  }
}

.error-message {
  color: #EB1A3A;
  font-size: 12px;
  margin-top: 3px;
}

.form-group input:invalid {
  border-color: #EB1A3A;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 