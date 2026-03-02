const BASE_URL = 'https://www.vedomosti.ru/rss/'

export function fetchNews(url: string) {
    return fetch(BASE_URL + url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Некорректный ответ сервера")
            }
            return response.text()
        })
        .catch(error => {
            console.error(error)
        })
}
