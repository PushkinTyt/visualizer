import {AbstractAlg} from "../abstractAlg";
import {AbstractView} from "../abstractView";
import {AlgorithmStep} from "../algorithmStep";
import {ArrayElementHighlight, HighLightType} from "../arrayElementHighlight";
import {ArrayElement} from "../arrayElement";

export class InsertSortAlg extends AbstractAlg {
    static id = 'InsertSortAlg';

    makeSteps(): void {
        let steps = [];
        let array = this.arrayStore.getCloneElements();
        let count = array.length;

        let stepNumber = 0;
        let comparisonCount = 0;
        let permutationCount = 0;

        let step = AlgorithmStep.create("Начало сортировки")
            .setStepNumber(stepNumber)
            .setArray(array)
            .setComparisonCount(comparisonCount)
            .setPermutationCount(permutationCount);

        steps.push(step);
        steps.push(AlgorithmStep.clone(step).setListingLineIdent("for.start"));

        function needToSwapElements(i: number, j: number, v: ArrayElement, step: AlgorithmStep, steps: AlgorithmStep[]) {
            if (j < 0) {
                return false;
            }

            step = AlgorithmStep.clone(step)
                .setMessage(`Сравнение a[${j}]=${array[j].value} с v=a[${i}]=${v.value}`)
                .setListingLineIdent("compare")
                .setComparisonCount(++comparisonCount)
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.comparison(array[j]),
                    ArrayElementHighlight.comparison(v)]);

            steps.push(step);

            return array[j].value > v.value;
        }

        for (let i = 0; i < count; i++) {
            step = AlgorithmStep.clone(step)
                .setMessage(`Выбор элемента масива v=a[${i}]=${array[i].value}`)
                .setArray(array)
                .setListingLineIdent("selectElement")
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.comparison(array[i])]);

            steps.push(step);

            let v = array[i];
            let j = i - 1;

            while (needToSwapElements(i, j, v, step, steps)) {
                array[j + 1] = array[j];
                j--;
            }

            step = AlgorithmStep.clone(step)
                .setMessage(`Перемещаем элемент v=a[${i}]=${v.value} на ${j + 1} место`)
                .setListingLineIdent("setPlace")
                .setPermutationCount(++permutationCount)
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.permutation(array[j + 1]),
                    ArrayElementHighlight.permutation(v)]);

            steps.push(step);

            array[j + 1] = v;
        }

        steps.push(AlgorithmStep.clone(step)
            .setListingLineIdent(null)
            .setHighlightElements([])
            .setComparisonCount(comparisonCount)
            .setPermutationCount(permutationCount)
            .setArray(array)
            .setMessage("Конец сортировки"));

        this.viewState.steps = steps;
        this.viewState.currentStep = steps[0];
    }

    getViews(): AbstractView[] {
        return [];
    }

    getAlgName(): string {
        return "Сортировка простыми вставками";
    }
}