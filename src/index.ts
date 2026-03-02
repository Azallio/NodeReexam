import { spawn } from "node:child_process"
import { getUserInput } from "./cli.js"


export default async function run() {
    const settings = getUserInput()

    setInterval(() => {
        console.log('hey')
        spawn('tsx', ['src/data/index.ts'])
    }, 5_000)
}