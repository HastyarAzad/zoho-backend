const { exec } = require("child_process");

// Function to install Python packages
function installPythonPackages() {
  const pythonProcess = exec(
    "pip install -Ur ./requirements.txt",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing Python packages: ${error.message}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    }
  );

  // Log Python package installation output to the Node.js console
  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python package installation stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python package installation stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python package installation process exited with code ${code}`);
  });
}

// Install Python packages
installPythonPackages();
