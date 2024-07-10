const express = require("express");
const router = express.Router();
let dbconnect = require("../config/dbconfig");
let { ObjectId } = require("mongodb");

router.post("/add-task", async (req, res, next) => {
  console.log("add task methosd is called");
  let taskDetails = {
    name: req.body.name,
    due: req.body.due,
    assignee: req.body.assignee,
    desc: req.body.desc,
  };
  let collection = dbconnect.get().collection("tasks");
  try {
    const result = await collection.insertOne(taskDetails);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.toString(),
      success: false,
    });
  }
});
router.post("/add-section", async (req, res, next) => {
  console.log("add section methosd is called");
  let sectionDetails = {
    name: req.body.name,
    taskIds: req.body.taskIds,
  };
  let collection = dbconnect.get().collection("sections");
  try {
    const result = await collection.insertOne(sectionDetails);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.toString(),
      success: false,
    });
  }
});
router.get("/tasks-all", async (req, res) => {
  try {
    let collection = dbconnect.get().collection("tasks");
    const result = await collection.find({}).toArray();
    // console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
router.get("/sections-all", async (req, res) => {
  try {
    let collection = dbconnect.get().collection("sections");
    const result = await collection.find({}).toArray();
    // console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
router.put("/update-section/:secid/:taskId", async (req, res) => {
  console.log("updating");
  console.log(req.params);
  try {
    let collection = dbconnect.get().collection("sections");
    const result = await collection.updateOne(
      {
        _id: new ObjectId(req.params.secid),
      },
      {
        $push: {
          taskIds: req.params.taskId,
        },
      }
    );
    console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
router.put("/update-section/:secid", async (req, res) => {
  let newTaskIds = req.body.taskIds;
  let secid = req.params.secid;
  try {
    let collection = dbconnect.get().collection("sections");
    const result = await collection.updateOne(
      {
        _id: new ObjectId(req.params.secid),
      },
      {
        $set: {
          taskIds: newTaskIds,
        },
      }
    );
    console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});

router.delete("/tasks/:id", async (req, res) => {
  let id = req.params.id;
  let collection = dbconnect.get().collection("tasks");
  try {
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
router.delete("/sections/:id", async (req, res) => {
  let id = req.params.id;
  let collection = dbconnect.get().collection("sections");
  try {
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
router.post("/tasks/:taskid/delete-id-from-section", async (req, res) => {
  let id = req.params.taskid;
  let collection = dbconnect.get().collection("section");
  try {
    const result = await collection.updatMany(
      {},
      {
        $pull: {
          taskIds: id,
        },
      }
    );

    console.log(res);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {}
});
module.exports = router;
