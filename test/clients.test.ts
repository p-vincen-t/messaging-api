// import * as mocha from 'mocha';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import app from 'server';

// chai.use(chaiHttp);
// const expect = chai.expect;
// // expected arguments email, names, password
// describe('POST register', () => {    
//     it('responds with user upon registering in', () => {
//         return chai.request(app).post('/auth/register')
//             .send({ email: 'vinsonpeter8@gmail.com', names: 'Vincent Peter', password: 'password' })
//             .then(res => {
//                 expect(res.status).to.equal(20);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.an('object');
//             });
//     });
//     it('should respond', () => {
//         return chai.request(app).get('/api/v1/heroes')
//             .then(res => {
//                 let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
//                 expect(Wolverine).to.exist;
//                 expect(Wolverine).to.have.all.keys([
//                     'id',
//                     'name',
//                     'aliases',
//                     'occupation',
//                     'gender',
//                     'height',
//                     'hair',
//                     'eyes',
//                     'powers'
//                 ]);
//             });
//     });
//     describe('GET api/v1/heroes/:id', () => {

//         it('responds with single JSON object', () => {
//             return chai.request(app).get('/api/v1/heroes/1')
//                 .then(res => {
//                     expect(res.status).to.equal(200);
//                     expect(res).to.be.json;
//                     expect(res.body).to.be.an('object');
//                 });
//         });
//         it('should return Luke Cage', () => {
//             return chai.request(app).get('/api/v1/heroes/1')
//                 .then(res => {
//                     expect(res.body.hero.name).to.equal('Luke Cage');
//                 });
//         });
//     });
// });