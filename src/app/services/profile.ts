import {v4 as uuid} from 'uuid'

export class Profile {
  role = 'client'
  uid = ''
  fullname = ''
  // client
  nickname = ''
  address = ''
  phones: ProfilePhone[] = []
  dogs: ProfileDog[] = []
  // groomer
  appointments: ProfileAppointment[] = []

  static create(uid) {
    const p = new Profile()
    p.role = 'client'
    p.uid = uid
    return p
  }

  static object(p: Profile) {
    const o = Object.assign({}, p)
    o.phones = p.phones.map(item => Object.assign({}, item))
    o.dogs = p.dogs.map(item => Object.assign({}, item))
    o.appointments = p.appointments.map(item => Object.assign({}, item))
    return o
  }
}


export class ProfileDog {
  id = ''
  name = ''
  breed = ''
  dob = ''

  static create() {
    const dog = new ProfileDog()
    dog.id = uuid()
    return dog
  }
}

export class ProfilePhone {
  name = ''
  number = ''
}

export class ProfileAppointment {
  master = ''
  date = ''
  timeslot = ''
  services = []
  dog = ''
  note = ''

  static from(profile: Profile, dog: ProfileDog, date: Date, slot, services, note) {
    const a = new ProfileAppointment()
    a.master = profile.uid
    a.dog = dog.id
    a.date = date.toISOString().slice(0, 10)
    a.timeslot = slot
    a.services = services
    a.note = note
    return a
  }

  static objectFrom(profile: Profile, dog: ProfileDog, date: Date, slot, services, note) {
    const a = ProfileAppointment.from(profile, dog, date, slot, services, note)
    return Object.assign({}, a)
  }
}
