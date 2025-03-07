<template>
  <div class="evenement">
    <div class="evenement-header">
      <h1>Nos Événements</h1>
      <p class="subtitle">Rejoignez-nous lors de nos prochains événements</p>
    </div>

    <div class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-image" :style="{ backgroundImage: `url(${event.image})` }">
          <div class="event-date">
            <span class="day">{{ event.date.day }}</span>
            <span class="month">{{ event.date.month }}</span>
          </div>
        </div>
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <p class="event-description">{{ event.description }}</p>
          <div class="event-details">
            <div class="detail">
              <i class="fas fa-clock"></i>
              <span>{{ event.time }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ event.location }}</span>
            </div>
          </div>
          <button class="register-btn">S'inscrire</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageEvenement',
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Workshop Design Thinking',
          description: 'Apprenez les fondamentaux du design thinking lors de cet atelier pratique.',
          date: { day: '15', month: 'MAI' },
          time: '14:00 - 17:00',
          location: 'Paris',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b'
        },
        {
          id: 2,
          title: 'Conférence Tech Innovation',
          description: 'Découvrez les dernières tendances technologiques avec nos experts.',
          date: { day: '22', month: 'MAI' },
          time: '10:00 - 18:00',
          location: 'Lyon',
          image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678'
        },
        {
          id: 3,
          title: 'Meetup Développeurs',
          description: 'Rencontrez d\'autres développeurs et partagez vos expériences.',
          date: { day: '30', month: 'MAI' },
          time: '19:00 - 22:00',
          location: 'Bordeaux',
          image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7'
        }
      ]
    }
  }
}
</script>

<style scoped>
.evenement {
  padding: 120px 20px 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.evenement-header {
  text-align: center;
  margin-bottom: 50px;
}

.evenement-header h1 {
  font-size: 2.5em;
  color: #000000;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.2em;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.event-date {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-date .day {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
}

.event-date .month {
  display: block;
  font-size: 0.9em;
  color: #666;
}

.event-content {
  padding: 20px;
}

.event-content h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.event-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.event-details {
  margin-bottom: 20px;
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #666;
}

.detail i {
  margin-right: 10px;
  color: #3498db;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.register-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .evenement {
    padding: 100px 10px 20px 10px;
  }
}
</style> 