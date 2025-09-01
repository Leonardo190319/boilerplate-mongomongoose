require('dotenv').config();
const mongoose = require('mongoose');

// ------------------- MONGOOSE -------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error de conexión a MongoDB:', err));

// ------------------- MODELO -------------------
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// ------------------- FUNCIONES -------------------
const createAndSavePerson = (done) => {
  const jane = new Person({ name: "Jane Doe", age: 25, favoriteFoods: ["pizza"] });
  jane.save((err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if(err) return done(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1 })
    .exec((err, data) => {
      if(err) return done(err);
      done(null, data);
    });
};

// ------------------- EXPORTS -------------------
module.exports.PersonModel = Person;
module.exports.createAndSavePerson = createAndSavePerson;
module.exports.createManyPeople = createManyPeople;
module.exports.findPeopleByName = findPeopleByName;
module.exports.findOneByFood = findOneByFood;
module.exports.findPersonById = findPersonById;
module.exports.findEditThenSave = findEditThenSave;
module.exports.findAndUpdate = findAndUpdate;
module.exports.removeById = removeById;
module.exports.removeManyPeople = removeManyPeople;
module.exports.queryChain = queryChain;
