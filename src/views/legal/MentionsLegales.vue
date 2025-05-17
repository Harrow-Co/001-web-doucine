<template>
  <div class="mentions-legales">
    
    
    <div class="container">
      <div class="content-block">
        <h2>Mentions légales</h2>
        <p class="last-updated">Dernière mise à jour : {{ currentDate }}</p>
        
        <div class="section">
          <h3>1. Informations légales</h3>
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, nous vous informons que :</p>
          
          <div class="subsection">
            <h4>Éditeur du site</h4>
            <p>Le site doucine.org est édité par :</p>
            <p>Association Doucine<br>
            Statut juridique : Association loi 1901<br>
            Siège social : 17 rue du vieux puits, 97351 Matoury, Guyane française<br>
            SIRET : [Numéro SIRET]<br>
            RNA : [Numéro RNA]<br>
            Téléphone : 0694 20 52 31<br>
            Email : doucine97351@gmail.com</p>
            
            <p>Directeur de la publication : [Nom du directeur de publication]</p>
          </div>
          
          <div class="subsection">
            <h4>Hébergement</h4>
            <p>Ce site est hébergé par :</p>
            <p>[Nom de l'hébergeur]<br>
            [Adresse de l'hébergeur]<br>
            [Pays de l'hébergeur]<br>
            [Téléphone de l'hébergeur]</p>
          </div>
        </div>
        
        <div class="section">
          <h3>2. Conditions d'utilisation</h3>
          <p>L'utilisation de ce site implique l'acceptation pleine et entière des conditions d'utilisation décrites ci-après. Ces conditions d'utilisation peuvent être modifiées à tout moment. Les utilisateurs du site sont donc invités à les consulter régulièrement.</p>
          
          <p>Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut néanmoins être décidée par l'Association Doucine.</p>
        </div>
        
        <div class="section">
          <h3>3. Description des services fournis</h3>
          <p>Le site doucine.org a pour objet de fournir des informations concernant l'ensemble des activités de l'association Doucine.</p>
          
          <p>L'Association Doucine s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
          
          <p>Toutes les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.</p>
        </div>
        
        <div class="section">
          <h3>4. Propriété intellectuelle</h3>
          <p>L'Association Doucine est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.</p>
          
          <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'Association Doucine.</p>
          
          <p>Toute exploitation non autorisée du site ou d'un quelconque élément qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
        </div>
        
        <div class="section">
          <h3>5. Limitations de responsabilité</h3>
          <p>L'Association Doucine ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site doucine.org, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.</p>
          
          <p>L'Association Doucine ne pourra également être tenue responsable des dommages indirects consécutifs à l'utilisation du site doucine.org.</p>
          
          <p>Des espaces interactifs (possibilité de poser des questions) sont à la disposition des utilisateurs. L'Association Doucine se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, l'Association Doucine se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l'utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).</p>
        </div>
        
        <div class="section">
          <h3>6. Gestion des données personnelles</h3>
          <p>En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et le Règlement Européen 2016/679 du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données (RGPD).</p>
          
          <p>Pour plus d'informations sur la façon dont nous traitons vos données personnelles, veuillez consulter notre <router-link to="/politique-confidentialite" class="text-link">Politique de confidentialité</router-link>.</p>
        </div>
        
        <div class="section">
          <h3>7. Liens hypertextes</h3>
          <p>Le site doucine.org peut contenir des liens hypertextes vers d'autres sites internet ou applications. Dans la mesure où l'Association Doucine ne peut contrôler les contenus de ces sites et applications externes, l'utilisateur reconnaît que l'Association Doucine n'assume aucune responsabilité quant à la mise à disposition de ces ressources externes, et ne peut être tenue responsable quant à leur contenu.</p>
        </div>
        
        <div class="section">
          <h3>8. Droit applicable et juridiction compétente</h3>
          <p>Tout litige en relation avec l'utilisation du site doucine.org est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Fort-de-France.</p>
        </div>
        
        <div class="section">
          <h3>9. Lexique</h3>
          <p>Utilisateur : Internaute se connectant, utilisant le site doucine.org.</p>
          <p>Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>
        </div>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/layout/TheFooter.vue";

export default {
  name: "MentionsLegales",
  components: {
    TheFooter
  },
  computed: {
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.mentions-legales {
  margin-top: 100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  flex: 1;
}

.content-block {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 32px;
  font-weight: 700;
  color: #2a3040;
  margin: 0 0 16px;
}

.last-updated {
  color: #4d5259;
  font-style: italic;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 30px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: #bc0926;
  margin: 0 0 16px;
}

.subsection {
  margin: 20px 0;
}

h4 {
  font-size: 18px;
  font-weight: 600;
  color: #333740;
  margin: 0 0 12px;
}

p {
  color: #4d5259;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.text-link {
  color: #bc0926;
  text-decoration: none;
  transition: all 0.3s ease;
}

.text-link:hover {
  text-decoration: underline;
}

.text-link:focus {
  outline: none;
}

@media (max-width: 991px) {
  .content-block {
    padding: 30px 20px;
  }
  
  h2 {
    font-size: 28px;
  }
}
</style> 