const utilisateur = require("./routes/utilisateur.routes")
const supertest = require("supertest")
const req = supertest(utilisateur)
const mongoose = require('mongoose');
const UtilisateurModel = require('./models/Utilisateur')
const userData = { nom: 'Dylan', prenom: 'Bob', pseudo: "bobo", mail: 'boby7@demo.fr', mot_de_passe: 'testtest', description: 'bla' };
describe('creation utilisateur', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log("Connexion non réussie",err);
                process.exit(1);
            }
        });
    });
  
    // it('creation et sauvegarde dun utilisateur', async () => {
    //     const validUser = new UtilisateurModel(userData);
    //     const savedUser = await validUser.save();
    //     // Object Id should be defined when successfully saved to MongoDB.
    //     expect(savedUser._id).toBeDefined();
    //     expect(savedUser.nom).toBe(userData.nom);
    //     expect(savedUser.prenom).toBe(userData.prenom);
    //     expect(savedUser.pseudo).toBe(userData.pseudo);
    //     expect(savedUser.mail).toBe(userData.mail);
    //     expect(savedUser.description).toBe(userData.description);
    // });

    // it('insertion dun utilisateur réussie mais un champ nest pas défini', async () => {
    //     const utilisateuravecchampinvalide = new UtilisateurModel({nom: 'Dylan', prenom: 'Bob', mail: 'test@demo.fr', mot_de_passe: 'testtest',  pseudo: "bobo",  });
    //     const sauvegardeutilisateuravecchampinvalide = await utilisateuravecchampinvalide.save();
    //     expect(sauvegardeutilisateuravecchampinvalide._id).toBeDefined();
    //     expect(sauvegardeutilisateuravecchampinvalide.description).toBeUndefined();
    // });

    // it('création dun utilisateur avec un champ non défini mais obligatoire', async () => {
    //     const utilisateuravecchampnondefinimaisobligatoire = new UtilisateurModel({nom: 'Dylan', prenom: 'Bob', mot_de_passe: 'testtest',  pseudo: "bobo"});
    //     let err;
    //     try {
    //         const sauvegardeutilisateuravecchampnondefinimaisobligatoire = await utilisateuravecchampnondefinimaisobligatoire.save();
    //         error = sauvegardeutilisateuravecchampnondefinimaisobligatoire;
    //     } catch (error) {
    //         err = error
    //     }
    //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //     expect(err.errors.mail).toBeDefined();
    // });  
  });