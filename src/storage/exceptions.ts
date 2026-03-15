type Message = `Файл не найден: ${string}.json`

export class FileNotFoundError extends Error {
    constructor(message: Message) {
        super(message)
        this.name = "FileNotFoundError"
    }
}