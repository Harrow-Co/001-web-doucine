<template>
  <div class="team-section section">
    <div class="section-title">
      <span class="tagline">Équipe</span>
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
      <!-- <div class="content">
        <div class="heading">Nous recrutons !</div>
        <div class="text">Rejoignez notre équipe dynamique et engagée.</div>
      </div>
      <div class="actions">
        <button class="btn btn-primary">Postes ouverts</button>
      </div> -->
    </div> 
  </div>
</template>

<script>
import TeamMemberCard from '../cards/TeamMemberCard.vue'

export default {
  name: 'TeamSection',
  components: {
    TeamMemberCard
  },
  data() {
    return {
      teamMembers: [
        {
          name: 'Sylviane Jean Baptiste Adolphe',
          title: 'Présidente',
          description: 'Sylviane dirige avec passion l\'association et coordonne les différentes actions.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        {
          name: 'Jean Jean Baptiste Adolphe',
          title: 'Vice-président',
          description: 'Jean soutient la présidence et contribue au développement des projets de l\'association.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        {
          name: 'Jessy Dambury',
          title: 'Secrétaire',
          description: 'Jessy s\'occupe de la gestion administrative et de la documentation des activités.',
          image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
          srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
          socialIcons: [
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
            'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
          ]
        },
        // {
        //   name: 'Jonathan Jean-Baptiste Adolphe',
        //   title: 'Secrétaire Adjoint',
        //   description: 'Jonathan assiste le secrétaire dans ses fonctions administratives.',
        //   image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
        //   srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
        //   socialIcons: [
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
        //   ]
        // },
        // {
        //   name: 'Aveline Faiseau-Ducoudray',
        //   title: 'Trésorière',
        //   description: 'Aveline gère les finances et les ressources de l\'association.',
        //   image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
        //   srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
        //   socialIcons: [
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
        //   ]
        // },
        // {
        //   name: 'Karine Charlotte',
        //   title: 'Trésorière Adjointe',
        //   description: 'Karine aide à la gestion financière et au suivi des budgets de l\'association.',
        //   image: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true',
        //   srcset: 'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f6e0ab8bbe2878ec5bff87f7e4371827da42581541da045d58fa2cde46a4a5d9?placeholderIfAbsent=true&width=2000 2000w',
        //   socialIcons: [
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7d5b70f8e6e1dd3dd91aba4e2f777ce5dccb9061fcb8e130497b9bcf370f6a72?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b8c9341cebbee1fc839e984272dc0a2ed1753efa1dd8c1f9243dcee20681f600?placeholderIfAbsent=true',
        //     'https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f9bda8f9b38d9cc83ffabe447fe06beeba7f011a8c0e0cf116acfb1faf2bc0ca?placeholderIfAbsent=true'
        //   ]
        //}
      ]
    }
  }
}
</script>

<style scoped>
.team-section {
  background-color: #fff;
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
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  text-align: center;
  justify-content: start;
}

.tagline {
  align-self: center;
  font-size: 14px;
  font-weight: 600;
  background: rgba(251, 176, 24, 0.15);
  color: #FBB018;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
  display: inline-block;
}

.content {
  margin-top: 16px;
  width: 100%;
}

.heading {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: #2A3040;
  position: relative;
  display: inline-block;
  padding-bottom: 20px;
}

.heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #FBB018 0%, #EB1A3A 100%);
  border-radius: 2px;
}

.subtitle {
  font-size: 18px;
  font-weight: 400;
  margin-top: 24px;
  color: #4D5259;
  line-height: 1.7;
}

.team-content {
  align-self: stretch;
  margin-top: 80px;
  width: 100%;
}

.team-grid {
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.recruitment-section {
  margin-top: 80px;
  padding: 40px;
  width:1968px;
  max-width: 100%;
  background-color: #FAFAFA;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  justify-content: start;
  position: relative;
  overflow: hidden;
}

.recruitment-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
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

.recruitment-section .heading::after {
  width: 60px;
}

.recruitment-section .text {
  font-size: 18px;
  font-weight: 400;
  margin-top: 16px;
  color: #4D5259;
}

.actions {
  margin-top: 32px;
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
    font-size: 36px;
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
    gap: 20px;
  }

  .recruitment-section {
    margin-top: 40px;
    padding: 30px 20px;
  }
}
</style>
