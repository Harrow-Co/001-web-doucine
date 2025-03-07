<template>
  <div class="team-section">
    <div class="section-title">
      <!-- <div class="tagline">Équipe</div> -->
      <div class="content">
        <div class="heading">Notre équipe</div>
        <div class="subtitle">
          Rencontrez les membres passionnés de notre équipe.
        </div>
      </div>
    </div>

    <div class="team-content">
      <div class="team-grid">
        <TeamMemberCard
          v-for="member in teamMembers"
          :key="member.name"
          :member="member"
        />
      </div>
    </div>

    <div class="recruitment-section">
      <div class="content">
        <div class="heading">Nous recrutons !</div>
        <div class="text">Rejoignez notre équipe dynamique et engagée.</div>
      </div>
      <div class="actions">
        <div class="action-button">Postes ouverts</div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamMemberCard from './TeamMemberCard.vue'

export default {
  name: 'TeamSection',
  components: {
    TeamMemberCard
  },
  data() {
    return {
      teamMembers: [
        {
          name: 'Jean Dupont',
          title: 'Coordinateur principal',
          description: 'Jean est dévoué à créer des liens intergénérationnels enrichissants pour notre communauté.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        {
          name: 'Marie Lefèvre',
          title: 'Responsable des événements',
          description: "Marie organise des événements qui rassemblent les générations et favorisent l'engagement communautaire.",
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        {
          name: 'Paul Martin',
          title: 'Animateur bénévole',
          description: 'Paul apporte sa passion pour l\'animation et l\'interaction entre les participants.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        {
          name: 'Sophie Durand',
          title: 'Chargée de communication',
          description: 'Sophie assure la visibilité de nos actions et événements à travers divers canaux.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.team-section {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 112px 64px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: start;
}

.section-title {
  display: flex;
  width: 768px;
  max-width: 100%;
  flex-direction: column;
  align-items: stretch;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000000;
  text-align: center;
  justify-content: start;
}

.tagline {
  align-self: center;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.content {
  margin-top: 16px;
  width: 100%;
}

.heading {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
}

.subtitle {
  font-size: 18px;
  font-weight: 400;
  margin-top: 24px;
}

.team-content {
  align-self: stretch;
  margin-top: 80px;
  width: 100%;
}

.team-grid {
  display: flex;
  width: 100%;
  align-items: start;
  gap: 32px;
  justify-content: start;
  flex-wrap: wrap;
}

.recruitment-section {
  display: flex;
  margin-top: 80px;
  width: 768px;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000000;
  justify-content: start;
}

.recruitment-section .content {
  width: 100%;
  text-align: center;
}

.recruitment-section .heading {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
}

.recruitment-section .text {
  font-size: 18px;
  font-weight: 400;
  margin-top: 16px;
}

.actions {
  margin-top: 24px;
  width: 155px;
  max-width: 100%;
  font-size: 16px;
  font-weight: 400;
}

.action-button {
  border: 1px solid rgba(0, 0, 0, 1);
  width: 100%;
  padding: 12px 24px;
  gap: 8px;
  cursor: pointer;
  text-align: center;
}

@media (max-width: 991px) {
  .team-section {
    padding: 100px 20px;
  }

  .tagline {
    white-space: initial;
  }

  .content {
    max-width: 100%;
  }

  .heading {
    font-size: 40px;
    max-width: 100%;
  }

  .subtitle {
    max-width: 100%;
  }

  .team-content {
    max-width: 100%;
    margin-top: 40px;
  }

  .team-grid {
    max-width: 100%;
  }

  .recruitment-section {
    margin-top: 40px;
  }

  .recruitment-section .heading {
    max-width: 100%;
  }

  .recruitment-section .text {
    max-width: 100%;
  }

  .action-button {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
