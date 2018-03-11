import {AbstractAlg} from "../abstractAlg";
import {AbstractView} from "../abstractView";
import {AlgorithmStep} from "../algorithmStep";
import {ArrayElementHighlight, HighLightType} from "../arrayElementHighlight";


export class BubbleSortAlg extends AbstractAlg {
    static id = 'BubbleSortAlg';

    init(): void {
        let steps = [];
        let array = this.arrayStore.elements;
        let count = array.length - 1;

        let step = AlgorithmStep.create("Начало сортировки");
        steps.push(step);

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count - i; j++) {
                step = AlgorithmStep.clone(step)
                    .setMessage(`Сравнение элементов a[${i}]=${array[i].value} и a[${j}]=${array[j].value}`)
                    .setComparisonCount(++step.comparisonCount)
                    .setHighlightElements([ArrayElementHighlight.comparison(array[i]),
                        ArrayElementHighlight.comparison(array[j])]);

                steps.push(step);

                if (array[j] > array[j + 1]) {
                    step = AlgorithmStep.clone(step)
                        .setMessage(`Перестановка элементов a[${i}]=${array[i].value} и a[${j}]=${array[j].value}`)
                        .setPermutationCount(++step.permutationCount)
                        .setHighlightElements([ArrayElementHighlight.permutation(array[i]),
                            ArrayElementHighlight.permutation(array[j])]);

                    steps.push(step);

                    let max = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = max;
                }
            }
        }

        step = AlgorithmStep.create("Конец сортировки");
        steps.push(step);

        this.viewState.steps = steps;
    }

    getViews(): AbstractView[] {
        return [];
    }
}