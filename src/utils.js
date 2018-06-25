const baseUrl = 'http://localhost/escolar-api/'
const login = `${baseUrl}student/login`
const materias = `${baseUrl}est/materias`
const materia = id => (`${baseUrl}est/materia/${id}`)

export default {
  login,
  materias,
  materia
}
