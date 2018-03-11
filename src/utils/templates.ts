export interface ISimpleTemplate {
    elements: number[]
    templateName: string
}

export const simplaeTemplates: ISimpleTemplate[] = [
    {
        elements: [1, 2, 3, 4, 10, 6, 7, 8, 9, 5],
        templateName: 'Пример 1'
    },
    {
        elements: [4, 3, 1],
        templateName: 'Пример 2'
    }
]