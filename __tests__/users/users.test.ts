import { Server } from 'http'
import userModel from '../../models/user.model'
import request from 'supertest'

let server: Server

async function createUser() {
  const user = new userModel({
    username: 'unitest',
    firstname: 'test',
    lastname: 'test',
    email: 'sometest@gmail.com',
    password: '12345678',
  })
  await user.save()
  return user
}

describe('/users', () => {
  beforeEach(() => {
    server = require('../../src/server')
  })
  afterEach(async () => {
    await userModel.deleteMany({})
    await server.close()
  })

  describe('GET /:id', () => {
    it('should return a user if valid id is entered', async () => {
      const user = await createUser()

      const res = await request(server).get('/users/' + user._id)

      expect(res.status).toBe(200)
      expect(res.body.username).toEqual(user.username)
      expect(res.body.firstname).toEqual(user.firstname)
      expect(res.body.lastname).toEqual(user.lastname)
      expect(res.body.email).toEqual(user.email)
    })

    it('should return a error if user does not exist', async () => {
      const user = {
        _id: '6220f62b09ad6213d719a4b9',
        __v: 0,
      }

      const res = await request(server).get('/users/' + user._id)

      expect(res.status).toBe(404)
    })
  })

  describe('GET / getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ email: "user1@test.xyz" }, { email: "user2@test.xyz"  }];
      await userModel.collection.insertMany(users);

      const res = await request(server).get('/users/')

      expect(res.status).toBe(200);
      expect(res.body.length).toEqual(2)
    })
  })
})