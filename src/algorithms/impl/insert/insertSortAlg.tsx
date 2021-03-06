import {AbstractAlg} from "../../abstractAlg";
import {AbstractView} from "../../abstractView";
import {AlgorithmStep} from "../../algorithmStep";
import {ArrayElementHighlight} from "../../arrayElementHighlight";
import {ArrayElement} from "../../arrayElement";
import {InsertSortListingJS} from "./listing/insertSortListingJS";
import {memoize} from "core-decorators";
import {InsertSortListingSharp} from "./listing/insertSortListingSharp";

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

        function needToSwapElements(i: number, j: number, v: ArrayElement, steps: AlgorithmStep[]) {
            if (j < 0) {
                step = AlgorithmStep.clone(step)
                    .setMessage(`Сравнение j=${j} с 0`)
                    .setStepNumber(stepNumber++)
                    .setListingLineIdent("compare")
                    .setHighlightElements([]);

                steps.push(step);

                return false;
            }

            step = AlgorithmStep.clone(step)
                .setMessage(`Сравнение j=${j} с 0 и a[${j}]=${array[j].value} с v=a[${i}]=${v.value}`)
                .setListingLineIdent("compare")
                .setComparisonCount(++comparisonCount)
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.comparison(array[j]),
                    ArrayElementHighlight.comparison(v)]);

            steps.push(step);

            return array[j].value > v.value;
        }

        for (let i = 0; i < count; i++) {
            steps.push(AlgorithmStep.clone(step).setListingLineIdent("selectElement1"));

            let j = i - 1;

            step = AlgorithmStep.clone(step)
                .setMessage(`Выбор элемента масива v=a[${i}]=${array[i].value}`)
                .setArray(array)
                .setListingLineIdent("selectElement2")
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.comparison(array[i])]);

            steps.push(step);

            let v = array[i];

            while (needToSwapElements(i, j, v, steps)) {
                step = AlgorithmStep.clone(step)
                    .setMessage(`Перемещаем элемент a[${j}]=${array[j].value} на ${j + 1} место`)
                    .setPermutationCount(++permutationCount)
                    .setStepNumber(stepNumber++)
                    .setListingLineIdent("permutation");

                steps.push(step);

                array[j + 1] = array[j];

                steps.push(AlgorithmStep.clone(step).setListingLineIdent("decrease"));

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

            steps.push(AlgorithmStep.clone(step).setArray(array).setListingLineIdent("for.start"));
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

    @memoize
    getViews(): AbstractView[] {
        return [
            new AbstractView('JavaScript', InsertSortListingJS),
            new AbstractView('C#', InsertSortListingSharp)
        ];
    }

    getAlgName(): string {
        return "Сортировка простыми вставками";
    }
}