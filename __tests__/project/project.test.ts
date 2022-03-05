import { Server } from "http";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import projectModel from "../../models/project.model";

let server: Server;

const createProject = async () => {
  const project = new projectModel({
    name: "Projekt testowy",
    userId: "4edd40c86762e0fb12000003",
    mentorId: "fcee56c86762e0fb12000112",
    content: "To jest opis dla aplikacji",
  });

  await project.save();
  return project;
};

describe("/project", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });

  afterEach(async () => {
    await projectModel.deleteMany({});
    await server.close();
  });

  describe("CREATE", () => {
    it("should create new project if it does not exist", async () => {
      const res = await request(server).post("/project/create").send({
        name: "testowy projekt 3",
        userId: "4edd40c86762e0fb12000003",
        mentorId: "fcee56c86762e0fb12000112",
        content: "Tajna apka 3",
      });

      expect(res.status).toBe(StatusCodes.OK);
    });

    it("should return 400 if project already exists", async () => {
      const project = await createProject();

      const res = await request(server).post("/project/create").send({
        name: project.name,
        userId: "ffdd40c86762e0fb12000003",
        mentorId: "ffee56c86762e0fb12000112",
        content: "Test content",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("EDIT", () => {
    it("should return 404 if project not found", async () => {
      let nonExistingId = "1420f53b09ff6213d719b4b2";

      const res = await request(server)
        .put("/project/" + nonExistingId)
        .send({
          name: "blah blah",
          userId: "ffdd40c86762e0fb12000003",
          mentorId: "ffee56c86762e0fb12000112",
          content: "Test content",
        });

      expect(res.status).toBe(404);
    });
  });

  describe("GET /:id", () => {
    it("should return existing project if valid id is present", async () => {
      const project = await createProject();

      const res = await request(server).get("/project/" + project._id);

      expect(res.status).toBe(200);
      expect(res.body.name).toEqual(project.name);
      expect(res.body.userId).toBe(project.userId);
      expect(res.body.mentorId).toBe(project.mentorId);
      expect(res.body.content).toBe(project.content);
    });

    it("should return 404 if project not found by id", async () => {
      let nonExistingId = "1420f53b09ff6213d719b4b2";

      const res = await request(server).get("/project/" + nonExistingId);

      expect(res.status).toBe(404);
    });
  });

  describe("GET /getAll", () => {
    it("should return all projects", async () => {
      const projects = [{ name: "project 1" }, { name: "project 2" }];
      await projectModel.collection.insertMany(projects);

      const res = await request(server).get("/project/");

      expect(res.status).toBe(200);
      expect(res.body.length).toEqual(2);
    });
  });
});