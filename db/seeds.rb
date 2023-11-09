Attendance.destroy_all
Event.destroy_all
User.destroy_all

# Create users
user1 = User.create(username: 'john_doe', password: 'password123')
user2 = User.create(username: 'jane_smith', password: 'password456')

# Create events
event1 = Event.create(
  title: 'Event 1',
  address: '123 Main St',
  date: Date.today + 10.days,  # Set a date 10 days from today
  time: Time.parse('14:00'),    # Set a specific time (2:00 PM in this case)
  details: 'This is Event 1. Join us for a great time!'
)

event2 = Event.create(
  title: 'Event 2',
  address: '456 Elm St',
  date: Date.today + 15.days,  # Set a date 15 days from today
  time: Time.parse('18:30'),    # Set a specific time (6:30 PM in this case)
  details: 'Event 2 details will be provided soon.'
)

puts 'Seeding completed successfully!'