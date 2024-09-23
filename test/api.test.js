const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Asegúrate de que la ruta sea correcta
const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
    let token; // Variable para almacenar el token de autenticación

    // Caso de prueba 1: Verificar el registro de usuario
    it('should register a new user', (done) => {
        chai.request(app)
            .post('/api/register')
            .send({
                username: 'nuevo_usuario',
                password: 'password_seguro',
                email: 'correo@ejemplo.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').that.equals('Usuario registrado correctamente'); // Ajusta según tu mensaje
                expect(res.body).to.have.property('user');
                done();
            });
    });

    // Caso de prueba 2: Verificar el inicio de sesión de usuario
    it('should log in an existing user', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'nuevo_usuario',
                password: 'password_seguro'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token; // Almacena el token para las pruebas posteriores
                done();
            });
    });

    // Caso de prueba 3: Verificar el acceso a un recurso protegido con autenticación
    it('should access a protected resource with valid token', (done) => {
        chai.request(app)
            .get('/api/protected-resource')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data'); // Ajusta según la estructura de tu respuesta
                done();
            });
    });

    // Caso de prueba 4: Verificar el cierre de sesión de usuario
    it('should log out a user', (done) => {
        chai.request(app)
            .post('/api/logout')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').that.equals('Sesión cerrada correctamente'); // Ajusta según tu mensaje
                done();
            });
    });
});
