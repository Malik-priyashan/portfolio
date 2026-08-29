import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const existingNodeOptions = process.env.NODE_OPTIONS || "";
const nodeOptions = `${existingNodeOptions} --use-system-ca`.trim();

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  cwd: root,
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
  shell: false,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
