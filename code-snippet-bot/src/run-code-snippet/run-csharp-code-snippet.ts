import * as Fake from "@seamapi/fake-seam-connect";
import { runInsideContainer } from "./run-inside-container"
import stripAnsi from "strip-ansi"

export const runCsharpCodeSample = async (csharp_sample: string) => {
  const fake = await Fake.createFake()
  const seed = await fake.seed()
  const server = await fake.startServer()

  const modified_csharp_sample = csharp_sample
    .replace(/YourServerUrl/g, server.serverUrl)
    .replace(/YourApiKey/g, seed.seam_apikey1_token)

  const run_sh = `
    cd /root
    dotnet run
  `.trim()

  const { stdout, stderr } = await runInsideContainer({
    command: "/root/run.sh",
    imageName: "seamapi/csharp-sample-runner",
    filesystem: {
      "/root/Program.cs": modified_csharp_sample,
      "/root/run.sh": run_sh,
    },
  })

  const logged_content: string[] = [stripAnsi(stdout).trim()]

  if (stderr) {
    console.error("Error during C# code execution:", stderr)
    logged_content.push(`Error: ${stderr}`)
  }

  return {
    execution_result: stderr ? null : stripAnsi(stdout).trim(),
    logged_content,
  }
}
