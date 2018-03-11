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

        let stepNumber = 0;
        let comparisonCount = 0;
        let permutationCount = 0;

        let step = AlgorithmStep.create("Начало сортировки")
            .setStepNumber(stepNumber)
            .setComparisonCount(comparisonCount)
            .setPermutationCount(permutationCount);

        steps.push(step);
        steps.push(AlgorithmStep.clone(step).setListingLineIdent("for1.start"));

        for (let i = 0; i < count; i++) {

            steps.push(AlgorithmStep.clone(step).setListingLineIdent("for2.start"));
            for (let j = 0; j < count - i; j++) {
                step = AlgorithmStep.clone(step)
                    .setMessage(`Сравнение элементов a[${j}]=${array[j].value} и a[${j + 1}]=${array[j + 1].value}`)
                    .setListingLineIdent("comparison")
                    .setStepNumber(stepNumber++)
                    .setComparisonCount(++comparisonCount)
                    .setHighlightElements([ArrayElementHighlight.comparison(array[j]),
                        ArrayElementHighlight.comparison(array[j + 1])]);

                steps.push(step);

                if (array[j].value > array[j + 1].value) {
                    step = AlgorithmStep.clone(step)
                        .setMessage(`Перестановка элементов a[${j}]=${array[j].value} и a[${j + 1}]=${array[j + 1].value}`)
                        .setStepNumber(stepNumber++)
                        .setPermutationCount(++permutationCount)
                        .setHighlightElements([ArrayElementHighlight.permutation(array[i]),
                            ArrayElementHighlight.permutation(array[j])]);

                    steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.temp"));

                    let temp = array[j];

                    steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.swap1"));

                    array[j] = array[j + 1];

                    steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.swap2"));

                    array[j + 1] = temp;
                }

                steps.push(AlgorithmStep.clone(step).setListingLineIdent("for2.start"));
            }

            steps.push(AlgorithmStep.clone(step).setListingLineIdent("for1.start"));
        }

        steps.push(AlgorithmStep.clone(step)
            .setListingLineIdent(null)
            .setMessage("Конец сортировки"));

        this.viewState.steps = steps;
    }

    getViews(): AbstractView[] {
        return [];
    }

    getAlgName(): string {
        return "Сортировка простыми обменами (пузырек)";
    }
}