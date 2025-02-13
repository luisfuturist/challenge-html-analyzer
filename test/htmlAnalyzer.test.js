import { spawn } from "child_process";
import { join } from "path";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import http from "http";
import fs from "fs";

const CONFIG = {
  testDir: "./test/files",
  port: 8000,
  baseUrl: function () {
    return `http://localhost:${this.port}`;
  },
}

// Verify the test directory exists and contains the test files
async function verifyFiles() {
  if (!fs.existsSync(CONFIG.testDir)) {
    throw new Error("Test directory does not exist");
  }
}

// Start an HTTP server to serve test files
let server;
async function startServer() {
  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
      const filePath = join(CONFIG.testDir, req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    });

    server.listen(CONFIG.port, resolve);
  });
}

// Stop the server after tests
async function stopServer() {
  return new Promise((resolve) => server.close(resolve));
}

// Function to run Java process and return output
function runHtmlAnalyzer(file, baseUrl = true) {
  if (baseUrl) {
    baseUrl = CONFIG.baseUrl() + "/";
  } else {
    baseUrl = "";
  }

  return new Promise((resolve) => {
    const url = `${baseUrl}${file}`;
    const process = spawn("java", ["HtmlAnalyzer", url]);

    let output = "";
    process.stdout.on("data", (data) => (output += data.toString()));
    process.stderr.on("data", (data) => (output += data.toString()));

    process.on("close", () => resolve(output.trim()));
  });
}

// Test suite
describe("HtmlAnalyzer", () => {
  beforeAll(async () => {
    await verifyFiles();
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it("HTML Example 1 (Simple structure)", async () => {
    const output = await runHtmlAnalyzer("example1.html");
    expect(output).toBe("This is the title.");
  });

  it("HTML Example 2 (Multiple nested elements)", async () => {
    const output = await runHtmlAnalyzer("example2.html");
    expect(output).toBe("Text inside the second div.");
  });

  it("HTML Example 3 (Malformed HTML with unclosed tag)", async () => {
    const output = await runHtmlAnalyzer("example3.html");
    expect(output).toBe("malformed HTML");
  });

  it("HTML Example 4 (Deeply nested elements)", async () => {
    const output = await runHtmlAnalyzer("example4.html");
    expect(output).toBe("Text inside the article.");
  });

  it("HTML Example 5 (Empty body with title)", async () => {
    const output = await runHtmlAnalyzer("example5.html");
    expect(output).toBe("This is the title.");
  });

  it("HTML Example 6 (Nested lists)", async () => {
    const output = await runHtmlAnalyzer("example6.html");
    expect(output).toBe("Sub-sub-subitem");
  });

  it("HTML Example 7 (Malformed HTML with extra closing tag)", async () => {
    const output = await runHtmlAnalyzer("example7.html");
    expect(output).toBe("malformed HTML");
  });

  it("HTML Example 8 (Indented content)", async () => {
    const output = await runHtmlAnalyzer("example8.html");
    expect(output).toBe("Indented title.");
  });

  it("HTML Example 9 (Empty line and indentation with content)", async () => {
    const output = await runHtmlAnalyzer("example9.html");
    expect(output).toBe("Title with indentation and space.");
  });

  it("HTML Example 10 (Multiple blank lines and indentation)", async () => {
    const output = await runHtmlAnalyzer("example10.html");
    expect(output).toBe("Title with indentation and blank lines.");
  });

  it("HTML Example 11 (Blank line after tag)", async () => {
    const output = await runHtmlAnalyzer("example11.html");
    expect(output).toBe("Title with blank line before body.");
  });

  it("HTML Example 12 (Axreng Example)", async () => {
    const output = await runHtmlAnalyzer("http://hiring.axreng.com/internship/example1.html", false);
    expect(output).toBe("This is the title.");
  });

  it("Handles connection issues gracefully", async () => {
    const output = await runHtmlAnalyzer("nonexistent.html");
    expect(output).toBe("URL connection error");
  });
});
