const request = require('supertest');
const app = require('../app');

describe('CONTENT_SERVICE API', () => {

  it('fetch content', (done) => {
    request(app)
      .get('/content')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('create content', (done) => {
    request(app)
      .post('/content')
      .send({ title: "Sample Title", body: "Sample Body" })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
        expect(res.body).toHaveProperty('title', 'Sample Title');
        expect(res.body).toHaveProperty('body', 'Sample Body');
      });
  });

  it('update content', (done) => {
    request(app)
      .put('/content/1')
      .send({ title: "Updated Title", body: "Updated Body" })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('delete content', (done) => {
    request(app)
      .delete('/content/1')
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});


  it('fetch topics', (done) => {
    request(app)
      .get('/topics')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);  
        done();
      });
  });

  it('fetch bookmarks', (done) => {
    request(app)
      .get('/bookmarks')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);  
        done();
      });
  });