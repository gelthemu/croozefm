import os from "os";
const interfaces = os.networkInterfaces();

process.stdin.on("data", (data) => {
  process.stdout.write(data);

  const output = data.toString();
  if (output.includes("- Network:")) {
    const addresses = [];
    Object.keys(interfaces).forEach((interfaceName) => {
      interfaces[interfaceName].forEach((iface) => {
        if (iface.family === "IPv4" && !iface.internal) {
          addresses.push(iface.address);
        }
      });
    });

    if (addresses.length > 0) {
      console.log("\n You can also access your app at:");
      addresses.forEach((addr) => {
        console.log(` - http://${addr}:3000`);
      });
    }
  }
});
