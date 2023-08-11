const { exec } = require("child_process");
const student_module = require("../modules/student_module");
const job_module = require("../modules/job_module");
const fs = require("fs");

// Function to run the Python script
exports.runPythonScript = async () => {

  // Get the student data
  const student_data = await student_module.getAll();
  // store the student data in a json file inside the AI_stuff/data/job posts dataset folder
  fs.writeFileSync("./AI_stuff/data/job posts dataset/student_data.json", JSON.stringify(student_data));

  // Get the job data
  const job_data = await job_module.getAll();
  // store the job data in a json file inside the AI_stuff/data/job posts dataset folder
  fs.writeFileSync("./AI_stuff/data/job posts dataset/job_data.json", JSON.stringify(job_data));


  const pythonProcess = exec("python ./AI_stuff/script.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });

  // Log Python script output to the Node.js console
  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

// // Run the Python script
// runPythonScript();
