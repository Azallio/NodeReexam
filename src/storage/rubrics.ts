export function writeRubrics(rubrics) {

}

export function loadRubrics() {
    return {
        rubrics: [
            {
                "title": "Бизнес",
                "id": "business",
                "link": "https://www.vedomosti.ru/rss/rubric/business"
            },
            {
                "title": "Бизнес — ТЭК",
                "id": "business-energy",
                "parentId": "business",
                "link": "https://www.vedomosti.ru/rss/rubric/business/energy"
            }
        ]
    }
}
